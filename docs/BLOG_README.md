# BuildWeb3 Blog

This directory contains the Docusaurus-based blog for BuildWeb3.

## Quick Start

### Development
```bash
# From root directory
npm run dev:blog

# Or from docs directory
cd docs
npm start
```

The blog will be available at `http://localhost:3000`

### Production Build
```bash
# From root directory
npm run build:blog

# Serve the built site
npm run serve:blog
```

## Creating Blog Posts

### File Structure
```
docs/
├── blog/
│   ├── 2026-02-06-web3-development-guide.md
│   ├── 2026-02-05-solana-vs-ethereum-2026.md
│   └── authors.yml
```

### Blog Post Template

Create a new file in `docs/blog/` with the naming format: `YYYY-MM-DD-title.md`

```markdown
---
slug: your-post-slug
title: Your Blog Post Title
authors: buildweb3
tags: [web3, blockchain, development]
---

# Your Blog Post Title

Brief introduction paragraph that appears in the blog list.

<!--truncate-->

Main content starts here. Everything after <!--truncate--> 
will only show on the full post page.

## Section 1

Your content...

## Section 2

More content...
```

### Front Matter Options

- `slug`: URL-friendly identifier for the post
- `title`: Post title (appears in `<title>` tag)
- `authors`: Author ID from `authors.yml`
- `tags`: Array of tags for categorization
- `date`: Optional, defaults to filename date
- `image`: Optional social card image
- `description`: Optional meta description

## Styling Guide

The blog theme matches the main BuildWeb3 website:
- **Primary Color**: Teal (#0d9488)
- **Font**: Inter
- **Design**: Modern, clean, Web3-focused

Custom styles are in `docs/src/css/custom.css`

## Multi-language Support

The blog supports 3 languages:
- English (default)
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)

To add translations:
1. Create language folders: `i18n/zh-CN/docusaurus-plugin-content-blog/`
2. Translate blog posts in those folders
3. Update `docusaurus.config.ts` if needed

## Integration with Main Site

The main website (frontend) has a "Blog" link in the navigation that opens the blog in a new tab.

### Menu Link
- Desktop: Top navigation bar
- Mobile: Hamburger menu
- Opens at: `/blog` (or configured baseUrl)

## Deployment

### Option 1: Separate Deployment
Deploy the blog separately on `/blog` subdirectory:
```bash
cd docs
npm run build
# Deploy dist/ to your hosting
```

### Option 2: Integrated Build
Build everything together:
```bash
# From root
npm run build
# This builds frontend, backend, and blog
```

### Nginx Configuration
```nginx
# Main site
location / {
    root /var/www/buildweb3/frontend/dist;
    try_files $uri $uri/ /index.html;
}

# Blog
location /blog {
    alias /var/www/buildweb3/docs/build;
    try_files $uri $uri/ /blog/index.html;
}
```

## SEO Optimization

Each blog post automatically gets:
- ✅ Proper `<title>` and `<meta>` tags
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD structured data
- ✅ Sitemap.xml generation
- ✅ RSS feed at `/blog/rss.xml`

### SEO Checklist for New Posts
- [ ] Use keyword-rich title (60 chars max)
- [ ] Include target keywords naturally
- [ ] Add descriptive alt text to images
- [ ] Use proper heading hierarchy (H2, H3)
- [ ] Internal links to other posts
- [ ] External links to authoritative sources
- [ ] Add relevant tags (max 5)

## Content Strategy

### Blog Pillars (from 推广.md)

1. **Technical Tutorials (60%)**
   - Smart contract development
   - DeFi protocol guides
   - Security best practices

2. **Case Studies (20%)**
   - Real project examples
   - Problem-solving stories
   - Performance optimization

3. **Industry Insights (15%)**
   - Web3 trends
   - Blockchain comparisons
   - Development tools reviews

4. **Service Promotion (5%)**
   - Subtle CTAs to main site
   - Free assessment offers

### Publishing Schedule
- **Frequency**: 2 posts per week
- **Length**: 
  - Deep dive: 2000-3000 words
  - Quick tutorials: 1000-1500 words
- **Best days**: Tuesday & Thursday

### SEO Keywords (from seo搜索词.txt)
- defi development service
- web3 development services
- enterprise blockchain development services
- blockchain smart contract development services
- solana blockchain development services

## Analytics

### Add Google Analytics
Edit `docusaurus.config.ts`:
```typescript
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true,
},
```

### Track Key Metrics
- Page views per post
- Time on page
- Bounce rate
- CTA click-through rate
- Blog → Main site conversions

## Maintenance

### Weekly Tasks
- [ ] Publish 2 new posts
- [ ] Update trending topics
- [ ] Respond to comments (if enabled)
- [ ] Check broken links

### Monthly Tasks
- [ ] Review analytics
- [ ] Update outdated content
- [ ] SEO performance audit
- [ ] Add internal links to new posts

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Build Errors
```bash
# Clear cache
cd docs
npm run clear
npm run build
```

### Style Not Updating
```bash
# Clear browser cache or
# Force reload with Ctrl+Shift+R
```

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

**Questions?** Check the main [README.md](../README.md) or open an issue.
