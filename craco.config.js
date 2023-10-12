const cracoAlias = require("craco-alias");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        baseUrl: "./src",
        source: "jsconfig",
      },
    },
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
};
