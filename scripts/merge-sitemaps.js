/**
 * 合并 frontend 和 docs 的 sitemap.xml
 */

const fs = require('fs-extra');
const path = require('path');

async function mergeSitemaps() {
  console.log('🗺️  Merging sitemaps...');

  const rootDir = process.cwd();
  const frontendSitemap = path.join(rootDir, 'frontend', 'dist', 'sitemap.xml');
  const blogSitemap = path.join(rootDir, 'dist', 'blog', 'sitemap.xml');
  const outputSitemap = path.join(rootDir, 'dist', 'sitemap.xml');

  try {
    // 1. 读取 frontend sitemap
    console.log('📖 Reading frontend sitemap...');
    let frontendContent = '';
    if (await fs.pathExists(frontendSitemap)) {
      frontendContent = await fs.readFile(frontendSitemap, 'utf8');
    } else {
      console.warn('⚠️  Frontend sitemap not found, skipping...');
      frontendContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
</urlset>`;
    }

    // 2. 读取 blog sitemap
    console.log('📖 Reading blog sitemap...');
    let blogContent = '';
    if (await fs.pathExists(blogSitemap)) {
      blogContent = await fs.readFile(blogSitemap, 'utf8');
      // 修正博客 URL（从 buildweb3.com 改为 buildweb3.io）
      blogContent = blogContent.replace(/https:\/\/buildweb3\.com\/blog\//g, 'https://buildweb3.io/blog/');
      blogContent = blogContent.replace(/https:\/\/buildweb3\.com\/blog\//g, 'https://buildweb3.io/blog/');
    } else {
      console.warn('⚠️  Blog sitemap not found, skipping...');
    }

    // 3. 提取 blog 的 URL 条目
    const blogUrls = [];
    if (blogContent) {
      const urlMatches = blogContent.matchAll(/<url>[\s\S]*?<\/url>/g);
      for (const match of urlMatches) {
        blogUrls.push(match[0]);
      }
    }
    console.log(`✅ Found ${blogUrls.length} blog URLs`);

    // 4. 合并到 frontend sitemap
    // 移除 frontend sitemap 的 </urlset> 结束标签
    let mergedContent = frontendContent.replace('</urlset>', '');
    
    // 添加博客 URLs
    for (const url of blogUrls) {
      mergedContent += '\n  ' + url;
    }
    
    // 添加结束标签
    mergedContent += '\n</urlset>';

    // 5. 格式化 XML（美化输出）
    mergedContent = mergedContent
      .replace(/></g, '>\n<')
      .replace(/<url>/g, '\n  <url>')
      .replace(/<\/url>/g, '</url>')
      .replace(/\n\s*\n/g, '\n');

    // 6. 写入合并后的 sitemap
    console.log('💾 Writing merged sitemap...');
    await fs.writeFile(outputSitemap, mergedContent, 'utf8');
    
    console.log('✅ Sitemap merged successfully!');
    console.log(`📍 Output: ${outputSitemap}`);
    
    // 统计信息
    const urlCount = (mergedContent.match(/<url>/g) || []).length;
    console.log(`📊 Total URLs: ${urlCount}`);

  } catch (error) {
    console.error('❌ Error merging sitemaps:', error);
    process.exit(1);
  }
}

mergeSitemaps();
