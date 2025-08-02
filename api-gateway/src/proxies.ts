import { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const setupProxies = (app: Express, routes: any[]) => {
  routes.forEach((r: any) => {
    console.log(`🔁 Setting up proxy for ${r.url} → ${r.proxy.target}`);
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};

export default setupProxies;
