require("dotenv").config();
const httpProxy = require("express-http-proxy");
const express = require("express");

const app = express();

const proxy = (host, root) =>
  httpProxy(host, {
    proxyReqPathResolver: req => `${root}${req.url}`
  });

app.use("/api/vehicle", proxy(process.env.API_HOST, "/vehicle"));
app.use("/api/auth", proxy(process.env.AUTH_HOST, "/auth"));
app.use("/", httpProxy(process.env.APP_HOST));

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Proxy running at ${process.env.HOST}:${process.env.PORT}`)
);
