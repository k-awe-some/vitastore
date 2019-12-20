const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    proxy("/api", {
      target: "https://vitastore-server.herokuapp.com",
      logLevel: "debug",
      changeOrigin: true
    })
  );
};
