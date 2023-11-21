const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2'
})
// Khai báo biến
const elNavbarMenu = document.getElementById('navbarMenu')
const elPopularArticles = document.getElementById('popularArticles')
const elTrendingArticles = document.getElementById('trendingArticles')
const elTrendingArticlesRight = document.getElementById('trendingArticlesRight')
const elTrendingArticlesLeft = document.getElementById('trendingArticlesLeft')
const elTechAndGadget = document.getElementById('techAndGadget')
// Render Menu
API.get('/categories_news').then(response => {
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
        <a href="contact.html" class="echo-dropdown-main-element">${item.name}</a></li>`
    } else {
      htmlMenuDropdown += `
        <li class="menu-item">
        <a href="contact.html" class="echo-main-element">${item.name}</a></li>`
    }
  })
  elNavbarMenu.innerHTML =
    htmlMenu +
    /* Html */ `
    <li class="menu-item echo-has-dropdown">
        <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
        <ul class="echo-submenu list-unstyled menu-pages">
            ${htmlMenuDropdown}
        </ul>
    </li>`
})
// Render Popular Articles
API.get('/articles?limit=3&page=1').then(response => {
    //console.log(response)
    const popularsArticles = response.data.data
    //console.log('Test1',popularsArticles)
    let html = ''
    popularsArticles.forEach(articles => {
        html += /*html*/`
        <div class="col-lg-4 col-md-6">
        <div class="echo-latest-news-main-content">
            <div class="echo-latest-news-img img-transition-scale">
                <a href="post-details.html">
                    <img src="${articles.thumb}" alt="${articles.title}" class="img-hover">
                </a>
                <span class="content-catagory-tag">${articles.category.name}</span>
            </div>
            <div class="echo-latest-news-single-title">
                <h5><a href="post-details.html" class="text-capitalize title-hover">${articles.title}</a></h5>
            </div>
            <div class="echo-latest-news-time-views">
                <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
                <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
        </div>
    </div>`
    });
    elPopularArticles.innerHTML = html
})
//Render Trending Articles
API.get('/articles/popular?limit=6').then(response => {
    //console.log(response)
    const trendingArticles = response.data.data
    console.log('Test2',trendingArticles)
    let htmlTrendingArticlesLeft = ''
    let htmlTrendingArticlesRight = ''
    trendingArticles.forEach((articles,index) => {
        if (index < 2) {
            htmlTrendingArticlesRight += /* html */`
            <div class="echo-trending-right-site-post">
                <div class="echo-trending-right-site-post-img img-transition-scale">
                    <a href="post-details.html">
                        <img src="${articles.thumb}" alt="${articles.title}" class="img-hover">
                    </a>
                </div>
                <div class="echo-trending-right-site-post-title">
                    <h4 class="text-capitalize"><a href="post-details.html" class="title-hover">${articles.title}</a></h4>
                </div>
                <div class="echo-trending-right-site-like-comment-share-icons">
                    <div class="echo-trending-right-like-comment-content">
                        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
                    </div>
                    <div class="echo-trending-right-like-comment-content">
                        <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                    </div>
                    <div class="echo-trending-right-like-comment-content">
                        <a href="#" class="pe-none"><i class="fa-light fa-arrow-up-from-bracket"></i>
                            1.5k Share</a>
                    </div>
                </div>
            </div>`
        } else {
            htmlTrendingArticlesLeft += /* html */`
            <div class="echo-trending-left-site-post">
            <div class="echo-trending-left-site-post-img img-transition-scale">
                <a href="post-details.html">
                    <img src="${articles.thumb}" alt="${articles.title}" class="img-hover">
                </a>
            </div>
            <div class="echo-trending-right-site-post-title">
                <a href="catagory-details2.html" class="content-catagory-tag">${articles.category.name}</a>
                <h5><a href="post-details.html" class="text-capitalize title-hover">${articles.title}</a></h5>
                <div class="echo-trending-post-bottom-icons">
                    <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
                    <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                    </div>
                </div>
            </div>`
        }
    });
    elTrendingArticlesRight.innerHTML = htmlTrendingArticlesRight
    elTrendingArticlesLeft.innerHTML = htmlTrendingArticlesLeft
})
//Render 3 Mục TechNews,Technology và Gadget
//API.get('/categories_news/articles?limit_cate=3&limit=3').then(response => {
    //console.log(response)
    //const techsNew = response.data
    //console.log('Test3',techsNew)
    //let html = ''
    //elTrendingArticlesRight.innerHTML = html
//})
// /categories_news/articles?limit_cate=3&limit=3
API.get('/categories_news/articles?limit_cate=3&limit=3').then(response => {
    const techsNew = response.data.data
    //console.log('ABC', techsNew)

    let html = ''
    techsNew.forEach((item) => {
        const articles = item.articles
        console.log('AFV', articles)
        let htmlArticleTechs = ''
        articles.forEach((articlesTechs) => {
            htmlArticleTechs += `
            <div class="echo-trending-left-site-post">
              <div class="echo-trending-left-site-post-img img-transition-scale">
                  <a href="post-details.html">
                      <img src="${articlesTechs.thumb}" alt="${articlesTechs.title}" class="img-hover">
                  </a>
              </div>
              <div class="echo-trending-right-site-post-title">
                  <a href="catagory-details2.html" class="content-catagory-tag">${item.name}</a>
                  <h5><a href="post-details.html" class="text-capitalize title-hover">${articlesTechs.title}</a></h5>
              </div>
          </div>`
        })
      html += /* html */ `
      <div class="col-lg-4">
      <div class="wrapper">
      <h5 class="title">${item.name}</h5>
          ${htmlArticleTechs}
      </div>
  </div> `
    })
    elTechAndGadget.innerHTML = html
  })
