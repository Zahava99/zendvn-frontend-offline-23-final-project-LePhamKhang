//const API = axios.create({
 // baseURL: 'https://apiforlearning.zendvn.com/api/v2/'
//)

// Daytime and language Format
//dayjs.extend(window.dayjs_plugin_relativeTime)
//dayjs.locale('vi')
//const elMainMenu = document.getElementById('mainMenu')
const elArticlesTrending = document.getElementById('articlesTrending')
const elArticlesNew = document.getElementById('articlesNew')
const elArticlesNewLargest = document.getElementById('articlesNewLargest')
const elCategoriesFeaturedWithArticles = document.getElementById(
  'categoriesFeaturedWithArticles'
)
const elCategoriesFeaturedTab = document.getElementById('categoriesFeaturedTab')
const elCategoriesFeaturedTabContent = document.getElementById(
  'categoriesFeaturedTabContent'
)
const elArticleSlider = document.getElementById('articlesSlider')
//console.log(elMainMenu)

//Render Menus
// /* Html */ //
/* API.get('categories_news').then(response => {
  // handle success
  //console.log(response)
  const data = response.data
  const categories = data.data
  //console.log('categories',categories)
  let htmlMenu = ''
  let htmlMenuOther = ''
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`
    } else {
      htmlMenuOther += `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`
    }
  })
  elMainMenu.innerHTML =
    htmlMenu +
    /* Html 
    `<li class="dropdown">
        <a href="#">
           <span>Danh mục khác</span> 
           <i class="bi bi-chevron-down dropdown-indicator"></i>
        </a>
        <ul>${htmlMenuOther}</ul>
    </li>`
})*/
// Render Articles Slider
API.get('articles/popular?limit=5').then(response => {
  // handle success
  //console.log('response',response)
  const articles = response.data.data
  //console.log('articles',articles)
  let html = ''
  articles.forEach((item, index) => {
    html += /* html */ `
    <div class="swiper-slide">
        <a 
        href="single-post.html" 
        class="img-bg d-flex align-items-end"
        style="background-image: url('${item.thumb}')"
        >
            <div class="img-bg-inner">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        </a>
    </div>`
  })
  elArticleSlider.innerHTML = html
})
//Render Articles Trending
// /* Html */ //
API.get('articles/popular?limit=5').then(response => {
  // handle success
  //console.log('response',response)
  const articles = response.data.data
  //console.log('articles',articles)
  let html = ''
  articles.forEach((item, index) => {
    html += RenderArticlesTrending(item, index)
  })
  elArticlesTrending.innerHTML = html
})

//Render Articles New
// /* Html */ //
API.get('articles?limit=5').then(response => {
  const articles = response.data.data
  //console.log(articles)
  let html = ''
  articles.forEach((item, index) => {
    if (index === 0) {
      elArticlesNewLargest.innerHTML = RenderArticlesNewLarghest(item)
    } else {
      html += RenderArticlesNew(item)
    }
  })
  elArticlesNew.innerHTML = html
})

// Render Category Feature
API.get('categories_news/articles?limit_cate=2&limit=9').then(response => {
  const data = response.data.data
  console.log('ABC', data)
  let html = ''
  data.forEach((item, index) => {
    const category = item.name
    const articles = item.articles

    html += /* Html */ `
        <section class="category-section">
        <div class="container" data-aos="fade-up">
        ${RenderCategorySectionTitle(category)}
        ${RenderArticlesByCategoryFeatured(articles, index)}
          <!-- End .row -->
        </div>
      </section>`
  })
  elCategoriesFeaturedWithArticles.innerHTML = html
})

//Render Category Feature Layout Tab
API.get('categories_news/articles?limit_cate=4&limit=4').then(response => {
  const data = response.data.data
  //console.log('ABC', data)
  let htmlTab = ''
  let htmlTabContent = ''

  data.forEach((item, index) => {
    const categoryName = item.name
    const articles = item.articles
    const slug = item.slug
    const active = index === 0 ? 'active' : ''
    const activeShow = index === 0 ? 'show active' : ''
    let htmlArticles = ''
    articles.forEach((articlesItem, index) => {
        const publishDate = dayjs(articlesItem.publish_date).fromNow()
      htmlArticles += /*html*/ `
        <div class="col-md-6 col-lg-3">
            <div class="post-entry-1">
                <a href=""><img src="${articlesItem.thumb}" alt="${articlesItem.title}" class="img-fluid" /></a>
                <div class="post-meta">
                    <span>${publishDate}</span>
                </div>
                <h2><a href="">${articlesItem.title}</a></h2>
            </div>
        </div>`
    })
    htmlTab += /* Html */ `
      <li class="nav-item" role="presentation">
      <button 
      class="nav-link ${active}" 
      id="${slug}-tab" 
      data-bs-toggle="tab" 
      data-bs-target="#${slug}-tab-pane"
      type="button" 
      role="tab" 
      aria-controls="${slug}-tab-pane" 
      aria-selected="false">
        ${categoryName}
      </button>
    </li>`
    htmlTabContent += /* html */ `
    <div class="tab-pane fade ${activeShow}" id="${slug}-tab-pane" role="tabpanel" aria-labelledby="${slug}-tab" tabindex="0">
    <div class="row g-5">${htmlArticles}</div>
  </div>`
  })
  elCategoriesFeaturedTab.innerHTML = htmlTab
  elCategoriesFeaturedTabContent.innerHTML = htmlTabContent
})

// Function Area

function RenderArticlesTrending (item, index) {
  return /* Html */ `
    <li>
        <a href="#">
            <span class="number">${index + 1}</span>
            <h3>${item.title}</h3>
            <span class="author">${item.author}</span>
        </a>
    </li>`
}
function RenderArticlesNewLarghest (item) {
    const publishDate = dayjs(item.publish_date).fromNow()
  return /* Html */ `
    <div class="post-entry-1 lg">
        <a href="#">
        <img src="${item.thumb}" alt="${item.title}" class="img-fluid" />
        </a>
        <div class="post-meta">
            <span class="date">${item.category.name}</span> 
            <span class="mx-1">&bullet;</span> 
            <span>${publishDate}</span>
        </div>
        <h2>
        <a href="#">${item.title}</a>
        </h2>
        <p class="mb-4 d-block">
        ${item.description}
        </p>

        <div class="d-flex align-items-center author">
            <div class="photo"><img src="${item.thumb}" alt="" class="img-fluid" />
            </div>
            <div class="name">
            <h3 class="m-0 p-0">${item.author}</h3>
            </div>
        </div>
        </div>`
}
function RenderArticlesNew (item) {
    const publishDate = dayjs(item.publish_date).fromNow()
  return /* Html */ `
    <div class="col-lg-6">
    <div class="post-entry-1">
        <a href="#"><img src="${item.thumb}" alt="${item.title}"
            class="img-fluid" />
        </a>
      <div class="post-meta">
        <span class="date">${item.category.name}</span> 
        <span class="mx-1">&bullet;</span> 
        <span>${publishDate}</span>
      </div>
      <h2><a href="#">${item.title}</a></h2>
    </div>
  </div>`
}
function RenderCategorySectionTitle (category) {
  return /* html */ `
    <div class="section-header d-flex justify-content-between align-items-center mb-5">
        <h2>${category}</h2>
    <div><a href="#" class="more">See All ${category} </a></div>
  </div>`
}
function RenderArticlesByCategoryFeatured (articles, idx) {
  let htmlArticlesLeft = ''
  let htmlArticlesRight = ''
  articles.forEach((articlesItem, index) => {
    const title = articlesItem.title
    const thumb = articlesItem.thumb
    const publishDate = dayjs(articlesItem.publish_date).fromNow()
    const authorName = articlesItem.author
    if (index < 4) {
      htmlArticlesLeft += /* Html */ `
            <div class="col-lg-6">
                  <div class="post-entry-1">
                    <a href="#"><img src="${thumb}" alt="${title}"
                        class="img-fluid" /></a>
                    <div class="post-meta">          
                      <span>${publishDate}</span>
                    </div>
                    <h2><a href="#">${title}</a></h2>
                  </div>
                </div>`
    } else {
      htmlArticlesRight += /* Html */ `
            <div class="post-entry-1 border-bottom">
            <div class="post-meta">
                <span>${publishDate}</span>
            </div>
            <h2 class="mb-2">
              <a href="#">${title}</a>
            </h2>
            <span class="author mb-3 d-block">${authorName}</span>
          </div>`
    }
  })
  let rowClass = 'flex-row-reverse'
  let borderClass = ''
  if (idx % 2 === 0) {
    rowClass = ''
    borderClass = 'border-start custom-border'
  }
  //const rowClass = idx % 2 === 0 ? '': 'flex-row-reverse'
  //const borderClass = idx % 2 === 0 ? 'border-start custom-border' : ''
  return /* html */ `
    <div class="row g-5 ${rowClass}">
        <div class="col-lg-8">
            <div class="row g-5">
                ${htmlArticlesLeft}
            </div>
        </div>
        <div class="col-lg-4 ${borderClass}">
            ${htmlArticlesRight}  
        </div>
    </div>`
}
