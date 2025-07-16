# Cloudflare Pages Deployment Guide

## Overview

This guide covers deploying the Klear Karma wiki application to Cloudflare Pages with full stack capabilities including R2 storage, KV workers, and edge computing.

## Prerequisites

- [x] Wrangler CLI installed and authenticated
- [ ] Cloudflare account with Pages enabled
- [ ] GitHub repository (for automated deployments)

## Quick Start

### 1. Manual Deployment

```bash
# Build and deploy to production
npm run deploy

# Build and deploy to preview
npm run deploy:preview

# Check authentication status
npm run cf:whoami
```

### 2. Automated Deployment (GitHub Actions)

1. **Set up GitHub Secrets:**
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. **Get API Token:**
   ```bash
   # Login to Cloudflare dashboard
   # Go to My Profile > API Tokens
   # Create token with permissions:
   # - Zone:Zone:Read
   # - Zone:Page Rules:Edit
   # - Account:Cloudflare Pages:Edit
   ```

3. **Get Account ID:**
   ```bash
   wrangler whoami
   # Or check Cloudflare dashboard sidebar
   ```

## Configuration Files

### wrangler.toml
Configures Cloudflare services:
- **Pages**: Static site hosting
- **KV Namespaces**: Key-value storage for caching and user data
- **R2 Buckets**: Object storage for assets and uploads
- **Durable Objects**: Real-time session management
- **Analytics Engine**: Usage tracking

### next.config.js
Configures Next.js for static export:
- Static export mode
- Image optimization disabled
- Webpack fallbacks for browser compatibility
- Security headers

## Cloudflare Services Setup

### 1. KV Namespaces

```bash
# Create production KV namespaces
wrangler kv:namespace create "WIKI_CACHE"
wrangler kv:namespace create "USER_DATA"

# Create preview KV namespaces
wrangler kv:namespace create "WIKI_CACHE" --preview
wrangler kv:namespace create "USER_DATA" --preview

# Update wrangler.toml with the returned IDs
```

### 2. R2 Buckets

```bash
# Create R2 buckets
wrangler r2 bucket create klearkarma-assets
wrangler r2 bucket create klearkarma-uploads
wrangler r2 bucket create klearkarma-assets-preview
wrangler r2 bucket create klearkarma-uploads-preview
```

### 3. Pages Project

```bash
# Create Pages project
wrangler pages project create klearkarma-wiki

# Or deploy directly
wrangler pages deploy out --project-name=klearkarma-wiki
```

## Environment Variables

Set these in Cloudflare Pages dashboard:

```bash
# Production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Add your custom environment variables here
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
```

## Custom Domain Setup

1. **Add Custom Domain:**
   ```bash
   wrangler pages domain add klearkarma.com --project-name=klearkarma-wiki
   ```

2. **Configure DNS:**
   - Add CNAME record pointing to your Pages domain
   - Or use Cloudflare as your DNS provider

## Advanced Features

### 1. Edge Functions

Create serverless functions for dynamic features:

```javascript
// functions/api/search.js
export async function onRequest(context) {
  const { request, env } = context;
  
  // Access KV storage
  const cache = await env.WIKI_CACHE.get('search-index');
  
  // Access R2 storage
  const object = await env.WIKI_ASSETS.get('search-data.json');
  
  return new Response(JSON.stringify({ results: [] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### 2. KV Storage Usage

```javascript
// Cache wiki content
await env.WIKI_CACHE.put('page:home', JSON.stringify(pageData), {
  expirationTtl: 3600 // 1 hour
});

// Store user preferences
await env.USER_DATA.put(`user:${userId}:preferences`, JSON.stringify(prefs));
```

### 3. R2 Storage Usage

```javascript
// Upload file to R2
const object = await env.WIKI_ASSETS.put('images/logo.png', file, {
  httpMetadata: {
    contentType: 'image/png',
    cacheControl: 'public, max-age=31536000'
  }
});

// Generate public URL
const url = `https://assets.klearkarma.com/${object.key}`;
```

## Monitoring and Analytics

### 1. Analytics Engine

```javascript
// Track page views
context.env.WIKI_ANALYTICS.writeDataPoint({
  blobs: ['page-view', request.url],
  doubles: [Date.now()],
  indexes: [userId]
});
```

### 2. Real-time Monitoring

- **Cloudflare Dashboard**: View deployment status, analytics
- **Wrangler CLI**: `wrangler pages deployment list`
- **Logs**: `wrangler pages deployment tail`

## Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Check build logs
   npm run build:static
   
   # Verify Next.js config
   npx next info
   ```

2. **Authentication Issues:**
   ```bash
   # Re-authenticate
   wrangler auth login
   
   # Check current user
   wrangler auth whoami
   ```

3. **Deployment Errors:**
   ```bash
   # Check deployment status
   wrangler pages deployment list --project-name=klearkarma-wiki
   
   # View deployment logs
   wrangler pages deployment tail --project-name=klearkarma-wiki
   ```

### Performance Optimization

1. **Enable Cloudflare Features:**
   - Auto Minify (CSS, JS, HTML)
   - Brotli compression
   - HTTP/3
   - Early Hints

2. **Configure Caching:**
   ```javascript
   // In edge functions
   return new Response(content, {
     headers: {
       'Cache-Control': 'public, max-age=3600',
       'CDN-Cache-Control': 'public, max-age=86400'
     }
   });
   ```

## Security

### 1. Access Control

```javascript
// functions/_middleware.js
export async function onRequest(context) {
  const { request } = context;
  
  // Add security headers
  const response = await context.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}
```

### 2. Rate Limiting

```javascript
// Use Durable Objects for rate limiting
export class RateLimiter {
  async fetch(request) {
    const ip = request.headers.get('CF-Connecting-IP');
    // Implement rate limiting logic
  }
}
```

## Next Steps

1. **Set up monitoring and alerts**
2. **Configure custom domain**
3. **Implement edge functions for dynamic features**
4. **Set up database integration (D1 or external)**
5. **Add authentication (Cloudflare Access or external)**

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)