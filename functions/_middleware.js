/**
 * Cloudflare Pages Functions Middleware
 * This runs before all other functions and adds security headers,
 * logging, and basic request processing
 */

export async function onRequest(context) {
  const { request, next, env } = context;
  
  // Get the response from the next function in the chain
  const response = await next();
  
  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response);
  
  // Add security headers
  newResponse.headers.set('X-Frame-Options', 'DENY');
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newResponse.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Add CSP header for enhanced security
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  newResponse.headers.set('Content-Security-Policy', csp);
  
  // Add performance headers
  newResponse.headers.set('X-Powered-By', 'Cloudflare Pages');
  
  // Add CORS headers for API routes
  if (request.url.includes('/api/')) {
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  // Log request (in development or if analytics is available)
  if (env?.NODE_ENV !== 'production' || env?.WIKI_ANALYTICS) {
    const logData = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('cf-connecting-ip'),
      country: request.headers.get('cf-ipcountry'),
      status: response.status
    };
    
    // Log to console in development
    if (env?.NODE_ENV !== 'production') {
      console.log('Request:', JSON.stringify(logData, null, 2));
    }
    
    // Track in analytics if available
    if (env?.WIKI_ANALYTICS) {
      try {
        env.WIKI_ANALYTICS.writeDataPoint({
          blobs: [request.method, new URL(request.url).pathname],
          doubles: [Date.now(), response.status],
          indexes: [request.headers.get('cf-connecting-ip') || 'unknown']
        });
      } catch (error) {
        console.warn('Analytics tracking failed:', error.message);
      }
    }
  }
  
  return newResponse;
}

// Handle OPTIONS requests globally for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}