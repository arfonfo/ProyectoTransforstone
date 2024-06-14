// export const myAction = ( state ) => {

// }
export const loginUser = (
  state,
  { email, idToken, roles, someThingRequired, employeeNumber, employeeName }
) => {
  if (idToken) {
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('email', email)
    localStorage.setItem('roles', roles)
    localStorage.setItem('employeeNumber', employeeNumber)
    localStorage.setItem('employeeName', employeeName)
    // Obtiene el token del almacenamiento local después de guardarlo
    state.idToken = localStorage.getItem('idToken')
    state.email = localStorage.getItem('email')
    state.roles = localStorage.getItem('roles')
    state.employeeNumber = localStorage.getItem('employeeNumber')
    state.employeeName = localStorage.getItem('employeeName')
    state.someThingRequired = someThingRequired
  }
}

// En vue-proyecto-tfg/src/modules/Auth/store/mutations.js
export const logoutUser = (state) => {
  // Borra el token del almacenamiento local
  localStorage.removeItem('idToken')
  localStorage.removeItem('email')
  localStorage.removeItem('roles')
  localStorage.removeItem('employeeNumber')
  localStorage.removeItem('employeeName')

  state.idToken = null
  state.email = null
  state.roles = null
  state.employeeNumber = null
  state.employeeName = null
  state.someThingRequired = null
}

export const setRoles = (state, roles) => {
  state.roles = roles
}
