# 🚀 Cloudflare Pages 部署 - 快速参考

## 📦 部署命令

### 本地构建测试
```bash
npm run build
```

### Cloudflare Pages 配置

**Build command:**
```bash
npm run build:cloudflare
```

**Build output directory:**
```bash
dist
```

**Environment variables:**
```bash
NODE_VERSION=18
NPM_FLAGS=--legacy-peer-deps
```

---

## 🌐 部署后的 URL 结构

```
https://buildweb3.com/              → Frontend 主站
https://buildweb3.com/assessment    → 评估页面
https://buildweb3.com/zh-CN         → 简体中文
https://buildweb3.com/zh-TW         → 繁体中文
https://buildweb3.com/blog          → Docusaurus 博客
https://buildweb3.com/blog/xxx      → 博客文章
```

---

## 📁 构建输出结构

```
dist/
├── index.html              # Frontend 首页
├── assessment/
├── zh-CN/
├── zh-TW/
├── assets/                 # Frontend 资源
├── blog/                   # Docusaurus 博客
│   ├── index.html
│   ├── assets/
│   └── ...
├── _redirects              # 路由规则
└── _headers                # 缓存和安全头
```

---

## ⚡ 快速部署步骤

### 使用 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create application → Pages
3. 连接 Git 仓库
4. 配置:
   - Build command: `npm run build:cloudflare`
   - Build output: `dist`
   - NODE_VERSION: `18`
   - NPM_FLAGS: `--legacy-peer-deps`
5. Save and Deploy

### 使用 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=buildweb3
```

---

## 🔄 构建流程

`npm run build:cloudflare` 执行:

1. ✅ `npm run build:frontend` → `frontend/dist/`
2. ✅ `npm run build:blog` → `docs/build/`  
3. ✅ `npm run build:merge` → 合并到 `dist/`

---

## 📝 相关文件

- **构建脚本**: `scripts/merge-builds.js`
- **Cloudflare 配置**: `wrangler.toml`
- **详细文档**: `DEPLOY_GUIDE.md`

---

**✅ 完成后即可全球访问！**
