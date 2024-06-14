const pool = require('../db.js').pool

const TransporteController = {
    // Obtener todos los transportes de materias primas
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM transporte')
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo transporte de materia prima
    crear: async (req, res, next) => {
        const { nombre, cantidad, precio } = req.body
        try {
            await pool.query(
                'INSERT INTO transporte (nombre, cantidad, precio) VALUES (?, ?, ?)',
                [nombre, cantidad, precio]
            )
            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')
            res.status(201).json({
                message: 'Transporte de materia prima creado correctamente',
                id: rows[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un transporte de materia prima por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM transporte WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res.status(404).json({
                    message: 'Transporte de materia prima no encontrado',
                })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un transporte de materia prima
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, cantidad, precio } = req.body
        try {
            await pool.query(
                'UPDATE transporte SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?',
                [nombre, cantidad, precio, id]
            )
            res.status(200).json({
                message:
                    'Transporte de materia prima actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un transporte de materia prima
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM transporte WHERE id = ?', [id])
            res.status(200).json({
                message: 'Transporte de materia prima eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

module.exports = TransporteController
