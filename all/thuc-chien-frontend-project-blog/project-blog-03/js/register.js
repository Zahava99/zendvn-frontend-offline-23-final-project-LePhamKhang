API.callWithToken()
  .get('/auth/me')
  .then(function (response) {
    window.location.href = 'index.html'
  })
///users/register
const elAuthForm = document.getElementById('auth-form')
const elFormMessage = document.getElementById('formMessage')
const elName = document.getElementById('name')
const elEmail = document.getElementById('email')
const elPassword = document.getElementById('password')
const elPhone = document.getElementById('phone')
const elAddress = document.getElementById('address')

elAuthForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(elAuthForm)
  const data = Object.fromEntries(formData)

  //API.call().post('/auth/login', data)
  API.call()
    .post('/users/register', data)
    .then(function (responseRegistor) {
      const dataLogin = { email: data.email, password: data.password }
      API.post('/auth/login', dataLogin)
      .then(function (responseLogin) {
        window.location.href = 'index.html'
      })
      //window.location.href = 'index.html'
    })
    .catch(function (err) {
      const errors = err.response.data.errors
      showFormErrorsMessage(errors, elFormMessage)
    })
})
