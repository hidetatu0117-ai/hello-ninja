"""
Instagram Graph API を呼び出す部分をまとめたファイル。

重要：投稿の種類（通常フィード／リール／ストーリーズ）によって、
取得できる指標（インサイト）の項目が異なります。ここでは「取れるはず」
と決め打ちせず、候補となる指標をまとめて要求し、Instagram側が
「対応していません」と返してきた指標は無視して、実際に取得できた
ものだけを返す実装にしています。

実際に接続してみて、期待した指標が取れない／エラーになる場合は、
そのエラーメッセージを教えてください。Meta側の仕様変更や権限不足が
原因のことが多いため、内容を見てこのファイルを調整します。
"""

import httpx

GRAPH_API_VERSION = "v19.0"
BASE_URL = f"https://graph.facebook.com/{GRAPH_API_VERSION}"

# 投稿の種類ごとに要求してみる指標の候補（2026年1月時点の一般公開情報を元にした候補であり、
# 実際の可否はMeta側の最新仕様・アカウント種別・権限によって変わり得ます）
METRIC_CANDIDATES_BY_TYPE = {
    "REELS": ["reach", "likes", "comments", "saved", "shares", "plays", "total_interactions"],
    "FEED": ["reach", "saved", "likes", "comments", "shares"],
    "CAROUSEL_ALBUM": ["reach", "saved", "likes", "comments", "shares"],
    "IMAGE": ["reach", "saved", "likes", "comments", "shares"],
    "VIDEO": ["reach", "saved", "likes", "comments", "shares", "plays"],
}


class InstagramAPIError(Exception):
    def __init__(self, message, detail=None):
        super().__init__(message)
        self.detail = detail


def _get(url: str, params: dict, timeout: float):
    """httpx呼び出しをまとめる場所。インターネット接続の問題（回線が切れている・
    タイムアウトなど）が起きても、初心者が読んでも分かるエラーメッセージに
    変換してから呼び出し元に伝える。"""
    try:
        return httpx.get(url, params=params, timeout=timeout)
    except httpx.RequestError as e:
        raise InstagramAPIError(
            "Instagram（Meta）のサーバーに接続できませんでした。インターネット接続を確認するか、"
            "時間をおいて再度お試しください。",
            str(e),
        )


def test_connection(access_token: str, ig_user_id: str) -> dict:
    """接続確認用。アカウントの基本情報だけを取得する。
    ここが失敗する場合は、トークンかビジネスアカウントIDが間違っている可能性が高い。"""
    url = f"{BASE_URL}/{ig_user_id}"
    params = {"fields": "username,followers_count,media_count", "access_token": access_token}
    resp = _get(url, params, timeout=15)
    data = resp.json()
    if resp.status_code != 200:
        raise InstagramAPIError(
            "Instagramへの接続に失敗しました。アクセストークンとビジネスアカウントIDを確認してください。",
            data,
        )
    return data


def get_recent_media(access_token: str, ig_user_id: str, limit: int = 25) -> list:
    url = f"{BASE_URL}/{ig_user_id}/media"
    fields = (
        "id,caption,media_type,media_product_type,media_url,thumbnail_url,"
        "permalink,timestamp,like_count,comments_count"
    )
    params = {"fields": fields, "access_token": access_token, "limit": limit}
    resp = _get(url, params, timeout=20)
    data = resp.json()
    if resp.status_code != 200:
        raise InstagramAPIError("投稿一覧の取得に失敗しました。", data)
    return data.get("data", [])


def get_media_insights(access_token: str, media_id: str, media_product_type: str) -> dict:
    """投稿の種類ごとに取得できる指標が異なるため候補をまとめて要求し、
    取得できたものだけを辞書で返す。失敗した場合は "_error" キーにメッセージを入れる
    （呼び出し側は例外にせず、そのまま記録する）。"""
    candidates = METRIC_CANDIDATES_BY_TYPE.get(media_product_type, METRIC_CANDIDATES_BY_TYPE["FEED"])
    url = f"{BASE_URL}/{media_id}/insights"
    params = {"metric": ",".join(candidates), "access_token": access_token}
    try:
        resp = _get(url, params, timeout=15)
    except InstagramAPIError as e:
        return {"_error": str(e)}
    data = resp.json()

    if resp.status_code != 200:
        message = data.get("error", {}).get("message", "insightsの取得に失敗しました")
        return {"_error": message}

    result = {}
    for item in data.get("data", []):
        name = item.get("name")
        values = item.get("values", [])
        if values:
            result[name] = values[0].get("value")
    return result
