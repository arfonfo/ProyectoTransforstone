const pool = require('../db.js').pool
const GastoGeneralController = {
    // Obtener todos los gastos generales
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM gasto_general'
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo gasto general
    crear: async (req, res, next) => {
        const { nombre, precio } = req.body
        try {
            await pool.query(
                'INSERT INTO gasto_general (nombre, precio) VALUES (?, ?)',
                [nombre, precio]
            )

            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')

            res.status(201).json({
                message: 'Gasto general creado correctamente',
                id: rows[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un gasto general por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM gasto_general WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Gasto general no encontrado' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un gasto general
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, precio } = req.body
        try {
            await pool.query(
                'UPDATE gasto_general SET nombre = ?, precio = ? WHERE id = ?',
                [nombre, precio, id]
            )
            res.status(200).json({
                message: 'Gasto general actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un gasto general
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM gasto_general WHERE id = ?', [id])
            res.status(200).json({
                message: 'Gasto general eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

module.exports = GastoGeneralController
