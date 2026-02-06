# 🚀 Cloudflare Pages 部署指南（Frontend + Blog 合并部署）

## 📦 项目结构

```
buildweb3.com/              # 你的域名
├── /                       # Frontend（主站）
├── /assessment             # 评估页面
├── /zh-CN                  # 简体中文主站
├── /zh-TW                  # 繁体中文主站
└── /blog                   # Docusaurus 博客
    ├── /                   # 博客首页
    ├── /web3-development-guide
    ├── /solana-vs-ethereum-2026
    └── /tags               # 标签页
```

---

## ⚡ 快速开始

### 1️⃣ 本地测试构建

```bash
# 安装依赖
npm install --legacy-peer-deps

# 完整构建
npm run build

# 预览（可选）
npx serve dist
```

构建完成后，`dist/` 目录包含：
- Frontend 文件（根目录）
- Blog 文件（`/blog/` 子目录）
- `_redirects` 和 `_headers` 配置文件

---

## 🌐 Cloudflare Pages 部署

### 方法 A: 通过 Dashboard（推荐）

#### 步骤 1: 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**
4. 选择你的 GitHub/GitLab 仓库

#### 步骤 2: 配置构建

**Build configurations:**

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | None |
| **Build command** | `npm run build:cloudflare` |
| **Build output directory** | `dist` |
| **Root directory** | (留空) |

**Environment variables:**

```
NODE_VERSION = 18
NPM_FLAGS = --legacy-peer-deps
```

#### 步骤 3: 部署

点击 **Save and Deploy**，等待构建完成（约 2-3 分钟）

---

### 方法 B: 通过 Wrangler CLI

```bash
# 1. 安装 Wrangler
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 本地构建
npm run build

# 4. 部署
wrangler pages deploy dist --project-name=buildweb3

# 5. 后续部署
npm run build && wrangler pages deploy dist
```

---

### 方法 C: GitHub Actions 自动部署

创建 `.github/workflows/cloudflare-deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy to Cloudflare Pages
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build
        run: npm run build:cloudflare

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: buildweb3
          directory: dist
          gitHubToken: \${{ secrets.GITHUB_TOKEN }}
```

**设置 Secrets:**
1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 添加：
   - `CLOUDFLARE_API_TOKEN`: 从 Cloudflare Dashboard 获取
   - `CLOUDFLARE_ACCOUNT_ID`: 在 Cloudflare Pages 项目设置中找到

---

## 🔧 自定义域名设置

### 1. 添加域名

在 Cloudflare Pages 项目中：
1. 点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入 `buildweb3.com`（Cloudflare 会自动添加 `www` 变体）

### 2. DNS 自动配置

如果域名在 Cloudflare 托管，DNS 记录会自动添加：
```
A    buildweb3.com    → Cloudflare Pages IP
CNAME www            → buildweb3.com
```

### 3. 验证路由

等待 DNS 生效后访问：
- ✅ `https://buildweb3.com/` → Frontend 首页
- ✅ `https://buildweb3.com/assessment` → 评估页面
- ✅ `https://buildweb3.com/blog` → 博客首页
- ✅ `https://buildweb3.com/blog/web3-development-guide` → 博客文章

---

## 📝 构建命令说明

### 主要命令

```bash
# 开发环境（同时启动 frontend + blog）
npm run dev                # 所有服务
npm run dev:frontend       # 仅前端 (http://localhost:5173)
npm run dev:blog          # 仅博客 (http://localhost:3000)

# 生产构建
npm run build             # 完整构建
npm run build:frontend    # 仅构建前端 → frontend/dist
npm run build:blog        # 仅构建博客 → docs/build
npm run build:merge       # 合并构建到 dist/

# Cloudflare 部署
npm run build:cloudflare  # = build:frontend + build:blog + build:merge
```

### 构建流程

`npm run build:cloudflare` 执行以下步骤：

1. **构建 Frontend** (`frontend/dist/`)
   - Vite SSG 静态生成
   - 代码分割和优化
   - 多语言页面预渲染

2. **构建 Blog** (`docs/build/`)
   - Docusaurus 静态生成
   - Markdown 编译为 HTML
   - 标签和归档页面生成

3. **合并构建** (`dist/`)
   ```
   dist/
   ├── [frontend files]    # 根目录
   ├── blog/               # 博客子目录
   │   └── [blog files]
   ├── _redirects          # 路由规则
   └── _headers            # HTTP 头配置
   ```

---

## 🔒 安全配置

### HTTP 安全头（自动添加）

已在 `_headers` 文件配置：

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 缓存策略

- **静态资源** (`/assets/*`): 1 年缓存，immutable
- **图片**: 24 小时缓存
- **HTML**: 不缓存，实时更新

---

## ⚙️ 环境变量配置

### 生产环境变量

在 Cloudflare Pages 设置中添加：

```
NODE_ENV=production
VITE_API_URL=https://api.buildweb3.com
```

### 预览环境变量

为 Pull Request 预览添加不同的配置：

```
VITE_API_URL=https://staging-api.buildweb3.com
```

---

## 📊 性能优化

### 已启用的优化

1. ✅ **静态站点生成 (SSG)**
   - Frontend 使用 vite-react-ssg
   - Blog 使用 Docusaurus SSG
   - 所有页面预渲染为 HTML

2. ✅ **代码分割**
   - 按路由自动分割
   - 减小初始加载体积

3. ✅ **资源压缩**
   - Vite 自动压缩 JS/CSS
   - Cloudflare 自动开启 Brotli/Gzip

4. ✅ **图片优化**
   - 建议使用 WebP 格式
   - 添加合适的缓存头

### 性能指标目标

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: > 90

---

## 🐛 故障排查

### 问题 1: 构建失败

```bash
# 清理依赖重新安装
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# 清理构建缓存
rm -rf frontend/dist docs/build dist

# 重新构建
npm run build
```

### 问题 2: 博客路由 404

**检查 baseUrl:**
```typescript
// docs/docusaurus.config.ts
baseUrl: '/blog/',  // 必须有斜杠
```

**检查 _redirects 文件:**
```bash
cat dist/_redirects
```

应包含：
```
/blog/*   /blog/index.html   200
```

### 问题 3: 样式丢失

**确认资源路径:**
- Frontend: `/assets/*`
- Blog: `/blog/assets/*`

**检查构建输出:**
```bash
ls -la dist/
ls -la dist/blog/
```

### 问题 4: API 请求失败

**添加 API 代理** (如需要):

编辑 `wrangler.toml`:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-api.com/:splat"
  status = 200
```

---

## 📈 监控与分析

### Cloudflare Analytics

在 Pages 项目中查看：
- 📊 访问量统计
- 🌍 地理分布
- 📱 设备类型
- ⚡ 性能指标

### Google Analytics

已配置在 Docusaurus 中，需要添加 tracking ID:

```typescript
// docs/docusaurus.config.ts
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true,
}
```

---

## 🔄 更新部署

### 自动部署

推送到 main 分支会自动触发部署：

```bash
git add .
git commit -m "Update content"
git push origin main
```

### 手动部署

```bash
# 本地构建
npm run build

# 使用 Wrangler 部署
wrangler pages deploy dist
```

### 回滚

在 Cloudflare Dashboard 中：
1. 进入 Pages 项目
2. 点击 **Deployments**
3. 找到之前的成功部署
4. 点击 **Rollback to this deployment**

---

## 💡 最佳实践

### 开发流程

1. **本地开发**: `npm run dev`
2. **本地测试构建**: `npm run build && npx serve dist`
3. **提交代码**: Git push
4. **自动部署**: Cloudflare 自动构建和部署
5. **验证**: 检查预览链接

### 内容更新

- **Frontend 内容**: 修改 `frontend/src/` 后提交
- **Blog 文章**: 在 `docs/blog/` 添加 `.md` 文件
- **配置更新**: 修改对应的 config 文件

### 安全建议

- ✅ 不要提交敏感信息到代码库
- ✅ 使用环境变量存储 API 密钥
- ✅ 定期更新依赖包
- ✅ 启用 Cloudflare 的安全功能

---

## 📚 相关资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Vite 文档](https://vitejs.dev/)
- [Docusaurus 文档](https://docusaurus.io/)

---

## 💬 需要帮助？

- Cloudflare 社区: https://community.cloudflare.com/
- 项目 Issues: 在 GitHub 仓库创建 Issue

---

**✅ 部署完成后，你的网站将在全球 CDN 上以最快速度访问！**
