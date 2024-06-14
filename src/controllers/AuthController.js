// AuthController.js

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../db.js').pool // Importa el pool de conexión si estás utilizando pools

const AuthController = {
    // Registro de usuario
    registrarUsuario: async (req, res, next) => {
        const { numero_trabajador, email, roles, password } = req.body
        try {
            // Verifica si el usuario ya existe en la base de datos
            const [existingUser] = await pool.query(
                'SELECT * FROM user WHERE (email = ? OR numero_trabajador = ?) AND id != ?',
                [email, numero_trabajador, req.params.id]
            )
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' })
            }

            // Hashea la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10)

            // Inserta el usuario en la base de datos
            const result = await pool.query(
                'INSERT INTO user (numero_trabajador, email,roles,password) VALUES (?, ?, ?, ?)',
                [numero_trabajador, email, roles, hashedPassword]
            )

            // Obtiene el ID del usuario creado
            const userId = result[0].insertId

            // Obtiene los detalles del usuario creado
            const [user] = await pool.query(
                'SELECT id, numero_trabajador, email, roles, fecha_registro, ultima_conexion FROM user WHERE id = ?',
                [userId]
            )

            res.status(201).json({
                message: 'Usuario registrado correctamente',
                user: user[0],
            })
        } catch (error) {
            next(error)
        }
    },

    // Inicio de sesión
    iniciarSesion: async (req, res, next) => {
        const { email, password } = req.body

        try {
            // Busca al usuario en la base de datos
            const [user] = await pool.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            )
            if (user.length === 0) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }

            // Compara la contraseña ingresada con la almacenada en la base de datos
            const match = await bcrypt.compare(password, user[0].password)
            if (!match) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }
            // Genera un token JWT
            const token = jwt.sign(
                { userId: user[0].id },
                process.env.JWT_SECRET,
                { expiresIn: '4h' }
            )
            const { roles, numero_trabajador } = user[0]
            //llamar a la base de datos y obtener el nombre de completo del trabajador
            const [trabajador] = await pool.query(
                'SELECT CONCAT(nombre, " ", apellido1) AS nombre_completo FROM trabajador WHERE numero_trabajador = ?',
                [numero_trabajador]
            )

            // Comprueba si last_connection es null o igual a registration_date
            if (
                user[0].ultima_conexion === null ||
                user[0].ultima_conexion === user[0].fecha_registro
            ) {
                return res.status(200).json({
                    token,
                    roles,
                    numero_trabajador,
                    something_required: 'CHANGE_PASSWORD',
                    nombre_completo: trabajador[0].nombre_completo,
                })
            } else {
                return res.status(200).json({
                    token,
                    roles,
                    numero_trabajador,
                    something_required: 'NOT',
                    nombre_completo: trabajador[0].nombre_completo,
                })
            }
        } catch (error) {
            next(error)
        }
    },

    // Middleware para verificar el token JWT
    verificarToken: async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Token no proporcionado', req: req.headers })
        }

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.userId
            next()
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido' })
        }
    },

    obtenerTodos: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(
                'SELECT id,numero_trabajador,email,roles,fecha_registro,ultima_conexion FROM user'
            )
            res.status(200).json(rows)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios' })
        }
    },
    // Método para obtener un usuario por su id
    obtenerPorId: async (req, res) => {
        try {
            const id = req.params.id
            const [rows, fields] = await pool.query(
                'SELECT id,email,roles,numero_trabajador FROM user WHERE id = ?',
                [id]
            )
            res.status(200).json(rows[0])
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario' })
        }
    },
    // Método para actualizar un usuario
    actualizar: async (req, res) => {
        try {
            const { numero_trabajador, email, password, roles } = req.body
            const id = req.params.id
            // Verifica si el usuario ya existe en la base de datos
            const [existingUser] = await pool.query(
                'SELECT * FROM user WHERE (email = ? OR numero_trabajador = ?) AND id != ?',
                [email, numero_trabajador, req.params.id]
            )
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' })
            }
            // COMPROBAR QUE ESTA OPCIÓN FUNCIONA
            if (password) {
                // Si se proporcionó un nuevo password, lo hashea y lo actualiza
                const hashedPassword = await bcrypt.hash(password, 10)
                const [rows, fields] = await pool.query(
                    'UPDATE user SET email = ?, numero_trabajador = ?, roles = ?, password = ? WHERE id = ?',
                    [email, numero_trabajador, roles, hashedPassword, id]
                )
            } else {
                // Si no se proporcionó un nuevo password, simplemente actualiza los otros campos
                const [rows, fields] = await pool.query(
                    'UPDATE user SET email = ?, numero_trabajador = ?, roles = ? WHERE id = ?',
                    [email, numero_trabajador, roles, id]
                )
            }
            // const hashedPassword = await bcrypt.hash(password, 10)
            // const [rows, fields] = await pool.query(
            //     'UPDATE user SET email = ?, roles = ?, password = ? WHERE id = ?',
            //     [email, roles, hashedPassword, id]
            // )
            res.status(200).json({
                message: 'Usuario actualizado correctamente',
                body: { user: { email, roles } },
            })
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario' })
        }
    },
    // Método para eliminar un usuario
    eliminar: async (req, res) => {
        try {
            const id = req.params.id
            const [rows, fields] = await pool.query(
                'DELETE FROM user WHERE id = ?',
                [id]
            )
            res.status(200).json({ message: 'Usuario eliminado correctamente' })
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario' })
        }
    },
    editarPassword: async (req, res) => {
        try {
            const { email, oldPassword, newPassword } = req.body
            // Busca al usuario en la base de datos
            const [user] = await pool.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            )
            if (user.length === 0) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }
            // Compara la contraseña ingresada con la almacenada en la base de datos
            const match = await bcrypt.compare(oldPassword, user[0].password)
            if (!match) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }
            const newHashedPassword = await bcrypt.hash(newPassword, 10)
            const [rows, fields] = await pool.query(
                'UPDATE user SET password = ? WHERE email = ?',
                [newHashedPassword, email]
            )
            res.status(200).json({
                message: 'Contraseña actualizada correctamente',
            })
        } catch {
            res.status(500).json({
                message: 'Error al actualizar la contraseña',
            })
        }
    },
    editarUltimaConexion: async (req, res) => {
        try {
            const { email, password } = req.body
            // Busca al usuario en la base de datos
            const [user] = await pool.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            )
            if (user.length === 0) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }
            // Compara la contraseña ingresada con la almacenada en la base de datos
            const match = await bcrypt.compare(password, user[0].password)
            if (!match) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }
            //TIPO DE FORMATO FECHA TIMESTAMP
            const date = new Date()
            const spainDate = date.toLocaleString('es-ES', {
                timeZone: 'Europe/Madrid',
            })
            const lastConnection = spainDate
                .replace(/\//g, '-')
                .replace(',', '')
            const [rows, fields] = await pool.query(
                'UPDATE user SET ultima_conexion = STR_TO_DATE(?, "%d-%m-%Y %H:%i:%s") WHERE email = ?',
                [lastConnection, email]
            )
            res.status(200).json({
                message: 'Ultima conexión actualizada correctamente',
            })
        } catch {
            res.status(500).json({
                message: 'Error al actualizar la última conexión',
            })
        }
    },
    obtenerRoles: async (req, res) => {
        try {
            const email = req.body.email
            const [rows, fields] = await pool.query(
                'SELECT roles FROM user WHERE email = ?',
                [email]
            )
            res.status(200).json(rows)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los roles' })
        }
    },
}

module.exports = AuthController
