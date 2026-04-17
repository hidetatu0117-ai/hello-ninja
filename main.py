import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from playwright.async_api import async_playwright

app = FastAPI(title="MatsuTsuru Stock API")

# SPREADSHEET (GAS)からのアクセスを全許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StockRequest(BaseModel):
    jan_code: str
    pref_name: str = "" # 例: "東京都"

@app.get("/")
def read_root():
    return {"status": "Ninja Server is running on Render!"}

@app.post("/scan/matsukiyo")
async def scan_matsukiyo(req: StockRequest):
    """
    マツキヨの店舗在庫検索ページにステルスアクセスし、指定された都道府県の在庫を引っこ抜く
    """
    jan = req.jan_code
    pref = req.pref_name
    
    if not jan:
         raise HTTPException(status_code=400, detail="JANコードが指定されていません")
         
    # Playwright（仮想ブラウザ）を使って人間に偽装
    results = []
    
    async with async_playwright() as p:
        # ヘッドレスモード（裏側）でGoogle Chrome（Chromium）を起動
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'])
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            has_touch=True
        )
        page = await context.new_page()
        
        try:
            # マツキヨの在庫確認専用ページ（直リンク）へ突撃
            target_url = f"https://www.matsukiyococokara-online.com/store/product/mystoreInventoryList/index/sku/{jan}/"
            print(f"Targeting: {target_url}")
            
            await page.goto(target_url, wait_until="domcontentloaded", timeout=30000)
            
            # TODO: ここからマツキヨのHTML構造に合わせて
            # 1. もし都道府県絞り込みのプルダウンがあれば選択（またはHTML全取得後にPython側で省く）
            # 2. ◎、△、× の店舗情報をパースして辞書化するロジックを組む
            
            # 現段階ではテストとしてページのタイトルを返す
            title = await page.title()
            content = await page.content()
            
            # ダミーデータ（検証中）
            results.append({
                "store": "新宿三丁目店",
                "pref": "東京都",
                "status": "◎",
                "raw_html_length": len(content)
            })
            
        except Exception as e:
            await browser.close()
            raise HTTPException(status_code=500, detail=f"Scraping Error: {str(e)}")
            
        await browser.close()

    return {
        "success": True,
        "jan_code": jan,
        "pref_filter": pref,
        "data": results
    }
