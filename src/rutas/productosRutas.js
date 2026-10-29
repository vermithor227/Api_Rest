import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos, obtnerProductoPorId } from "../Controllers/ProductosControladores.js";

const rutas = Router();
rutas.get("/producto", obtenerProductos);
rutas.get("/producto/:id", obtnerProductoPorId);
rutas.post("/producto", crearProducto);
rutas.put("/producto/:id", actualizarProducto);
rutas.delete("/producto/:id", eliminarProducto);
export const productosRutas = rutas;