const elArticles = document.getElementById('ApoArticles')
const elArticlesAndCate = document.getElementById('ApoArticlesAndCate')
const elApoTabTitle = document.getElementById('ApoTabTitle')
const elApoArticlesTitle = document.getElementById('ApoArticlesTitle')
const elTopStory = document.getElementById('TopStory')
const elPreloader = document.getElementById('preloader')
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const keyWords = urlParams.get('keyword')
let currentPage = parseInt(urlParams.get('page'))
if (isNaN(currentPage)) currentPage = 1
FindArticles(currentPage)
// Nút Show More
elArticlesAndCate.addEventListener('click',function(e){
    const el = e.target
    console.log('click')
    el.classList.contains('text-capitalize echo-py-btn')
    currentPage ++
    console.log(currentPage)
    FindArticles(currentPage)
    addOrUpdateUrlParameter('page',currentPage)
})

function FindArticles (page = 1) {
  API.call().get(`articles/search?q=${keyWords}&limit=10&page=${page}`).then(
    response => {
      const articlesWithCategory = response.data.data
      console.log('abc', articlesWithCategory)
      let ApoTabTitle = ''
      //let ApoArticlesTitle = ''
      let html = ''
      //const totalPages = response.data.meta.last_page
      articlesWithCategory.forEach(ArtiCate => {
        //const publishDate = dayjs(ArtiCate.publish_date).fromNow()
        ApoTabTitle = ArtiCate.category.name
        //ApoArticlesTitle = ArtiCate.category.name
        console.log('abc', ArtiCate.id)
        const publishDate = dayjs(ArtiCate.publish_date).fromNow();
        const regex = new RegExp(keyWords, 'gi');
        const ArtiCateTitle = ArtiCate.title.replace(regex, (match) => `<mark>${match}</mark>`);
        const ArtiCateDescription = ArtiCate.description.replace(regex, (match) => `<mark>${match}</mark>`);
        html += /*html*/ `
            <div class="echo-hero-baner">
                <div class="echo-inner-img-ct-1  img-transition-scale">
                    <a href="post-details.html?id=${ArtiCate.id}"><img src="${ArtiCate.thumb}" class="echo-ct-style-1-banner-images" alt="${ArtiCateTitle}"></a>
                </div>
                <div class="echo-hero-baner-text-heading-info-ct-1">
                    <h2 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html?id=${ArtiCate.id}" class="title-hover">${ArtiCateTitle}</a></h2>
                    <div class="echo-hero-area-titlepost-post-like-comment-share">
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-clock"></i> ${publishDate}</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
                        </div>
                    </div>
                    <hr>
                    <p class="echo-hero-discription">${ArtiCateDescription}</p>
                </div>
            </div>`
        elApoTabTitle.innerText = /*html*/ `${ApoTabTitle}`
        elApoArticlesTitle.innerText = /*html*/ `Đã tìm thấy bài viết với từ khóa "${keyWords}"`
        elArticles.innerHTML = html
        elPreloader.remove();
      })
    }
  )
}
function addOrUpdateUrlParameter (key, value) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.set(key, value)
    const newUrl = window.location.pathname + '?' + urlParams.toString()
    history.pushState(null, '', newUrl)
  }

  API.call()
  .get('articles/popular?limit=4')
  .then(response => {
    const topStories = response.data.data
    let htmlDisplayTopStories = ''
    topStories.forEach((topStory, index) => {
      htmlDisplayTopStories += DisplayTopStories(topStory)
    })
    elTopStory.innerHTML = htmlDisplayTopStories
  })
function DisplayTopStories (articleStory) {
  const publishDate = dayjs(articleStory.publish_date).fromNow();
  return /*html*/ `
    <div class="echo-top-story justify-content-center">
    <!--<div class="echo-story-picture img-transition-scale">
        <a href="post-details.html?id=${articleStory.id}"><img src="${articleStory.thumb}" alt="${articleStory.title}" class="img-hover"></a>
    </div>-->
    <div class="echo-story-text">
        <h4><a href="post-details.html?id=${articleStory.id}" class="title-hover">${articleStory.title}</a></h4>
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${publishDate}</a>
    </div>
</div>`
}
function getArticles (page = 1) {
  API.call()
    .get(`categories_news/${id}/articles?limit=5&page=${page}`)
    .then(response => {
      const articlesWithCategory = response.data.data
      console.log('abc', articlesWithCategory)
      let ApoTabTitle = ''
      let ApoArticlesTitle = ''
      let html = ''
      //const totalPages = response.data.meta.last_page
      articlesWithCategory.forEach(ArtiCate => {
        //const publishDate = dayjs(ArtiCate.publish_date).fromNow()
        ApoTabTitle = ArtiCate.category.name
        ApoArticlesTitle = ArtiCate.category.name
        console.log('abc', ArtiCate.id)
        html += /*html*/ `
          <div class="echo-hero-baner">
          <div class="echo-inner-img-ct-1  img-transition-scale">
              <a href="post-details.html?id=${ArtiCate.id}"><img src="${ArtiCate.thumb}" class="echo-ct-style-1-banner-images" alt="${ArtiCate.title}"></a>
          </div>
          <div class="echo-hero-baner-text-heading-info-ct-1">
              <h2 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html?id=${ArtiCate.id}" class="title-hover">${ArtiCate.title}</a></h2>
              <div class="echo-hero-area-titlepost-post-like-comment-share">
                  <div class="echo-hero-area-like-read-comment-share">
                      <a href="#"><i class="fa-light fa-clock"></i> 06 minute read</a>
                  </div>
                  <div class="echo-hero-area-like-read-comment-share">
                      <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                  </div>
                  <div class="echo-hero-area-like-read-comment-share">
                      <a href="#"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
                  </div>
                  <div class="echo-hero-area-like-read-comment-share">
                      <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
                  </div>
              </div>
              <hr>
              <p class="echo-hero-discription">${ArtiCate.description}</p>
          </div>
      </div>`
        elApoTabTitle.innerText = /*html*/ `${ApoTabTitle}`
        elApoArticlesTitle.innerText = /*html*/ `${ApoArticlesTitle}`
        elArticles.innerHTML = html
      })
    })
}
const elPopularCategory = document.getElementById('PopularCategory')
/*API.call()
  .get(
    'https://api.currencyapi.com/v3/latest?base_currency=USD&apikey=cur_live_GiCrgXVVvcJgBsWGwVeVhFAcUuE1PJfDu9gEdGiZ'
  )
  .then(response => {
    console.log('CurrencyExchangeRate', response)
    const currency = response.data.data
    let html = ''
    html += /*html `
    <tbody id="PopularCategory">
    <tr>
      <th scope="row">${currency.USD.code}-${currency.RUB.code}</th>
      <td>${currency.RUB.value}</td>
    </tr>
    <tr>
      <th scope="row">${currency.USD.code}-${currency.AUD.code}</th>
      <td>${currency.AUD.value}</td>
    </tr>
    <tr>
      <th scope="row">${currency.USD.code}-${currency.EUR.code}</th>
      <td colspan="2">${currency.EUR.value}</td>
    </tr>
    <tr>
    <th scope="row">${currency.USD.code}-${currency.JPY.code}</th>
    <td colspan="2">${currency.JPY.value}</td>
  </tr>
  <tr>
  <th scope="row">${currency.USD.code}-${currency.VND.code}</th>
  <td colspan="2">${currency.VND.value}</td>
</tr>
  </tbody>`
    elPopularCategory.innerHTML = html
  })*/
  const elFakeAd = document.getElementById('FakeAd')
API.call()
.get(
  `https://api.unsplash.com/photos/random/?client_id=Tlf5fsP2b1Z05lpuM98uZxVUtCQOAQ3yf-TgTe_xndw&orientation=landscape`
)
.then(response => {
  const urlIMG = response.data.urls
  const urlThumb = response.data.urls.full
  console.log(urlIMG);
  elFakeAd.src = urlThumb
})