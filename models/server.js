const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.appointmentPath = "/api/appointments";
    this.authPath = "/api/auth";

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
    this.app.use(this.appointmentPath, require("../routes/appointment"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online port:", this.port);
    });
  }
}

module.exports = Server;
