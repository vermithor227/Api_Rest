import { Router  } from "express";
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, obtenerCategorias,} from "../Controllers/CategoriaControladores.js"

const rutas = Router();
rutas.get("/categoria", obtenerCategorias);
rutas.get("/categoria/:id", obtenerCategoriaPorId);
rutas.post("/categoria", crearCategoria);
rutas.put("/categoria/:id", actualizarCategoria);
rutas.delete("/categoria/:id", eliminarCategoria);
export const categoriaRutas = rutas;