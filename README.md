# 链道 - Web3项目技术评估平台

## 项目结构

```
chain-develop/
├── frontend/          # 前端项目 (React + Vite)
├── backend/           # 后端项目 (NestJS)
├── cloudflare.json    # Cloudflare Pages 配置
├── wrangler.toml      # Cloudflare Workers 配置（可选）
└── README.md
```

## 前端设置

### 安装依赖
```bash
cd frontend
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建
```bash
npm run build
```

### 环境变量
创建 `frontend/.env` 文件：
```
VITE_API_URL=http://localhost:3000
VITE_TELEGRAM_LINK=https://t.me/your_telegram_username
```

## 后端设置

### 安装依赖
```bash
cd backend
npm install
```

### 环境变量
创建 `backend/.env` 文件（参考 `backend/.env.example`）：
```
PORT=3000
FRONTEND_URL=http://localhost:5173

# AI API 配置（支持 OpenAI、DeepSeek 等兼容 OpenAI API 的服务）
AI_API_BASE_URL=https://api.deepseek.com
AI_API_KEY=your-deepseek-api-key
AI_MODEL=deepseek-chat
```

### 开发模式
```bash
npm run start:dev
```

### 构建
```bash
npm run build
npm run start:prod
```

## Cloudflare Pages 部署

### 配置文件说明

1. **`frontend/public/_redirects`** - SPA 路由重定向规则
   - 所有未匹配的路径都会重定向到 `index.html`，支持客户端路由

2. **`wrangler.toml`** - Cloudflare Workers 配置（可选）
   - 如果使用 Cloudflare Workers，需要此文件

3. **`cloudflare.json`** - Cloudflare Pages 构建配置
   - 指定构建命令和输出目录
   - 配置安全头
   - 配置重定向规则

### 部署步骤

1. 在 Cloudflare Dashboard 中创建新的 Pages 项目
2. 连接你的 Git 仓库
3. 设置构建配置：
   - **构建命令**: `cd frontend && npm run build`
   - **构建输出目录**: `frontend/dist`
   - **根目录**: `frontend`
4. 添加环境变量：
   - `VITE_TELEGRAM_LINK`: 你的 Telegram 用户链接
5. 部署

## 功能特性

- ✅ AI 驱动的项目评估（流式输出）
- ✅ 项目评估表单
- ✅ 响应式设计
- ✅ SEO 优化（静态生成）
- ✅ Cloudflare Pages 部署就绪

## 技术栈

### 前端
- React 18
- Vite
- Tailwind CSS
- React Markdown

### 后端
- NestJS
- TypeScript
- OpenAI API (支持 OpenAI、DeepSeek 等兼容 OpenAI API 的服务)
