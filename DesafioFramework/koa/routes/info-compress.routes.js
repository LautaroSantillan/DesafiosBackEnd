const compression = require("compression");
const express = require("express");
const { Router } = express;
const getInfoCompress = require("../controllers/info-compress.controllers");
const routes = Router();
/* ----- config routes ----- */
routes.get('/', compression() , getInfoCompress )

module.exports = routes;