const pool = require('../db.js').pool
const EmpleadoController = {
    // Obtener todos los trabajadores activos
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM trabajador')
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },
    // Crear un nuevo trabajador
    crear: async (req, res, next) => {
        const { numero_trabajador, nombre, apellido1, apellido2 } = req.body
        try {
            await pool.query(
                'INSERT INTO trabajador (numero_trabajador, nombre, apellido1, apellido2) VALUES (?, ?, ?, ?)',
                [numero_trabajador, nombre, apellido1, apellido2]
            )
            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')
            res.status(201).json({
                message: 'Trabajador creado correctamente',
                id: rows[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un trabajador por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM trabajador WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Empleado no encontrado' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un trabajador
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { numero_trabajador, nombre, apellido1, apellido2, active } = req.body
        try {
            await pool.query(
                'UPDATE trabajador SET numero_trabajador = ?, nombre = ?, apellido1 = ?, apellido2 = ?, activo = ? WHERE id = ?',
                [numero_trabajador, nombre, apellido1, apellido2, active, id]
            )
            res.status(200).json({
                message: 'Empleado actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Desactivar un trabajador
    desactivar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query(
                'UPDATE trabajador SET activo = 0 WHERE numero_trabajador = ?',
                [id]
            )
            res.status(200).json({
                message: 'Empleado desactivado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un trabajador
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query(
                'DELETE FROM trabajador WHERE numero_trabajador = ?',
                [id]
            )
            res.status(200).json({
                message: 'Empleado eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

module.exports = EmpleadoController
