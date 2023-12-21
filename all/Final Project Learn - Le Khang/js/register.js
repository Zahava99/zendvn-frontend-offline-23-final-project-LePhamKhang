const elFormMessages = document.getElementById('form-messages')
const elContactForm = document.getElementById('contact-form')
const elName = document.getElementById('name')
const elEmail = document.getElementById('email')
const elPassword = document.getElementById('password')
const elPhone = document.getElementById('phone')
const elAddress = document.getElementById('address')
elContactForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(elContactForm)
  const data = Object.fromEntries(formData)

  API.post('/users/register', data)
    .then(function (response) {
        console.log(response)
      const dataLogin = { email: data.email, password: data.password }
      API.post('/auth/login', dataLogin).
      then(function (responseLogin) {
        window.location.href = 'index.html'
      })
    })
    .catch(function (err) {
      const errors = err.response.data.errors
      console.log('Error',errors)
      showFormErrorsMessage(errors,elFormMessages)
      elPassword.value = ''
    })
})
