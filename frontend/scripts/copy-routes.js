import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { translations } from '../src/i18n/translations.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = join(__dirname, '..', 'dist')

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

// 需要生成的路由（包括多语言路由）
const routes = [
  { path: '/assessment', lang: 'en' },
  { path: '/zh-CN', lang: 'zh-CN' },
  { path: '/zh-CN/assessment', lang: 'zh-CN' },
  { path: '/zh-TW', lang: 'zh-TW' },
  { path: '/zh-TW/assessment', lang: 'zh-TW' },
]

async function copyRoutes() {
  try {
    // 读取 index.html
    const indexHtmlPath = join(distDir, 'index.html')
    let htmlContent = await readFile(indexHtmlPath, 'utf-8')
    
    for (const route of routes) {
      // 移除前导斜杠并创建目录路径
      const routePath = route.path.replace(/^\//, '')
      const routeDir = join(distDir, routePath)
      
      // 创建目录（如果不存在）
      await mkdir(routeDir, { recursive: true })
      
      // 修正资源路径：将相对路径改为从根目录开始的绝对路径
      // ./assets/... -> /assets/...
      let routeHtmlContent = htmlContent.replace(/href="\.\//g, 'href="/')
      routeHtmlContent = routeHtmlContent.replace(/src="\.\//g, 'src="/')
      
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
      
      // 写入修正后的 HTML 到路由目录
      const routeHtml = join(routeDir, 'index.html')
      await writeFile(routeHtml, routeHtmlContent, 'utf-8')
      
      console.log(`✓ Generated static page: ${route.path} (${route.lang})`)
    }
    
    console.log('✓ All routes copied successfully')
  } catch (error) {
    console.error('Error copying routes:', error)
    process.exit(1)
  }
}

copyRoutes()
