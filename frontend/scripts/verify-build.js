#!/usr/bin/env node
/**
 * 验证构建后的 HTML 文件是否包含正确的 hreflang 和 canonical 标签
 */

import { readFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = join(__dirname, '..', 'dist')

const checks = [
  {
    file: 'index.html',
    lang: 'en',
    canonical: 'https://buildweb3.io',
    description: 'Professional enterprise blockchain development services',
  },
  {
    file: 'zh-CN/index.html',
    lang: 'zh-CN',
    canonical: 'https://buildweb3.io/zh-CN',
    description: '专业的企业区块链开发服务',
  },
  {
    file: 'zh-TW/index.html',
    lang: 'zh-TW',
    canonical: 'https://buildweb3.io/zh-TW',
    description: '專業的企業區塊鏈開發服務',
  },
  {
    file: 'assessment/index.html',
    lang: 'en',
    canonical: 'https://buildweb3.io/assessment',
    description: 'Professional enterprise blockchain development services',
  },
]

async function verifyBuild() {
  console.log('🔍 验证构建结果...\n')
  
  let allPassed = true
  
  for (const check of checks) {
    const filePath = join(distDir, check.file)
    console.log(`📄 检查文件: ${check.file}`)
    
    try {
      const content = await readFile(filePath, 'utf-8')
      
      // 检查 lang 属性
      const langMatch = content.match(/<html lang="([^"]*)"/)
      if (langMatch && langMatch[1] === check.lang) {
        console.log(`  ✅ lang="${check.lang}"`)
      } else {
        console.log(`  ❌ lang 属性不正确: 期望 "${check.lang}", 得到 "${langMatch?.[1] || '未找到'}"`)
        allPassed = false
      }
      
      // 检查 canonical
      const canonicalMatch = content.match(/<link rel="canonical" href="([^"]*)"/)
      if (canonicalMatch && canonicalMatch[1] === check.canonical) {
        console.log(`  ✅ canonical="${check.canonical}"`)
      } else {
        console.log(`  ❌ canonical 不正确: 期望 "${check.canonical}", 得到 "${canonicalMatch?.[1] || '未找到'}"`)
        allPassed = false
      }
      
      // 检查 hreflang 标签
      const hreflangCount = (content.match(/rel="alternate" hreflang=/g) || []).length
      if (hreflangCount === 4) {
        console.log(`  ✅ 包含 4 个 hreflang 标签 (en, zh-Hans, zh-Hant, x-default)`)
      } else {
        console.log(`  ❌ hreflang 标签数量不正确: 期望 4 个, 得到 ${hreflangCount} 个`)
        allPassed = false
      }
      
      // 检查描述
      if (content.includes(check.description)) {
        console.log(`  ✅ 包含正确的描述`)
      } else {
        console.log(`  ❌ 描述不正确或未找到`)
        allPassed = false
      }
      
      console.log()
    } catch (error) {
      console.log(`  ❌ 无法读取文件: ${error.message}`)
      console.log()
      allPassed = false
    }
  }
  
  // 检查 sitemap.xml
  console.log('📄 检查 sitemap.xml')
  try {
    const sitemapPath = join(distDir, 'sitemap.xml')
    const sitemap = await readFile(sitemapPath, 'utf-8')
    
    if (sitemap.includes('xmlns:xhtml')) {
      console.log('  ✅ 包含 xhtml 命名空间')
    } else {
      console.log('  ❌ 缺少 xhtml 命名空间')
      allPassed = false
    }
    
    const urlCount = (sitemap.match(/<url>/g) || []).length
    if (urlCount === 6) {
      console.log(`  ✅ 包含 6 个 URL 条目`)
    } else {
      console.log(`  ❌ URL 数量不正确: 期望 6 个, 得到 ${urlCount} 个`)
      allPassed = false
    }
    
    console.log()
  } catch (error) {
    console.log(`  ❌ 无法读取 sitemap.xml: ${error.message}`)
    console.log()
    allPassed = false
  }
  
  // 检查 robots.txt
  console.log('📄 检查 robots.txt')
  try {
    const robotsPath = join(distDir, 'robots.txt')
    const robots = await readFile(robotsPath, 'utf-8')
    
    if (robots.includes('Sitemap:')) {
      console.log('  ✅ 包含 Sitemap 指令')
    } else {
      console.log('  ❌ 缺少 Sitemap 指令')
      allPassed = false
    }
    
    console.log()
  } catch (error) {
    console.log(`  ❌ 无法读取 robots.txt: ${error.message}`)
    console.log()
    allPassed = false
  }
  
  if (allPassed) {
    console.log('✅ 所有检查通过！')
    process.exit(0)
  } else {
    console.log('❌ 部分检查失败，请查看上面的错误信息')
    process.exit(1)
  }
}

verifyBuild()
