import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from curl_cffi import requests

app = FastAPI(title="MatsuTsuru Stock API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StockRequest(BaseModel):
    jan_code: str
    pref_name: str = ""

@app.get("/")
def read_root():
    return {"status": "Ninja Server is Running Light!"}

@app.post("/scan/matsukiyo")
async def scan_matsukiyo(req: StockRequest):
    jan = req.jan_code
    pref = req.pref_name
    
    if not jan:
         raise HTTPException(status_code=400, detail="JANコードが指定されていません")
         
    # クロームの偽装通信（Playwrightより超軽量・超高速でブロックを突破）
    try:
        session = requests.Session(impersonate="chrome110")
        target_url = f"https://www.matsukiyococokara-online.com/store/product/mystoreInventoryList/index/sku/{jan}/"
        response = session.get(target_url, timeout=15)
        html_len = len(response.text)
        
        # ダミーのレスポンス（接続成功証明）
        return {
            "success": True,
            "jan_code": jan,
            "pref_filter": pref,
            "data": [
                {
                    "store": "新宿三丁目店",
                    "pref": "東京都",
                    "status": "◎",
                    "raw_length": html_len
                }
            ]
        }
    except Exception as e:
         raise HTTPException(status_code=500, detail=f"Scraping Error: {str(e)}")
