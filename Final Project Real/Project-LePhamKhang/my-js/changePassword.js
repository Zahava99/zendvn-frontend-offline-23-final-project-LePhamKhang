//KhangTest@gmail.com
//123456789
//New Pass: 12345678
/*API.get('/auth/me')
  .then((res) => {
  })
  .catch((err) => {
    window.location.href = 'index.html';
  });*/
const elContactForm = document.getElementById('contact-form')
const elPasswordCurrent = document.getElementById('currentPassword');
const elPassword = document.getElementById('newPassword');
const elPasswordConfirmation = document.getElementById('confirmPassword');
const elFormMessage = document.getElementById('formMessage');

elContactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('click')
  const formData = new FormData(elContactForm);
  const data = Object.fromEntries(formData);
  API.callWithToken().put('/auth/change-password',data)
.then((response) => {
    elPasswordCurrent.value = '';
    elPassword.value = '';
    elPasswordConfirmation.value = '';

    elFormMessage.innerHTML = /* html */ `
    <div class="alert alert-success" role="alert">
      Thay đổi mật khẩu thành công
    </div>`;
  })
  .catch((err) => {
    const errors = err.response.data.errors;
    console.log('âfaf',errors)
    let errString = '';
    for (const property in errors) {
      errString += /* html */ `<li>${errors[property]}</li>`;
    }
    console.log('affffff',errString)
    console.log('à',elFormMessage.innerHTML)
    elFormMessage.innerHTML = `
    <div class="alert alert-danger" role="alert">
    <ul>${errString}</ul>
  </div>`
  });
});