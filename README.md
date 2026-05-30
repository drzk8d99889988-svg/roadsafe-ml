# 交通事故安全診斷｜RoadSafe AI

> 斗六市道路交通事故資料分析與 ML 預測專題

## 功能頁面

| 頁面 | 網址 | 說明 |
|---|---|---|
| 封面 | `index.html` | SparklesText 動畫標題 + 專題介紹 |
| 目錄 | `menu.html` | GlassIcons 3D 玻璃導航入口 |
| 數據總覽 | `overview.html` | Chart.js 圖表 + 統計摘要 |
| 路段地圖 | `hotspots.html` | Leaflet 互動地圖 + 危險排行 |
| AI 預測 | `prediction.html` | 本週危險指數 + 天氣整合 |
| 改善建議 | `suggestions.html` | 本地規則引擎輸出 |

## 本地端執行（自己看）

雙擊 `index.html` 可直接用瀏覽器開啟（地圖需要連網）。

## 同網路分享（手機 + 旁人電腦）

在同個 WiFi 下，用 Python 開伺服器：

```bash
cd roadsafe_ml
python -m http.server 8080
```

輸出會顯示 `Serving on http://192.168.x.x:8080`，
手機/其他電腦在瀏覽器輸入這個 IP 就能看。

> 離開這個 WiFi 就無法連線。要讓全世界都看到，請看下方「部署上線」。

## 部署上線（全世界都能看到）

### 方法一：GitHub Pages（推薦，免費）

1. 安裝 Git：https://git-scm.com/download/win
2. 註冊 GitHub 帳號：https://github.com
3. 新建 Repository，名稱為 `roadsafe-ml`
4. 把 `roadsafe_ml` 資料夾內所有檔案上傳到 repo
5. 進入 Settings → Pages → Source 選 `main` branch
6. 幾分鐘後網址為 `https://你的帳號.github.io/roadsafe-ml`

### 方法二：Netlify Drop（免費，最簡單）

1. 開啟 https://app.netlify.com/drop
2. 直接把 `roadsafe_ml` 資料夾拖進瀏覽器
3. 立刻取得公開網址

### 方法三：Vercel（免費）

1. 註冊 https://vercel.com（可用 GitHub 登入）
2. Import 專案 → 選 `roadsafe_ml`
3. Deploy，幾秒後取得 `.vercel.app` 網址

## 技術線

- 純 HTML + CSS + JavaScript（無需 Node.js）
- 深色玻璃擬態主題（參考 visitors.now）
- Chart.js 圖表、Leaflet 地圖
- 本地 Random Forest 預測模擬 + 規則引擎建議

## 注意事項

- 目前路段資料為模擬數據，展示前端與演算法流程
- 真實資料需從政府資料開放平台抓取後匯入
