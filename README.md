# LNEZ E-Commerce Project

## Live Demo

https://youwade.github.io/freelancing-lnez/

## Screenshots

<!-- TODO: 部署完成後加上截圖 -->

---

這是一個使用現代前端技術構建的電商網站專案，專注於提供流暢的用戶體驗與響應式設計。

## 🚀 技術棧 (Tech Stack)

- **核心框架**: [React](https://react.dev/) (v18)
- **建構工具**: [Vite](https://vitejs.dev/)
- **語言**: JavaScript (ES6+)
- **樣式**: SCSS (CSS Preprocessor) with BEM naming convention
- **路由**: React Router v6
- **狀態管理**: React Context API
- **代碼規範**: ESLint

## 📦 快速開始 (Quick Start)

### 必要條件
請確保您已安裝 [Node.js](https://nodejs.org/) (建議 v16+)。

### 1. 克隆專案與安裝依賴

```bash
# 安裝所有依賴套件
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```
啟動後，請訪問 `http://localhost:5173` (或終端機顯示的其他 port)。

### 3. 建構生產版本

```bash
npm run build
```

## 📂 專案結構 (Project Structure)

```
src/
├── assets/          # 靜態資源 (Images, Icons, Global Styles)
├── components/      # 可複用組件 (Button, Header, ProductCard...)
├── context/         # 全域狀態 (CartContext, AppContext...)
├── data/            # Mock Data (產品資料, 用戶資料...)
├── pages/           # 頁面組件 (HomePage, CartPage, SearchPage...)
├── routes/          # 路由配置
├── services/        # API 服務與 Mock Service
├── utils/           # 工具函數 (formatters, calculations...)
├── App.jsx          # 應用程式入口
└── main.jsx         # 渲染入口
```

## 🛠️ 開發指南 (How to Modify)

### 1. 修改樣式 (Styling)
本專案使用 SCSS 並遵循 **BEM (Block Element Modifier)** 命名規則。
- 全域變數（顏色、字體、間距）位於 `src/assets/styles/_variables.scss`。
- RWD 斷點混合 (Mixins) 位於 `src/assets/styles/_mixins.scss`。
- 修改組件樣式時，請找到該組件對應的 `.scss` 檔案 (例如 `Header.scss`)。

### 2. 資料管理 (Data)
目前專案使用 **Mock Data** 進行開發。
- 所有產品資料位於 `src/data/products.js`。
- 您可以在這裡新增、修改產品資訊 (例如：價格、圖片、是否為暢銷商品)。
- 資料透過 `mockService.js` 統一存取，未來可無縫切換至真實 API。

### 3. 新增頁面 (New Page)
1. 在 `src/pages/` 下建立新的頁面資料夾與組件 (例如 `NewPage/NewPage.jsx`)。
2. 在 `src/routes/index.jsx` 中設定新的路由路徑。
3. (選擇性) 如果需要懶加載，請使用 `React.lazy` 引入。

### 4. 組件開發 (Components)
建立新組件時，建議遵循以下結構：
```
ComponentName/
├── ComponentName.jsx  # 邏輯與 JSX
├── ComponentName.scss # 樣式
└── index.js           # 匯出 (選擇性)
```

## 📝 環境變數 (Environment Variables)

專案使用 `.env` 檔案管理環境變數 (Vite 使用 `VITE_` 前綴)：

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCK=true  # 是否啟用 Mock 模式
```

若需修改配置，請參考 `src/constants/config.js`。

---

## 網頁說明簡報
https://docs.google.com/presentation/d/1XZeNvrJQyAn-woaf995j2aWJbw-OzVpKCiHsHvLHI6Y/edit?usp=drive_link

Happy Coding! 🚀
