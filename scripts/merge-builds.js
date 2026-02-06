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

    // 4. 创建 _redirects 文件（用于 Cloudflare Pages）
    console.log('📝 Creating _redirects file...');
    const redirects = `
# SPA fallback for frontend
/*    /index.html   200

# Blog routes
/blog/*   /blog/index.html   200
`.trim();
    
    await fs.writeFile(path.join(outputDir, '_redirects'), redirects);
    console.log('✅ _redirects created');

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
