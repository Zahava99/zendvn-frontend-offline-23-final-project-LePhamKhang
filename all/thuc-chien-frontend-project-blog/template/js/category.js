const elArticles = document.getElementById('articles')
const elCategoryTitle = document.getElementById('category-title')
const elBtnLoadMore = document.getElementById('btnLoadMore')
const elMyPagination = document.getElementById('myPagination')
//
const queryString = window.location.search
//console.log(queryString);
const urlParams = new URLSearchParams(queryString)
const id = parseInt(urlParams.get('id'))
console.log('Test3',id)
//let currentPage = 1
// để đồng bộ url với trang thì dùng
let currentPage = parseInt(urlParams.get('page'))
if (isNaN(currentPage)) currentPage = 1;
//console.log(id);


getArticles(currentPage)

/*elBtnLoadMore.addEventListener('click', function () {
  currentPage++
  console.log('MYUYUYUYUY',currentPage)
  getArticles(currentPage)
  console.log('ALOOO',currentPage)
})*/

// categories_news/1/articles?limit=10&page=1
function getArticles (page = 1) {
  API.get(`categories_news/${id}/articles?limit=5&page=${page}`).then(
    response => {
      const articles = response.data.data
      //console.log('Test1',articles)
      const totalPage = response.data.meta.last_page
      console.log('Test6', totalPage)
      let CategoryName = ''
      let html = ''
      articles.forEach(item => {
        const publishDate = dayjs(item.publish_date).fromNow()
        CategoryName = item.category.name
        html += /* Html */ `
              <div class="d-md-flex post-entry-2 half">
                      <a href="single-post.html" class="me-4 thumbnail">
                        <img src="${item.thumb}" alt="${item.title}" class="img-fluid">
                      </a>
                      <div>
                        <div class="post-meta">
                        <span>${publishDate}</span>
                        </div>
                        <h3>
                        <a href="single-post.html">${item.title}</a>
                        </h3>
                        <p>${item.description}</p>
                        <div class="d-flex align-items-center author">
                          <div class="photo">
                          <img src="assets/img/person-2.jpg" alt="" class="img-fluid">
                          </div>
                          <div class="name">
                            <h3 class="m-0 p-0">${item.author}</h3>
                          </div>
                        </div>
                      </div>
                    </div>`
      })
      elCategoryTitle.innerText = `Category: ${CategoryName}`
      elArticles.innerHTML = html
      renderPagination(totalPage)
    })
    .catch(function (error) {
      window.location.href = 'index.html';
    });
}
// Event Delegate
elMyPagination.addEventListener('click', function (e) {
  const el = e.target
  //console.log(e.target)
  if (el.classList.contains('page-item')) {
    currentPage = parseInt(el.innerText)
    getArticles(currentPage)
    addOrUpdateUrlParameter('page', currentPage);
  }

  if (el.classList.contains('page-item-prev')) {
    currentPage--
    getArticles(currentPage)
    addOrUpdateUrlParameter('page', currentPage);
  }

  if (el.classList.contains('page-item-next')) {
    currentPage++
    getArticles(currentPage)
    addOrUpdateUrlParameter('page', currentPage);
  }
})
function addOrUpdateUrlParameter(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(key, value);
  const newUrl = window.location.pathname + '?' + urlParams.toString();
  history.pushState(null, '', newUrl);
}
function renderPagination (total) {
  const disabledPrevious = currentPage === 1 ? 'pointer-events-none' : ''
  let html = `<a href="#" class="page-item-prev ${disabledPrevious}">Previous</a>`
  for (let index = 1; index <= total; index++) {
    const active = index === currentPage ? 'active pointer-events-none' : ''
    html += `<a href="#" class="page-item ${active}">${index}</a>`
  }
  const disabledNext = currentPage === total ? 'pointer-events-none' : ''
  html += `<a href="#" class="next page-item-next ${disabledNext}">Next</a>`
  elMyPagination.innerHTML = html
}
