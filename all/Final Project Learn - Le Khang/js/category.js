/*const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2/'
})

console.log(API)
// Daytime and language Format
dayjs.extend(window.dayjs_plugin_relativeTime)
dayjs.locale('vi')*/
// Khai báo biến
//const elMainMenu = document.getElementById('mainMenu')
const elArticles = document.getElementById('Articles')
const elArticlesAndCate = document.getElementById('ArticlesAndCate')
const elTabTitle = document.getElementById('TabTitle')
const elArticlesTitle = document.getElementById('ArticlesTitle')
const elMyPagination = document.getElementById('myPagination')
//Cách dùng để đồng bộ trang web với URL
const queryString = window.location.search
//console.log(queryString)
const urlParams = new URLSearchParams(queryString)
const id = parseInt(urlParams.get('id'))
//console.log('Test3', id)
//let currentPage = 1
let currentPage = parseInt(urlParams.get('page'))
if (isNaN(currentPage)) currentPage = 1
const PAGE_RANGE = 5
let Start = 1
let End = PAGE_RANGE
getArticles(currentPage)
//Render Menu
/*API.get('categories_news').then(response => {
  //console.log(response)
  //const data = response.data
  const categories = response.data.data
  //console.log('categories', categories)
  let htmlMenu = ''
  let htmlMenuDropdown = ''
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += `
          <li class="menu-item">
          <a href="category.html?id=${item.id}" class="echo-dropdown-main-element">${item.name}</a></li>`
    } else {
      htmlMenuDropdown += `
          <li class="menu-item">
          <a href="category.html?id=${item.id}" class="echo-main-element">${item.name}</a></li>`
    }
  })
  elMainMenu.innerHTML =
    htmlMenu +
     `
      <li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
          <ul class="echo-submenu list-unstyled menu-pages">
              ${htmlMenuDropdown}
          </ul>
      </li>`
})*/
// Nút Show More
/*elArticlesAndCate.addEventListener('click',function(e){
    const el = e.target
    //console.log('click')
    el.classList.contains('text-capitalize echo-py-btn')
    currentPage ++
    //console.log(currentPage)
    getArticles(currentPage)
    addOrUpdateUrlParameter('page',currentPage)

})*/

//Event delegate
elMyPagination.addEventListener('click', function (e) {
  //console.log('click')
  const el = e.target
  if (el.classList.contains('custom')) {
    currentPage = parseInt(el.innerText)
    getArticles(currentPage)
    //console.log(currentPage)
    addOrUpdateUrlParameter('page', currentPage)
  }

  if (el.classList.contains('prev-own')) {
    currentPage--
    if (currentPage === Start - 1) {
        End = currentPage
        Start = End - PAGE_RANGE + 1
    }
    getArticles(currentPage)
    addOrUpdateUrlParameter('page', currentPage)
  }

  if (el.classList.contains('next-own')) {
    currentPage++
    if (currentPage === End + 1) {
        Start = currentPage
        End = Start + PAGE_RANGE - 1
    }
    getArticles(currentPage)
    addOrUpdateUrlParameter('page', currentPage)
  }
})
// Render Articles With Each Category
function getArticles (page = 1) {
  //categories_news/2/articles?limit=5&page=3
  ///categories_news/${id}/articles?limit=5&page=${page}
  API.get(`categories_news/${id}/articles?limit=5&page=${page}`).then(
    response => {
      const articlesWithCategory = response.data.data
      //console.log('abc',articlesWithCategory)
      let TabpanelName = ''
      let ArticlesTitle = ''
      let html = ''
      const totalPages = response.data.meta.last_page
      articlesWithCategory.forEach(ArtiCate => {
        const publishDate = dayjs(ArtiCate.publish_date).fromNow()
        TabpanelName = ArtiCate.category.name
        ArticlesTitle = ArtiCate.category.name
        html += /*html*/ `
            <div class="echo-hero-baner">
                <div class="echo-inner-img-ct-1  img-transition-scale">
                    <a href="detail.html?id=${ArtiCate.id}">
                    <img src="${ArtiCate.thumb}" alt="${ArtiCate.title}">
                    </a>
                </div>
                <div class="echo-banner-texting">
                    <h3 class="echo-hero-title text-capitalize font-weight-bold">
                    <a href="detail.html?id=${ArtiCate.id}" class="title-hover">${ArtiCate.title}</a>
                    </h3>
                <div class="echo-hero-area-titlepost-post-like-comment-share">
                 <div class="echo-hero-area-like-read-comment-share">
                    <a href="#"><i class="fa-light fa-clock"></i> 
                    ${publishDate}</a>
                </div>
                <div class="echo-hero-area-like-read-comment-share">
                    <a href="#"><i class="fa-light fa-eye"></i> 
                    3.5k Views</a>
                </div>
                <div class="echo-hero-area-like-read-comment-share">
                    <a href="#">
                    <i class="fa-light fa-arrow-up-from-bracket"></i>
                    1.5k Share</a>
                </div>
                </div>
                    <hr>
                        <p class="echo-hero-discription">${ArtiCate.description}</p>
                </div>
            </div>`
        elTabTitle.innerText = /*html*/ `${TabpanelName}`
        elArticlesTitle.innerText = /*html*/ `${ArticlesTitle}`
        elArticles.innerHTML = html
        renderPagination(totalPages)
      })
    }
  )
}
// addOrUpdateUrlParameter
function addOrUpdateUrlParameter (key, value) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  urlParams.set(key, value)
  const newUrl = window.location.pathname + '?' + urlParams.toString()
  history.pushState(null, '', newUrl)
}
//<a href="#" class="prev page-item-prev ${disabledPrev}">Prevous</a>
//<a href="#" class="page-item ${active}">${index}</a>
function renderPagination (total) {
  const disabledPrev = currentPage === 1 ? 'disabled' : ''

  let html = `<li class="page-item  ${disabledPrev}"><a class="page-link prev-own">Previous</a></li>`
  if (End > total) {
    End = total
  }
  for (let index = Start; index <= End; index++) {
    const active = index === currentPage ? 'active disabled' : ''
    html += `<li class="page-item ${active}"><a  href="#" class="page-link custom">${index}</a></li>`
  }

  const disabledNext = currentPage === total ? 'disabled' : ''
  html += `<li class="page-item ${disabledNext}"><a class="page-link next-own" href="#">Next</a></li>`
  elMyPagination.innerHTML = html
}
