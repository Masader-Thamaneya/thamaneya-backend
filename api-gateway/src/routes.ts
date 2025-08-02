const ROUTES = [
  {
    url: "/api/test",
    auth: false,
    proxy: {
      target: "http://user-service:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/": "test",
      },
    },
  },
  {
    url: "/api/auth",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://user-service:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/": "auth/",
      },
    },
  },
  {
    url: "/api/companies",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://user-service:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/": "companies/",
      },
    },
  },
  {
    url: "/api/cfp",
    auth: true,
    proxy: {
      target: "http://cfp-service:3002",
      changeOrigin: true,
      pathRewrite: {
        "^/": "cfp/",
      },
    },
  },
];

export default ROUTES;
