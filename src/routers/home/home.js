const experss = require("express");
const router = experss.Router();

//controllers

const homeController = require("../../controllers/home.controller");

//homeRouer
router.get("/", homeController.home);

module.exports = router;
