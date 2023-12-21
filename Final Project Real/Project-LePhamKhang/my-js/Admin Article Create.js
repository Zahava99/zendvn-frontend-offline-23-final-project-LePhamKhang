//Access Key : Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw
//Secret key : I5D8Y7FrodoYZdKw6KvB_8ghxaEDbxTk_Tsb_Qj9Njs
// link : https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw

//https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw&orientation=landscape

ClassicEditor.create(document.querySelector('#content'), {
}).catch(error => {
  console.error(error)
})

const elContactForm = document.getElementById('contactForm')
const elFormMessage = document.getElementById('formMessage')
const elThumb = document.getElementById('thumb')
const elThumbPreview = document.getElementById('ThumbPreview')
const elRandomPhoto = document.getElementById('btnRandomPhoto')
elRandomPhoto.addEventListener('click', function () {
  console.log('click')
  API.call()
    .get(
      `https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw&orientation=landscape`
    )
    .then(response => {
      const urlThumb = response.data.urls.regular
      elThumb.value = urlThumb
      elThumbPreview.src = elThumb.value
    })
})

elContactForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(elContactForm)
  const data = Object.fromEntries(formData)
  console.log('avb', data)
  API.callWithToken()
    .post('/articles/create', data)
    .then(res => {
      console.log(res)
      elFormMessage.innerHTML = ''
      elContactForm.reset()
      elThumbPreview.src = './assets/img/placeholderimg.jpg'
      Toast('Tạo bài viết thành công')
    })
    .catch(err => {
      const errors = err.response.data.errors
      showFormErrorsMessage(errors, elFormMessage)
    })
})
