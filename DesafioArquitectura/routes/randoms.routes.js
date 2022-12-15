const express = require("express");
const { Router } = express;
const { getRandomsCant, getRandoms } = require("../controllers/random.controllers");
const routes = Router();

/* ---------  API RANDOMS  ------------ */
routes.get('/:cant', getRandomsCant)
routes.get('/', getRandoms )

module.exports = routes;