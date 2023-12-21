API.callWithToken().get('/auth/me').then(function (response) {
  window.location.href = 'index.html'
})
const elAuthForm = document.getElementById('auth-form')
const elFormMessage = document.getElementById('formMessage')
const elEmail = document.getElementById('email')
const elPassword = document.getElementById('password')

elAuthForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(elAuthForm)
  const data = Object.fromEntries(formData);
API.call().post('/auth/login', data)
  .then(function (response) {
    console.log('af',response)
    const accessTokens = response.data.access_token
    localStorage.setItem(ACCESS_TOKEN,accessTokens)
    window.location.href = 'index.html'
  })
  .catch(function (error) {
    elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Thông tin đăng nhập không đúng, vui lòng thử lại</div>`
    elEmail.value = ''
    elPassword.value = ''
  })
})
