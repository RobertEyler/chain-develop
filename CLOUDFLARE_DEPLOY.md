# Cloudflare Pages 部署配置

## 正确的构建配置

在 Cloudflare Dashboard 的 Pages 项目设置中，请按以下配置：

### 构建设置

1. **框架预设**: `None` 或 `Vite`（如果选择 Vite，Cloudflare 会自动识别）

2. **构建命令**: 
   ```
   cd frontend && npm install && npm run build
   ```
   ⚠️ **强烈推荐使用 npm**：避免 Yarn lockfile 同步问题
   
   如果必须使用 yarn，需要确保 yarn.lock 已提交且是最新的：
   ```
   cd frontend && yarn install --frozen-lockfile && yarn build
   ```
   
   **注意**：如果使用 yarn，构建环境使用的是 Yarn 4.5.0，但你的 lockfile 可能是 Yarn 1.x 格式，会导致不兼容。建议使用 npm。

3. **构建输出目录**: 
   ```
   frontend/dist
   ```

4. **根目录**: 
   ```
   frontend
   ```
   （可选，如果设置了根目录，构建命令可以简化为 `yarn build` 或 `npm run build`）

5. **部署命令**: 
   ```
   （留空，不要填写任何内容）
   ```
   ⚠️ **重要**：Cloudflare Pages 会自动部署构建输出，不需要 `wrangler deploy` 命令

### 环境变量

在 Cloudflare Pages 的环境变量设置中添加：

- `VITE_API_URL`: 后端 API 地址（例如：`https://liandao.org/api`）
- `VITE_TELEGRAM_LINK`: Telegram 用户链接（例如：`https://t.me/tom_cat666`）

### 常见错误

❌ **错误配置**：
- 部署命令：`cd ./fronted && npx wrangler deploy`（拼写错误 + 不应该使用 wrangler）
- 构建命令：`cd frontend && yarn build`（可能导致 lockfile 错误）

✅ **正确配置**：
- 部署命令：留空
- 构建命令：`cd frontend && npm install && npm run build`（推荐）
- 构建输出目录：`frontend/dist`

### Yarn lockfile 错误解决方案

如果遇到 `The lockfile would have been modified by this install, which is explicitly forbidden` 错误：

1. **方案一（推荐）**：改用 npm
   - 构建命令：`cd frontend && npm install && npm run build`

2. **方案二**：使用 yarn 的 frozen-lockfile 模式
   - 构建命令：`cd frontend && yarn install --frozen-lockfile && yarn build`
   - 需要确保 `yarn.lock` 文件已提交到 git 且是最新的

3. **方案三**：删除 yarn.lock，使用 npm
   - 删除 `frontend/yarn.lock`
   - 使用 npm 重新安装：`cd frontend && npm install`
   - 提交 `package-lock.json`
   - 构建命令：`cd frontend && npm install && npm run build`

## 验证部署

部署成功后，访问你的 Pages URL，应该能看到：
- 首页正常显示
- `/assessment` 路由正常工作
- 所有静态资源正常加载
