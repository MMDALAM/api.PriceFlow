const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const { PORT } = process.env;
const { DATABASE } = process.env;
const createError = require("http-errors");
const { AllRouters } = require("./routers/router");
const cors = require("cors");

module.exports = class Application {
  constructor() {
    this.configServer();
    this.setupExpress();
    this.setMongoConnection();
    this.setRouters();
    this.errorHandler();
  }

  configServer() {
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  }

  setupExpress() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
  }

  setMongoConnection() {
    mongoose.connect(DATABASE);
    mongoose.set("strictPopulate", true);
    mongoose.set("strictQuery", true);
    mongoose.connection.on("connected", () =>
      console.log(`connect to mongodb `)
    );
    mongoose.connection.on("desconnected", () =>
      console.log(`desconnect to mongodb `)
    );
  }

  setRouters() {
    app.use(AllRouters);
  }

  errorHandler() {
    app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر پیدا نشد"));
    });
    app.use((error, req, res, next) => {
      const message = error.message || "";
      const status = error.status || 404;
      return res.status(status).json({ errors: message });
    });
  }
};
