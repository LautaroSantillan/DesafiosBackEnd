const express = require("express");
const { Router } = express;
const getLogout = require("../controllers/logout.controllers.js");
const router = Router();
/* ------------- LOGOUT ------------- */
router.get('/', getLogout)

module.exports = router;