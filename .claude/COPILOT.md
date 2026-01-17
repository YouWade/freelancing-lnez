# Project Guidelines for GitHub Copilot

## 🛠 External Tools
- **Large Context Analysis**: When local context is insufficient, refer to the usage rules in [CLAUDE.md](./CLAUDE.md) and use the `claude` CLI if needed.

# AI 開發 Commit Message 撰寫指南

本指南提供 GitHub Copilot 在協助開發時撰寫 Git commit 訊息的標準規範。

## 核心原則

在撰寫 commit 訊息前，AI 必須：
1. **先讀取檔案** - 絕不在未讀取程式碼的情況下建議修改
2. **理解變更** - 透過 git diff 完整了解所有變更內容
3. **遵循專案慣例** - 檢查專案的 git log 以了解現有的 commit 風格
4. **一次一個邏輯** - 確保每個 commit 只包含一個邏輯變更
5. 確保元件化開發，易於維護和擴展，組件結構要清晰
6. 使用 HTML/CSS/JS 語法製作
7. STYLE 工具：CSS/LESS/SCSS
8. BEM 命名規範：使用 BEM（Block, Element, Modifier）命名規範來組織 CSS 類名，提升可讀性與可維護性
9. 看檔案決定使用 css 或是 SCSS，如果是 `*.scss` 就使用 scss 語法，如果是 `*.css` 就使用 css 語法
10. 如果要進行改 code，請先參考其他檔案來決定應該怎麼寫 code
11. 提取可複用的 UI 組件到 `components/`，SCSS 與元件放在同一個資料夾，但 SCSS 只會有大概的範本，實際的 style 可能會根據每個 page 或是會用到該元件的設計而有所不同
12. React 命名規範：組件文件夾首字大寫，組件名稱使用 PascalCase

## 錯誤的處理方式
1. 沒有查看其他檔案的寫 code 方式進行自動幻想產出
2. 不遵守核心原則
3. 不遵守 React 創建資料夾與專案架構

## Commit 訊息格式

### 標準結構

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type（類型）

必須是以下其中之一：

| Type | 使用時機 | 範例 |
|------|---------|------|
| `feat` | 新功能 | feat(auth): add OAuth login |
| `fix` | 錯誤修復 | fix(api): handle null pointer |
| `docs` | 只改文件 | docs(readme): update install steps |
| `style` | 格式調整（不影響程式邏輯） | style(ui): fix button alignment |
| `refactor` | 重構（既非新功能也非修復） | refactor(db): extract query builder |
| `perf` | 效能改善 | perf(search): add index on user_id |
| `test` | 新增或修正測試 | test(auth): add login edge cases |
| `chore` | 建置或工具變更 | chore(deps): update eslint to 8.0 |
| `ci` | CI/CD 設定變更 | ci(github): add test workflow |
| `build` | 影響建置系統或依賴 | build(npm): add webpack config |
| `revert` | 回復先前的 commit | revert: feat(auth): add OAuth login |

### Scope（範圍）- 選填

指出受影響的模組或元件：
- `api` - API 相關
- `ui` - 使用者介面
- `auth` - 認證系統
- `db` - 資料庫
- `config` - 設定檔
- `page` - 頁面元件
- `component` - UI 組件

### Subject（主旨）

**必須遵守：**
- ✅ 使用祈使語氣："add" 不是 "added" 或 "adds"
- ✅ 小寫開頭，不加句號
- ✅ 50 字元以內
- ✅ 清楚描述「做了什麼」

**範例：**
```
✅ add user authentication
✅ fix memory leak in cache
✅ update API documentation

❌ Added user authentication (過去式)
❌ Fix Memory Leak In Cache (大寫)
❌ updates (不清楚)
```

## 開發工作流程

### 檔案修改前
1. 使用 `read_file` 查看目標檔案內容
2. 查看相關檔案以了解編碼慣例
3. 檢查 git log 查看最近的 commit 訊息風格

### 實作新功能時
1. 先建立資料夾結構（如需要）
2. 創建或修改必要的檔案
3. 確保遵循 BEM 命名規範和項目架構
4. 最後撰寫適當的 commit 訊息

### 修改現有代碼時
1. 讀取整個檔案以理解上下文
2. 使用 `replace_string_in_file` 或 `multi_replace_string_in_file` 進行編輯
3. 包含足夠的前後文本以確保替換的唯一性
4. 驗證修改後的代碼是否符合專案風格

## 注意事項

- **不要猜測**：如果不確定某個檔案的結構或風格，就去查看相關檔案
- **保持一致性**：新代碼應該與現有代碼風格保持一致
- **元件複用**：提取可複用的組件到 `components/` 資料夾
- **命名清晰**：使用具有描述性的名稱，遵循 PascalCase（組件）和 camelCase（變數/方法）
