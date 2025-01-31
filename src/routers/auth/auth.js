const experss = require("express");
const router = experss.Router();

//controllers
const authController = require("app/http/controllers/authController");

//home Rouer
router.get("/", authController.index);

module.exports = router;
