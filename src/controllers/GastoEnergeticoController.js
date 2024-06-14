const pool = require('../db.js').pool

const GastoEnergeticoController = {
    // Obtener todos los gastos energéticos
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM gasto_energetico'
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo gasto energetico
    crear: async (req, res, next) => {
        const { nombre, coste_energia, id_maquina } = req.body
        try {
            await pool.query(
                'INSERT INTO gasto_energetico (nombre, coste_energia, id_maquina) VALUES (?, ?, ?)',
                [nombre, coste_energia, id_maquina]
            )

            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')

            res.status(201).json({
                message: 'Gasto energético creado correctamente',
                id: rows[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un gasto energetico por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM gasto_energetico WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Gasto energético no encontrado' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un gasto energetico
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, coste_energia, id_maquina } = req.body
        try {
            await pool.query(
                'UPDATE gasto_energetico SET nombre = ?, coste_energia = ?, id_maquina = ? WHERE id = ?',
                [nombre, coste_energia, id_maquina, id]
            )
            res.status(200).json({
                message: 'Gasto energético actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un gasto energetico
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM gasto_energetico WHERE id = ?', [id])
            res.status(200).json({
                message: 'Gasto energético eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

module.exports = GastoEnergeticoController
