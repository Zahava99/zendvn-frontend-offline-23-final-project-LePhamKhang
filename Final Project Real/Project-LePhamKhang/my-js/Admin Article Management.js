//KhangTest@gmail.com
//12345678
const elMyArticles = document.getElementById('MyArticles')
//
API.callWithToken()
  .get('/auth/me')
  .then(response => {
    //
  })
  .catch(err => {
    window.location.href = 'index.html'
  })
//Choose List
API.callWithToken()
  .get('/articles/my-articles')
  .then(response => {
    const myArticles = response.data.data
    console.log('REA', myArticles)
    let html = ''
    myArticles.forEach(myArticle => {
      const id = myArticle.id
      const CateID = myArticle.category.id
      const Checked = myArticle.status === '1' ? 'checked' : ''
      //console.log('IDmyArticle =', id)
      //console.log('CateID =', CateID)
      html += /*html*/ `
        <tr>
        <th scope="row">${id}</th>
        <td class="ThumbImg">
          <img
            src="${myArticle.thumb}"
            alt="${myArticle.title}"
            class="w-auto"
            alt=""
            id="ThumbPreview"
          />
        </td>
        <td>
          <div class="input-group mb-3 text-truncate text-wrap text-break" >
          ${myArticle.title}
            <!--<input
              type="text"
              class="form-control"
              placeholder="${myArticle.title}"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />-->
          </div>
        </td>
        <td class="myWidth">
        ${DisplayChoiceCategory(myArticle.category.id, id)}
        </td>
        <td>
        <input 
        type="checkbox" 
        class="form-check-input StatusChecked" 
        value=""
        id="flexCheckDefault"
        ${Checked}
        data-id="${id}">
      </td>
        <td class="d-flex align-items-center"> 
          <a class="btn btn-info w-100 me-2 fs-1" href="post-details.html?id=${
            myArticle.id
          }">View</a>
          <a class="btn btn-secondary w-100 me-2 fs-1" href="Admin Update Article.html?id=${id}">Edit</a>
          <button class="btn btn-danger fs-1 DeleteButton" data-id="${id}">Delete</button>
          
        </td>
      </tr>`
    })
    elMyArticles.innerHTML = html
  })
elMyArticles.addEventListener('click', function (e) {
  const el = e.target
  if (el.classList.contains('DeleteButton')) {
    const articlesID = el.dataset.id
    API.callWithToken()
      .delete(`/articles/${articlesID}`)
      .then(response => {
        Toast('Đã xóa thành công')
        el.parentElement.parentElement.remove()
      })
  }
})
elMyArticles.addEventListener('change', function (e) {
  const el = e.target
  if (el.classList.contains('category')) {
    const categoryID = el.value
    const articlesID = el.dataset.id
    API.callWithToken()
      .patch(`/articles/${articlesID}`, { category_id: categoryID })
      .then(response => {
        Toast('Tạo bài viết thành công')
      })
  }
  if (el.classList.contains('StatusChecked')) {
    const status = el.checked ? 1 : 0
    const articlesID = el.dataset.id
    API.callWithToken()
      .patch(`/articles/${articlesID}`, { status })
      .then(response => {
        Toast('Đã thay đổi trạng thái bài viết')
      })
  }
})
function DisplayChoiceCategory (ID, Articles) {
  const ManageCategory = [
    { id: 1, name: 'Thế Giới' },
    { id: 2, name: 'Thời Sự' },
    { id: 3, name: 'Kinh Doanh' },
    { id: 5, name: 'Giải trí' },
    { id: 6, name: 'Thể thao' },
    { id: 7, name: 'Pháp luật' },
    { id: 8, name: 'Giáo Dục' },
    { id: 9, name: 'Sức khỏe' },
    { id: 10, name: 'Đời sống' },
    { id: 11, name: 'Du lịch' },
    { id: 12, name: 'Khoa Học' },
    { id: 13, name: 'Số Hóa' },
    { id: 14, name: 'Xe' }
  ]
  let htmlManageCategory = ''
  ManageCategory.forEach(ManaCata => {
    const Select = ManaCata.id === ID ? 'selected' : ''
    htmlManageCategory += /*html*/ `
    <option value="${ManaCata.id}"${Select}>${ManaCata.name}</option>`
  })
  return /*html*/ `
    <select class="form-select my-form-select category " data-id="${Articles}" >${htmlManageCategory}</select>`
}
