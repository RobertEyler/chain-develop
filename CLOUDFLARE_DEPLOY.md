# Cloudflare Pages 部署配置

## 正确的构建配置

在 Cloudflare Dashboard 的 Pages 项目设置中，请按以下配置：

### 构建设置

1. **框架预设**: `None` 或 `Vite`（如果选择 Vite，Cloudflare 会自动识别）

2. **构建命令**: 
   ```
   cd frontend && rm -rf node_modules package-lock.json && npm install && npm run build
   ```
   或者如果上面的命令不行，尝试：
   ```
   cd frontend && npm ci --legacy-peer-deps && npm run build
   ```
   
   ⚠️ **注意**：
   - Cloudflare Pages 构建环境默认只提供 npm，不提供 yarn
   - 如果遇到 `Cannot find module @rollup/rollup-linux-x64-gnu` 错误，这是 npm 处理可选依赖的 bug，使用上面的清理命令可以解决

3. **构建输出目录**: 
   ```
   frontend/dist
   ```

4. **根目录**: 
   ```
   frontend
   ```
   （可选，如果设置了根目录，构建命令可以简化为 `npm run build`，但需要先 `cd frontend && npm install`）

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
- 构建命令：`cd frontend && yarn build`（Cloudflare Pages 没有 yarn，会失败）

✅ **正确配置**：
- 部署命令：留空
- 构建命令：`cd frontend && rm -rf node_modules package-lock.json && npm install && npm run build`
- 构建输出目录：`frontend/dist`
- ⚠️ **删除 `wrangler.toml`**：如果项目根目录有 `wrangler.toml` 文件，请删除它（Pages 不需要，会导致错误）

### 常见错误解决方案

#### 错误 1: Yarn 相关错误
如果遇到 yarn 相关的错误：

**解决方案**：Cloudflare Pages 默认只有 npm，不要使用 yarn
- 构建命令：`cd frontend && rm -rf node_modules package-lock.json && npm install && npm run build`

#### 错误 2: Rollup 可选依赖错误
如果遇到 `Cannot find module @rollup/rollup-linux-x64-gnu` 错误：

**解决方案**：清理后重新安装
- 构建命令：`cd frontend && rm -rf node_modules package-lock.json && npm install && npm run build`
- 或者使用：`cd frontend && npm ci --legacy-peer-deps && npm run build`

#### 错误 3: 部署命令错误
如果设置了部署命令 `cd ./fronted && npx wrangler deploy`：

**解决方案**：删除部署命令，留空即可

#### 错误 4: Wrangler 入口点错误
如果遇到 `Missing entry-point to Worker script or to assets directory` 错误：

**解决方案**：删除项目根目录下的 `wrangler.toml` 文件
- Cloudflare Pages 会自动检测 `wrangler.toml` 并尝试部署 Worker
- 但 Pages 部署不需要这个文件，应该删除它
- 如果使用 Cloudflare Workers，才需要 `wrangler.toml`

## 验证部署

部署成功后，访问你的 Pages URL，应该能看到：
- 首页正常显示
- `/assessment` 路由正常工作
- 所有静态资源正常加载
