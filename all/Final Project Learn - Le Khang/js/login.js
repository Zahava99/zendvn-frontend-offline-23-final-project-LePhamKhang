const elFormMessages = document.getElementById('form-messages')
const elContactForm = document.getElementById('contact-form')
const elEmail = document.getElementById('email')
const elPassword = document.getElementById('password')

elContactForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(elContactForm)
  const data = Object.fromEntries(formData)
  API.post('/auth/login', data)
    .then(function (response) {
      const accessToken = response.data.access_token
      localStorage.setItem('ACCESS_TOKEN', accessToken)
      window.location.href = 'index.html'
    })
    .catch(function (error) {
      elFormMessages.innerHTML = `<div class="alert alert-primary" role="alert">
        Thông tin đăng nhập không đúng, vui lòng nhập lại </div>`
      elEmail.value = ''
      elPassword.value = ''
    })
})
