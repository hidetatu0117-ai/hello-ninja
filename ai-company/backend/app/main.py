import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from . import db, instagram_client

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

app = FastAPI(title="AI社長室 Backend (PHASE 1: Instagram)")

# ローカルで動かすプロトタイプ用の設定。フロントエンド(index.html)を
# どのポートから開いても読み込めるよう全許可にしている（本番運用ではない）。
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

db.init_db()


@app.exception_handler(Exception)
async def unexpected_error_handler(request: Request, exc: Exception):
    # 想定外のエラーで真っ黒なスタックトレースを表示させず、
    # 何が起きたかだけ分かるメッセージを返す（詳細はサーバーのログに残る）。
    return JSONResponse(
        status_code=500,
        content={"detail": f"予期しないエラーが発生しました：{exc}"},
    )


def get_credentials():
    token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
    ig_user_id = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")
    if not token or not ig_user_id:
        raise HTTPException(
            status_code=400,
            detail=(
                "Instagramの接続情報が設定されていません。"
                "ai-company/backend/.env を作成し、README「PHASE 1: Instagram接続」の"
                "手順に沿ってアクセストークンとビジネスアカウントIDを入力してください。"
            ),
        )
    return token, ig_user_id


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/instagram/test")
def instagram_test():
    """.envの内容が正しいかどうかだけを確認するための接続テスト。"""
    token, ig_user_id = get_credentials()
    try:
        account = instagram_client.test_connection(token, ig_user_id)
    except instagram_client.InstagramAPIError as e:
        raise HTTPException(status_code=502, detail={"message": str(e), "detail": e.detail})
    return {"connected": True, "account": account}


@app.post("/api/instagram/sync")
def instagram_sync(limit: int = 25):
    """最新の投稿と数字をInstagramから取得し、データベースに保存する。"""
    token, ig_user_id = get_credentials()
    try:
        media_list = instagram_client.get_recent_media(token, ig_user_id, limit=limit)
    except instagram_client.InstagramAPIError as e:
        raise HTTPException(status_code=502, detail={"message": str(e), "detail": e.detail})

    captured_at = datetime.now(timezone.utc).isoformat()
    synced = []

    for media in media_list:
        media_type = media.get("media_product_type") or media.get("media_type") or "FEED"

        post = {
            "id": media["id"],
            "platform": "instagram",
            "posted_at": media.get("timestamp"),
            "permalink": media.get("permalink"),
            "media_type": media_type,
            "caption": media.get("caption"),
            "thumbnail_url": media.get("thumbnail_url") or media.get("media_url"),
        }
        db.upsert_post(post)

        insights = instagram_client.get_media_insights(token, media["id"], media_type)
        metrics = {
            "reach": insights.get("reach"),
            "likes": insights.get("likes", media.get("like_count")),
            "comments": insights.get("comments", media.get("comments_count")),
            "saved": insights.get("saved"),
            "shares": insights.get("shares"),
            "plays": insights.get("plays"),
        }
        db.insert_metrics(media["id"], captured_at, metrics)
        synced.append({"id": media["id"], "insights_error": insights.get("_error")})

    return {"synced_count": len(synced), "captured_at": captured_at, "posts": synced}


@app.get("/api/instagram/posts")
def instagram_posts(limit: int = 25):
    """データベースに保存済みの投稿一覧（最新の数字つき）を返す。"""
    return {"posts": db.latest_posts_with_metrics(platform="instagram", limit=limit)}
