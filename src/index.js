const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Controladores
const AuthController = require('./controllers/AuthController.js')
const TrabajadorController = require('./controllers/TrabajadorController.js')
const MaquinaController = require('./controllers/MaquinaController.js')
const ConsumibleController = require('./controllers/ConsumibleController.js')
const GastoEnergeticoController = require('./controllers/GastoEnergeticoController.js')
const GastoGeneralController = require('./controllers/GastoGeneralController.js')
const MateriaPrimaController = require('./controllers/MateriaPrimaController.js')
const TransporteController = require('./controllers/TransporteController.js')
const EmpleadoController = require('./controllers/EmpleadoController.js')
const ParteCortabloquesController = require('./controllers/ParteCortabloquesController.js')

const app = express()

// Middleware para habilitar CORS
app.use(cors())

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json())

// Endpoint para registrar un usuario
app.post('/registro', AuthController.registrarUsuario)

// Endpoint para iniciar sesión
app.post('/login', AuthController.iniciarSesion)

// Middleware para verificar el token JWT en las rutas protegidas
app.use(AuthController.verificarToken)

// Rutas protegidas

app.post('/roles', AuthController.obtenerRoles)
// Endpoints para Trabajadores
app.get('/trabajadores', TrabajadorController.obtenerTodos)
app.post('/trabajadores', TrabajadorController.crear)
app.get('/trabajadores/:id', TrabajadorController.obtenerPorId)
app.put('/trabajadores/:id', TrabajadorController.actualizar)
app.delete('/trabajadores/:id', TrabajadorController.eliminar)

// Endpoints para Trabajadores
app.get('/empleados', EmpleadoController.obtenerTodos)
app.post('/empleados', EmpleadoController.crear)
app.get('/empleados/:id', EmpleadoController.obtenerPorId)
app.put('/empleados/:id', EmpleadoController.actualizar)
app.delete('/empleados/:id', EmpleadoController.desactivar)

// Endpoints para Máquinas
app.get('/maquinas', MaquinaController.obtenerTodas)
app.post('/maquinas', MaquinaController.crear)
app.get('/maquinas/:id', MaquinaController.obtenerPorId)
app.put('/maquinas/:id', MaquinaController.actualizar)
app.delete('/maquinas/:id', MaquinaController.eliminar)

// Endpoints para Consumibles
app.get('/consumibles', ConsumibleController.obtenerTodos)
app.post('/consumibles', ConsumibleController.crear)
app.get('/consumibles/:id', ConsumibleController.obtenerPorId)
app.put('/consumibles/:id', ConsumibleController.actualizar)
app.delete('/consumibles/:id', ConsumibleController.eliminar)

// Endpoints para Gastos Energeticos
app.get('/gastos-energeticos', GastoEnergeticoController.obtenerTodos)
app.post('/gastos-energeticos', GastoEnergeticoController.crear)
app.get('/gastos-energeticos/:id', GastoEnergeticoController.obtenerPorId)
app.put('/gastos-energeticos/:id', GastoEnergeticoController.actualizar)
app.delete('/gastos-energeticos/:id', GastoEnergeticoController.eliminar)

// Endpoints para Gastos Generales
app.get('/gastos-generales', GastoGeneralController.obtenerTodos)
app.post('/gastos-generales', GastoGeneralController.crear)
app.get('/gastos-generales/:id', GastoGeneralController.obtenerPorId)
app.put('/gastos-generales/:id', GastoGeneralController.actualizar)
app.delete('/gastos-generales/:id', GastoGeneralController.eliminar)

// Endpoints para Materias Primas
app.get('/materias-primas', MateriaPrimaController.obtenerTodas)
app.post('/materias-primas', MateriaPrimaController.crear)
app.get('/materias-primas/:id', MateriaPrimaController.obtenerPorId)
app.put('/materias-primas/:id', MateriaPrimaController.actualizar)
app.delete('/materias-primas/:id', MateriaPrimaController.eliminar)

// Endpoints para Transportes
app.get('/transportes', TransporteController.obtenerTodos)
app.post('/transportes', TransporteController.crear)
app.get('/transportes/:id', TransporteController.obtenerPorId)
app.put('/transportes/:id', TransporteController.actualizar)
app.delete('/transportes/:id', TransporteController.eliminar)

//Endpoints para Usuarios
app.get('/usuarios', AuthController.obtenerTodos)
app.get('/usuarios/:id', AuthController.obtenerPorId)
app.put('/usuarios/:id', AuthController.actualizar)
app.delete('/usuarios/:id', AuthController.eliminar)
app.post('/usuarios/editar/password', AuthController.editarPassword)
app.post('/usuarios/editar/ultimaconexion', AuthController.editarUltimaConexion)

//Endpoints para partes de cortabloques
app.get('/partes/cortabloques', ParteCortabloquesController.obtenerTodos)
app.post('/partes/cortabloques', ParteCortabloquesController.crear)
app.get('/partes/cortabloques/:id', ParteCortabloquesController.obtenerPorId)
app.put('/partes/cortabloques/:id', ParteCortabloquesController.actualizar)
app.delete('/partes/cortabloques/:id', ParteCortabloquesController.eliminar)

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message,
    })
})

const puerto = process.env.PORT || 3000
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})

module.exports = app
