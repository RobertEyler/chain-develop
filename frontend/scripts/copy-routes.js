import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = join(__dirname, '..', 'dist')

// 需要生成的路由
const routes = ['/assessment']

async function copyRoutes() {
  try {
    // 读取 index.html
    const indexHtmlPath = join(distDir, 'index.html')
    let htmlContent = await readFile(indexHtmlPath, 'utf-8')
    
    for (const route of routes) {
      // 移除前导斜杠并创建目录路径
      const routePath = route.replace(/^\//, '')
      const routeDir = join(distDir, routePath)
      
      // 创建目录（如果不存在）
      await mkdir(routeDir, { recursive: true })
      
      // 修正资源路径：将相对路径改为从根目录开始的绝对路径
      // ./assets/... -> /assets/...
      let routeHtmlContent = htmlContent.replace(/href="\.\//g, 'href="/')
      routeHtmlContent = routeHtmlContent.replace(/src="\.\//g, 'src="/')
      
      // 写入修正后的 HTML 到路由目录
      const routeHtml = join(routeDir, 'index.html')
      await writeFile(routeHtml, routeHtmlContent, 'utf-8')
      
      console.log(`✓ Generated static page: ${route}`)
    }
    
    console.log('✓ All routes copied successfully')
  } catch (error) {
    console.error('Error copying routes:', error)
    process.exit(1)
  }
}

copyRoutes()
