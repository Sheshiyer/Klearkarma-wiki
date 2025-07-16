/**
 * Cloudflare Pages Function - Health Check API
 * This demonstrates how to create serverless API endpoints
 * that can access KV storage, R2 buckets, and other Cloudflare services
 */

export async function onRequestGET(context) {
  const { request, env } = context;
  
  try {
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Example: Check KV storage (if available)
    let kvStatus = 'not configured';
    if (env.WIKI_CACHE) {
      try {
        await env.WIKI_CACHE.put('health-check', timestamp, { expirationTtl: 60 });
        const stored = await env.WIKI_CACHE.get('health-check');
        kvStatus = stored ? 'healthy' : 'error';
      } catch (error) {
        kvStatus = 'error: ' + error.message;
      }
    }
    
    // Example: Check R2 storage (if available)
    let r2Status = 'not configured';
    if (env.WIKI_ASSETS) {
      try {
        // Try to list objects (lightweight operation)
        const list = await env.WIKI_ASSETS.list({ limit: 1 });
        r2Status = 'healthy';
      } catch (error) {
        r2Status = 'error: ' + error.message;
      }
    }
    
    // Get request information
    const requestInfo = {
      url: request.url,
      method: request.method,
      headers: {
        'user-agent': request.headers.get('user-agent'),
        'cf-ray': request.headers.get('cf-ray'),
        'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
        'cf-ipcountry': request.headers.get('cf-ipcountry')
      },
      cf: request.cf ? {
        colo: request.cf.colo,
        country: request.cf.country,
        city: request.cf.city,
        timezone: request.cf.timezone
      } : null
    };
    
    // Health check response
    const healthData = {
      status: 'healthy',
      timestamp,
      environment: env.NODE_ENV || 'development',
      services: {
        kv: kvStatus,
        r2: r2Status
      },
      request: requestInfo,
      version: '1.0.0'
    };
    
    // Track analytics (if available)
    if (env.WIKI_ANALYTICS) {
      try {
        env.WIKI_ANALYTICS.writeDataPoint({
          blobs: ['health-check', 'api'],
          doubles: [Date.now()],
          indexes: [request.headers.get('cf-connecting-ip') || 'unknown']
        });
      } catch (error) {
        console.warn('Analytics tracking failed:', error.message);
      }
    }
    
    return new Response(JSON.stringify(healthData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'X-Powered-By': 'Cloudflare Pages Functions'
      }
    });
    
  } catch (error) {
    console.error('Health check error:', error);
    
    return new Response(JSON.stringify({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
}

// Handle OPTIONS requests for CORS
export async function onRequestOPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}