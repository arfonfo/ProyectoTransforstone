const pool = require('../db.js').pool

const ConsumibleController = {
    // Obtener todos los consumibles
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM consumible')
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo consumible
    crear: async (req, res, next) => {
        const { nombre, precio, id_maquina } = req.body
        try {
            await pool.query(
                'INSERT INTO consumible (nombre, precio, id_maquina) VALUES (?, ?, ?)',
                [nombre, precio, id_maquina]
            )

            // Obtener el ID del último consumible insertado
            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')

            res.status(201).json({
                message: 'Consumible creado correctamente',
                id: rows[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un consumible por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM consumible WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Consumible no encontrado' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un consumible
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, precio, id_maquina } = req.body
        try {
            await pool.query(
                'UPDATE consumible SET nombre = ?, precio = ?, id_maquina = ? WHERE id = ?',
                [nombre, precio, id_maquina, id]
            )
            res.status(200).json({
                message: 'Consumible actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un consumible
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM consumible WHERE id = ?', [id])
            res.status(200).json({
                message: 'Consumible eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

module.exports = ConsumibleController
