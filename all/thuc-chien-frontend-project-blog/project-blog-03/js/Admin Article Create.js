//Access Key : Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw
//Secret key : I5D8Y7FrodoYZdKw6KvB_8ghxaEDbxTk_Tsb_Qj9Njs
// link : https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw

//https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw&orientation=landscape
const elAuthForm = document.getElementById('auth-form')
const elFormMessage = document.getElementById('formMessage')
const elThumb = document.getElementById('thumb')
const elThumPreview = document.getElementById('ThumPreview')
const elRandomPhoto = document.getElementById('btnRandomPhoto')
/*elThumb.addEventListener('change', function () {
  if (elThumb.value) {
    elThumPreview.src = elThumb.value
  }
})*/
elRandomPhoto.addEventListener('click',function(){
    console.log('click')
    API.call().get(`https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw&orientation=landscape`)
    .then(response =>{
        const urlThumb = response.data.urls.regular
        elThumb.value = urlThumb
        elThumPreview.src = elThumb.value
    })
})

elAuthForm.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('click')
  const formData = new FormData(elAuthForm)
  const data = Object.fromEntries(formData)
  console.log('avb', data)
  API.callWithToken()
    .post('/articles/create', data)
    .then(res => {
      elFormMessage.innerHTML = ''
      elAuthForm.reset()
      elThumPreview.src = './assets/img/placeholderimg.jpg'
      Toastify({
        text: "Tạo bài viết thành công",
        duration: 2000,
        close: true
        }).showToast();
    })
    .catch(err => {
      const errors = err.response.data.errors
      showFormErrorsMessage(errors, elFormMessage)
    })
})
