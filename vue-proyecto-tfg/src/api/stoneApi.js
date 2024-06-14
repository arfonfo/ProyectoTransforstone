import axios from 'axios'

const authApi = axios.create({
  //baseURL: 'https://g8hlqxnq-3000.uks1.devtunnels.ms/'
  baseURL: 'http://localhost:3000'
})

// Agrega un interceptor de solicitud para incluir el token JWT en los encabezados de autorización
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('idToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default authApi
