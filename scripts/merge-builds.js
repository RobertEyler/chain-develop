/**
 * 合并 frontend 和 docs 的构建输出
 * frontend 构建到 dist/
 * docs 构建到 dist/blog/
 */

const fs = require('fs-extra');
const path = require('path');

async function mergeBuild() {
  console.log('📦 Merging builds...');

  const rootDir = process.cwd();
  const frontendBuild = path.join(rootDir, 'frontend', 'dist');
  const docsBuild = path.join(rootDir, 'docs', 'build');
  const outputDir = path.join(rootDir, 'dist');

  try {
    // 1. 清理输出目录
    console.log('🧹 Cleaning output directory...');
    await fs.remove(outputDir);
    await fs.ensureDir(outputDir);

    // 2. 复制 frontend 构建
    console.log('📋 Copying frontend build...');
    if (await fs.pathExists(frontendBuild)) {
      await fs.copy(frontendBuild, outputDir);
      console.log('✅ Frontend copied to dist/');
    } else {
      console.error('❌ Frontend build not found at:', frontendBuild);
      process.exit(1);
    }

    // 3. 复制 docs 构建到 /blog
    console.log('📋 Copying blog build...');
    const blogOutput = path.join(outputDir, 'blog');
    if (await fs.pathExists(docsBuild)) {
      await fs.copy(docsBuild, blogOutput);
      console.log('✅ Blog copied to dist/blog/');
    } else {
      console.error('❌ Blog build not found at:', docsBuild);
      process.exit(1);
    }

    // 4. 不需要 _redirects 文件
    // 因为 vite-react-ssg 和 docusaurus 都是完全静态生成
    // Cloudflare Pages 会自动服务静态文件
    console.log('✅ Static files are ready, no redirects needed');

    // 5. 创建 _headers 文件（安全头和缓存）
    console.log('📝 Creating _headers file...');
    const headers = `
# Security headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# XML files
/sitemap.xml
  Content-Type: application/xml

/robots.txt
  Content-Type: text/plain

# RSS/Atom feeds
/blog/*.xml
  Content-Type: application/xml

# Cache static assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/blog/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache images
/*.jpg
  Cache-Control: public, max-age=86400

/*.png
  Cache-Control: public, max-age=86400

/*.svg
  Cache-Control: public, max-age=86400

/*.webp
  Cache-Control: public, max-age=86400
`.trim();

    await fs.writeFile(path.join(outputDir, '_headers'), headers);
    console.log('✅ _headers created');

    // 5. 合并 sitemap.xml
    console.log('📝 Merging sitemap.xml files...');
    const frontendSitemap = path.join(outputDir, 'sitemap.xml');
    const blogSitemap = path.join(blogOutput, 'sitemap.xml');
    
    let combinedUrls = [];
    
    // 读取 frontend sitemap
    if (await fs.pathExists(frontendSitemap)) {
      const frontendContent = await fs.readFile(frontendSitemap, 'utf-8');
      // 提取所有 <url>...</url> 块
      const urlMatches = frontendContent.match(/<url>[\s\S]*?<\/url>/g) || [];
      combinedUrls.push(...urlMatches);
    }
    
    // 读取 blog sitemap 并调整路径
    if (await fs.pathExists(blogSitemap)) {
      const blogContent = await fs.readFile(blogSitemap, 'utf-8');
      const urlMatches = blogContent.match(/<url>[\s\S]*?<\/url>/g) || [];
      // 将 blog 的 URL 从 /blog/xxx 调整为 /blog/xxx（已经包含 /blog/）
      const adjustedUrls = urlMatches.map(url => {
        // 如果 URL 中不包含 /blog/，则添加
        return url.replace(
          /<loc>https:\/\/buildweb3\.io\//g,
          '<loc>https://buildweb3.io/blog/'
        ).replace(
          /hreflang="[^"]*" href="https:\/\/buildweb3\.io\//g,
          (match) => match.replace('https://buildweb3.io/', 'https://buildweb3.io/blog/')
        );
      });
      combinedUrls.push(...adjustedUrls);
    }
    
    // 生成合并后的 sitemap
    const combinedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${combinedUrls.join('\n')}
</urlset>
`;
    
    await fs.writeFile(frontendSitemap, combinedSitemap, 'utf-8');
    console.log('✅ Sitemap.xml merged');

    // 6. 输出统计信息
    console.log('\n📊 Build Statistics:');
    const getSize = async (dir) => {
      const files = await fs.readdir(dir, { recursive: true, withFileTypes: true });
      let size = 0;
      for (const file of files) {
        if (file.isFile()) {
          const stats = await fs.stat(path.join(file.path || file.parentPath, file.name));
          size += stats.size;
        }
      }
      return (size / 1024 / 1024).toFixed(2);
    };

    const frontendSize = await getSize(outputDir);
    const blogSize = await getSize(blogOutput);
    
    console.log(`   Frontend: ${frontendSize} MB`);
    console.log(`   Blog: ${blogSize} MB`);
    console.log(`   Total: ${(parseFloat(frontendSize) + parseFloat(blogSize)).toFixed(2)} MB`);

    console.log('\n✅ Build merge completed successfully!');
    console.log(`📁 Output directory: ${outputDir}`);
    console.log('\n📤 Ready to deploy to Cloudflare Pages');

  } catch (error) {
    console.error('❌ Error merging builds:', error);
    process.exit(1);
  }
}

mergeBuild();
