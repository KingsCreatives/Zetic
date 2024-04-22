const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, homeController.getLogin);

// @desc    Homepage after successful login
// @route   GET /index
router.get("/index", ensureAuth, homeController.getHome);
module.exports = router;
