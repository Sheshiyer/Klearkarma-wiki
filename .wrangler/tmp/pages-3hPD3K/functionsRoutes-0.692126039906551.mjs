import { onRequestOptions as ___middleware_js_onRequestOptions } from "/Users/sheshnarayaniyer/2025/Klearkarma/functions/_middleware.js"
import { onRequest as ___middleware_js_onRequest } from "/Users/sheshnarayaniyer/2025/Klearkarma/functions/_middleware.js"

export const routes = [
    {
      routePath: "/",
      mountPath: "/",
      method: "OPTIONS",
      middlewares: [___middleware_js_onRequestOptions],
      modules: [],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]