/* --------------- Módulos ------------------ */
import express from "express";
import { products_router } from "./routes/products.routes.js";
import { carts_router } from "./routes/carts.routes.js";

/* ------------------- Instancia Server -------------------*/
const app = express();

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use("/api/products", products_router);
app.use("/api/carts", carts_router);

/* ---------------------- Rutas ----------------------*/
app.all("*", (req, res) => {
	res.json({ error: "404 Not Found", method: req.method });
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8888;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
