const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;

    this.middlewares();
  }

  middlewares() {
    this.app.use(express.static("public"));
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online port:", this.port);
    });
  }
}

module.exports = Server;
