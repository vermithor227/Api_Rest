import "dotenv/config.js";
import express from "express";
import { productosRutas } from "./rutas/productosRutas.js";
import { categoriaRutas } from "./rutas/categoriaRutas.js";


const app = express();

app.use(express.json());

app.use(productosRutas);
app.use(categoriaRutas);

const PORT = process.env.PORT

app.listen(PORT,
    console.log(`Servidor corriendo en puerto ${PORT}`)
);