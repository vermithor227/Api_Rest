import { pool } from "../config/database.js";

export const obtenerCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM categoria");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerCategoriaPorId = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM categoria WHERE id_categoria = ?", 
            [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Categoría no encontrada." });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const [result] = await pool.query("INSERT INTO categoria (nombre) VALUES (?)", 
            [nombre]);
        res.status(201).json({ id_categoria: result.insertId, nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const [result] = await pool.query("UPDATE categoria SET nombre = ? WHERE id_categoria = ?", 
            [nombre, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Categoría no encontrada." });
        }
        res.json({ mensaje: "Categoría actualizada." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM categoria WHERE id_categoria = ?", 
            [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Categoría no encontrada." });
        }
        res.json({ mensaje: "Categoría eliminada." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};