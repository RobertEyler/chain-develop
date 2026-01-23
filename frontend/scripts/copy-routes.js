import { mkdir, copyFile } from 'fs/promises'
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
    const indexHtml = join(distDir, 'index.html')
    
    for (const route of routes) {
      // 移除前导斜杠并创建目录路径
      const routePath = route.replace(/^\//, '')
      const routeDir = join(distDir, routePath)
      
      // 创建目录（如果不存在）
      await mkdir(routeDir, { recursive: true })
      
      // 复制 index.html 到路由目录
      const routeHtml = join(routeDir, 'index.html')
      await copyFile(indexHtml, routeHtml)
      
      console.log(`✓ Generated static page: ${route}`)
    }
    
    console.log('✓ All routes copied successfully')
  } catch (error) {
    console.error('Error copying routes:', error)
    process.exit(1)
  }
}

copyRoutes()
