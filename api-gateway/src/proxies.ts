import { Express } from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxies = (app: Express, routes: any[]) => {
  routes.forEach((r: any) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};

exports.setupProxies = setupProxies;
