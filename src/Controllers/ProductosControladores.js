import { pool } from "../config/database.js";

export const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM producto");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener todos los productos."});
    }
};

export const obtnerProductoPorId = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM producto WHERE id_producto = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado. "});
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const { nombre, id_categoria, precio, stock } = req.body;
        const [result] = await pool.query("INSERT INTO producto (nombre, id_categoria, precio, stock) VALUE (?, ?, ?, ?)", 
            [nombre, id_categoria, precio, stock]
        );
        res.status(201).json({ id_producto: result.insertId, nombre, id_categoria, precio, stock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const { nombre, id_categoria, precio, stock } = req.body;
        const [result] = await pool.query("UPDATE producto SET nombre = ?, id_categoria = ?, precio = ?, stock = ? WHERE id_producto = ?",
            [nombre, id_categoria, precio, stock, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado."});
        }
        res.json({ mensaje: "Producto actualizado."});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM producto WHERE id_producto = ?",
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado." });
        }
        res.json({ mensaje: "Producto eliminado. "});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};