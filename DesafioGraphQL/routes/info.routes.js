const express = require("express");
const { Router } = express;
const getInfo = require("../controllers/info.controllers");
const routes = Router();
/* ----- config routes ----- */
routes.get('/', getInfo)

module.exports = routes;