export default () => ({
  idToken: localStorage.getItem('idToken') || null,
  email: null,
  roles: null,
  employeeNumber: null,
  employeeName: null,
  someThingRequired: 'NOT'
})
