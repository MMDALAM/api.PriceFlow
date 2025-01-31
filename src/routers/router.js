const router = require("express").Router();

const homeRouter = require("./home/home");
router.use("/", homeRouter);

// const { authRouter } = require("./auth");
// router.use("/auth", authRouter);

module.exports = { AllRouters: router };
