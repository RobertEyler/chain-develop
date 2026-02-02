import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { translations } from '../src/i18n/translations.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = join(__dirname, '..', 'dist')

const SITE_BASE = process.env.SITE_URL || 'https://buildweb3.io'

// 从 translations.js 读取 SEO 内容配置
const seoContent = {
  en: {
    lang: 'en',
    title: translations.en.home.title,
    description: translations.en.home.description,
    keywords: translations.en.home.keywords,
  },
  'zh-CN': {
    lang: 'zh-CN',
    title: translations['zh-CN'].home.title,
    description: translations['zh-CN'].home.description,
    keywords: translations['zh-CN'].home.keywords,
  },
  'zh-TW': {
    lang: 'zh-TW',
    title: translations['zh-TW'].home.title,
    description: translations['zh-TW'].home.description,
    keywords: translations['zh-TW'].home.keywords,
  },
}

// 需要生成的路由（包括多语言路由）；根路径 / 由 vite 输出，需要单独处理
const routes = [
  { path: '/', lang: 'en' },
  { path: '/assessment', lang: 'en' },
  { path: '/zh-CN', lang: 'zh-CN' },
  { path: '/zh-CN/assessment', lang: 'zh-CN' },
  { path: '/zh-TW', lang: 'zh-TW' },
  { path: '/zh-TW/assessment', lang: 'zh-TW' },
]

const sitemapPaths = ['/', '/assessment', '/zh-CN', '/zh-CN/assessment', '/zh-TW', '/zh-TW/assessment']

// 生成 hreflang 标签的辅助函数
function generateHreflangTags(currentPath) {
  // 移除路径中的语言前缀，得到基础路径
  const pathWithoutLang = currentPath.replace(/^\/(zh-CN|zh-TW)/, '') || '/'
  
  // 为所有语言版本生成 URL
  const urls = {
    en: `${SITE_BASE}${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
    'zh-CN': `${SITE_BASE}/zh-CN${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
    'zh-TW': `${SITE_BASE}/zh-TW${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
  }
  
  return `
    <link rel="canonical" href="${urls[currentPath.startsWith('/zh-CN') ? 'zh-CN' : currentPath.startsWith('/zh-TW') ? 'zh-TW' : 'en']}" />
    <link rel="alternate" hreflang="en" href="${urls.en}" />
    <link rel="alternate" hreflang="zh-Hans" href="${urls['zh-CN']}" />
    <link rel="alternate" hreflang="zh-Hant" href="${urls['zh-TW']}" />
    <link rel="alternate" hreflang="x-default" href="${urls.en}" />
  `
}

async function copyRoutes() {
  try {
    // 读取 index.html
    const indexHtmlPath = join(distDir, 'index.html')
    let htmlContent = await readFile(indexHtmlPath, 'utf-8')
    
    for (const route of routes) {
      // 移除前导斜杠并创建目录路径
      const routePath = route.path.replace(/^\//, '')
      let routeHtmlContent = htmlContent
      let targetPath = indexHtmlPath
      
      // 如果不是根路径，需要创建目录并写入文件
      if (route.path !== '/') {
        const routeDir = join(distDir, routePath)
        // 创建目录（如果不存在）
        await mkdir(routeDir, { recursive: true })
        targetPath = join(routeDir, 'index.html')
        
        // 修正资源路径：将相对路径改为从根目录开始的绝对路径
        // ./assets/... -> /assets/...
        routeHtmlContent = routeHtmlContent.replace(/href="\.\//g, 'href="/')
        routeHtmlContent = routeHtmlContent.replace(/src="\.\//g, 'src="/')
      }
      
      // 根据语言替换 SEO meta 标签
      const seo = seoContent[route.lang]
      if (seo) {
        // 替换 lang 属性
        routeHtmlContent = routeHtmlContent.replace(/<html lang="[^"]*">/, `<html lang="${seo.lang}">`)
        
        // 替换 title
        routeHtmlContent = routeHtmlContent.replace(
          /<title>.*?<\/title>/,
          `<title>${seo.title}</title>`
        )
        
        // 替换 description
        routeHtmlContent = routeHtmlContent.replace(
          /<meta name="description" content="[^"]*"\/?>/,
          `<meta name="description" content="${seo.description}" />`
        )
        
        // 替换 keywords
        routeHtmlContent = routeHtmlContent.replace(
          /<meta name="keywords" content="[^"]*"\/?>/,
          `<meta name="keywords" content="${seo.keywords}" />`
        )
      }
      
      // 移除现有的 hreflang 标签（如果有）
      routeHtmlContent = routeHtmlContent.replace(
        /\s*<!-- Hreflang tags for multi-language SEO.*?-->\s*<link rel="alternate".*?\/>\s*<link rel="alternate".*?\/>\s*<link rel="alternate".*?\/>\s*<link rel="alternate".*?\/>/s,
        ''
      )
      
      // 在 </head> 前插入正确的 hreflang 和 canonical 标签
      const hreflangTags = generateHreflangTags(route.path)
      routeHtmlContent = routeHtmlContent.replace(
        '</head>',
        `  ${hreflangTags}\n  </head>`
      )
      
      // 写入修正后的 HTML
      await writeFile(targetPath, routeHtmlContent, 'utf-8')
      
      console.log(`✓ Generated static page: ${route.path} (${route.lang})`)
    }

    const lastmod = new Date().toISOString().slice(0, 10)

    // 生成包含 hreflang 的 sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapPaths.map((p) => {
  // 确定当前路径对应的所有语言版本的 URL
  const pathWithoutLang = p.replace(/^\/(zh-CN|zh-TW)/, '') || '/'
  const urls = {
    en: `${SITE_BASE}${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
    'zh-CN': `${SITE_BASE}/zh-CN${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
    'zh-TW': `${SITE_BASE}/zh-TW${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
  }
  
  const currentUrl = p.startsWith('/zh-CN') ? urls['zh-CN'] : p.startsWith('/zh-TW') ? urls['zh-TW'] : urls.en
  
  return `  <url>
    <loc>${currentUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${urls.en}" />
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${urls['zh-CN']}" />
    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${urls['zh-TW']}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${urls.en}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pathWithoutLang === '/' ? '1.0' : '0.8'}</priority>
  </url>`
}).join('\n')}
</urlset>
`
    await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf-8')
    console.log('✓ Generated sitemap.xml')

    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_BASE}/sitemap.xml
`
    await writeFile(join(distDir, 'robots.txt'), robots, 'utf-8')
    console.log('✓ Generated robots.txt')
    
    console.log('✓ All routes copied successfully')
  } catch (error) {
    console.error('Error copying routes:', error)
    process.exit(1)
  }
}

copyRoutes()
