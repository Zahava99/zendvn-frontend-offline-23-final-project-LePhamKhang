API.callWithToken()
  .get('/auth/me')
  .then(response => {
    //
  })
  .catch(err => {
    window.location.href = 'index.html'
  })
let editor
ClassicEditor.create(document.querySelector('#content'))
  .then(newEditor => {
    editor = newEditor
  })
  .catch(error => {
    console.error(error)
  })

//articles/3312
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = parseInt(urlParams.get('id'))

const elContactForm = document.getElementById('contactForm')
const elFormMessage = document.getElementById('formMessage')
const elThumb = document.getElementById('thumb')
const elThumbPreview = document.getElementById('ThumbPreview')
const elRandomPhoto = document.getElementById('btnRandomPhoto')
const elCategoryId = document.getElementById('category_id')
const elDescription = document.getElementById('description')
const elTitle = document.getElementById('title')
const elContent = document.getElementById('content')

console.log('adf', id)
API.call()
  .get(`/articles/${id}`)
  .then(response => {
    console.log('adf', response)
    const articles = response.data.data
    console.log('123', articles)
    elThumb.value = articles.thumb
    elThumbPreview.src = articles.thumb
    elCategoryId.value = articles.category_id
    elDescription.value = articles.description
    elTitle.value = articles.title
    elContent.value = articles.content
    editor.setData( articles.content );
  })
  .catch(function (error) {
    window.location.href = 'index.html';
  });

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
      .put(`/articles/${id}`, data)
      .then(res => {
        window.location.href = 'Admin Article Management.html'
      })
      .catch(err => {
        const errors = err.response.data.errors
        showFormErrorsMessage(errors, elFormMessage)
      })
})
