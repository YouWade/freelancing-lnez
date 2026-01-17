# Project Guidelines
> **Language Rule**: All AI responses must be in **Traditional Chinese (繁體中文)** unless strictly necessary (e.g., code, error logs).



## 🛠 External Tools
- **Large Context Analysis**: When local context is insufficient, refer to the usage rules in [GEMINI_TASK.md](./GEMINI_TASK.md) and use the `gemini` CLI.

# AI 開發 Commit Message 撰寫指南

本指南提供 AI 在協助開發時撰寫 Git commit 訊息的標準規範。

## 何時使用CLAUDE.md與何時使用GEMINI.md
何時使用 Gemini CLI：
✅ 需要掃描整個專案
✅ 分析多個大型檔案
✅ 需要統計或盤點資源
✅ 跨資料夾的程式碼分析
✅ 需要完整的架構概覽

何時使用 Claude Code：
✅ 修改特定檔案
✅ 實作新功能
✅ Debug 特定問題
✅ 需要互動式開發

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
9. 看檔案決定使用css或是SCSS，如果是*.scss就使用scss語法，如果是*.css就使用css語法。
10. 如果要進行改code，請先參考其他檔案來決定應該怎麼寫code。
11. 提取可複用的 UI 組件到 components/common/，這個比較嚴謹，像是如果是carousel，他應該就算是可共用UI，且他應該SCSS與元件放在同一個資料夾，但是SCSS只會有大概的範本，實際的style可能會根據每個page或是會用到該元件的設計而有所不同。
12. 使用vite的話都先看vite.config.js檔案，確定要怎麼import或是引入。
13. 在我沒有提到更改共用component的時候，先暫時不要修改，可以向我提出之後我做出決定。
14. 若有給figma，請使用mcp功能完整調用出所有樣式與排版，不要只有依賴擷圖。注意: 要完全一樣的排版與樣式!

## 錯誤的處理方式
1. 沒有查看其他檔案的寫code方式進行自動幻想產出
2. 不遵守核心原則
3. 不遵守React創建資料夾與專案架構

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

### Body（內文）- 選填

**何時需要：**
- 變更需要解釋「為什麼」
- 有複雜的實作細節
- 有重要的設計決策

**格式要求：**
- 每行最多 72 字元
- 與 subject 之間空一行
- 解釋「為什麼」和「是什麼」，不是「怎麼做」（程式碼已經說明了）

**範例：**
```
fix(cache): prevent memory leak in Redis connection

The connection pool was not properly releasing connections after
use, causing memory to grow indefinitely in long-running processes.

Added explicit connection.release() calls in finally blocks.
```

### Footer（頁尾）- 選填

**用於：**
1. **關聯 Issue：**
   ```
   Closes #123
   Fixes #456
   Relates to #789
   ```

2. **重大變更：**
   ```
   BREAKING CHANGE: API endpoint /users now requires authentication.
   All clients must include Authorization header.
   ```

3. **共同作者：**
   ```
   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   ```

## AI 實作 Workflow

### 步驟 1：檢查狀態
```bash
git status
git diff
git log --oneline -10
```

### 步驟 2：分析變更
- 識別變更的檔案數量
- 確認變更的性質（新功能/修復/重構）
- 檢查是否有多個邏輯變更混在一起

### 步驟 3：撰寫訊息
- 選擇正確的 type
- 決定 scope（如果適用）
- 用祈使語氣寫 subject
- 如需要，加入 body 說明原因
- 加入 footer（issue、breaking change）

### 步驟 4：建立 Commit
```bash
git commit -m "$(cat <<'EOF'
feat(auth): add password reset functionality

Users can now reset their password via email link.
Added email service integration and token generation.

Closes #123

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

## 實際範例

### 範例 1：簡單功能
```
feat(ui): add loading spinner to submit button
```

### 範例 2：Bug 修復（含說明）
```
fix(api): handle null values in user profile endpoint

The endpoint was crashing when users had incomplete profiles
with null email or phone fields. Added null checks and return
default empty strings for optional fields.

Fixes #234
```

### 範例 3：重大變更
```
refactor(api): change authentication response format

BREAKING CHANGE: The /auth/login endpoint now returns a nested
user object instead of flat properties.

Before: { id: 1, name: "John", email: "..." }
After: { user: { id: 1, name: "John", email: "..." }, token: "..." }

Update all client code to access user.name instead of name.
```

### 範例 4：效能改善
```
perf(db): add composite index on user_id and created_at

Query performance improved from 800ms to 50ms on timeline fetch.
Added index on frequently queried columns in posts table.
```

## 最佳實踐清單

### ✅ 應該做的

- **一個 commit = 一個邏輯變更**
- **先測試再 commit** - 確保變更可以運作
- **有意義的訊息** - 讓其他人（或未來的你）能理解
- **參考 issue** - 連結相關的問題追蹤
- **說明原因** - 在 body 中解釋為什麼做這個變更
- **檢查拼寫** - commit 訊息也是程式碼的一部分

### ❌ 不應該做的

- **模糊訊息** - "fix bug", "update code", "changes"
- **混合變更** - 一個 commit 包含多個不相關的修改
- **過去式** - "fixed", "added", "updated"
- **太長的主旨** - 超過 50 字元難以閱讀
- **缺少上下文** - 沒解釋為什麼要做這個變更
- **未經測試就 commit** - 破損的程式碼不應該進入歷史

## 特殊情境處理

### Pre-commit Hook 失敗
- **絕不使用** `--no-verify` 除非使用者明確要求
- **修正問題** 後建立新的 commit
- **不要 amend** 除非符合安全條件

### 多檔案變更
如果變更跨越多個檔案但屬於同一邏輯：
```
refactor(auth): extract authentication logic to service layer

- Move auth logic from controllers to AuthService
- Add unit tests for AuthService
- Update controllers to use new service

This improves testability and code reusability.
```

### 文件更新
```
docs(api): update authentication endpoints documentation

Add examples for OAuth flow and error responses.
Clarify token expiration policy.
```

## 檢查清單

在建立 commit 前確認：

- [ ] 已執行 `git status` 和 `git diff` 檢查變更
- [ ] 已執行 `git log` 了解專案 commit 風格
- [ ] Type 選擇正確（feat/fix/docs 等）
- [ ] Subject 使用祈使語氣且小於 50 字元
- [ ] 如有需要，Body 解釋了「為什麼」
- [ ] 有相關 issue 時已加入 footer 參考
- [ ] 重大變更已標註 BREAKING CHANGE
- [ ] Commit 只包含一個邏輯變更
- [ ] 程式碼已測試且可運作

## 參考資源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Commit Best Practices](https://github.com/trein/dev-best-practices/wiki/Git-Commit-Best-Practices)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
