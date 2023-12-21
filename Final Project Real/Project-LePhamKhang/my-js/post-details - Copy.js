//articles/3312
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = parseInt(urlParams.get('id'))
if (isNaN(id)) window.location.href = 'index.html'
//Get Detail
const elArticlesThumb = document.getElementById('ArticlesThumb')
const elArticleTitle = document.getElementById('ArticleTitle')
const elArticlePublishDate = document.getElementById('ArticlePublishDate')
const elArticleContent = document.getElementById('ArticleContent')
const elArticleAuthor = document.getElementById('ArticleAuthor')
const elArticleCategoryName = document.getElementById('ArticleCategoryName')
const elArticleCategoryNameTab = document.getElementById(
  'ArticleCategoryNameTab'
)
const elTopStory = document.getElementById('TopStory')
const elPreloader = document.getElementById('preloader')
//Comments - Start
const elCommandForm = document.getElementById('commandForm')
const elCommandNotice = document.getElementById('commandNotice')
const elCommentMessage = document.getElementById('commentMessage')
const elLisComment = document.getElementById('lisComment')
const elTotalComments = document.getElementById('totalComments')
const elCommentMessageReply = document.getElementById('commentMessageReply')
const elCancel = document.getElementById('Cancel')
const elReplyEmail = document.getElementById('replyEmail')
let Emails = ''
const COMMENTS = JSON.parse(localStorage.getItem('COMMENTS')) || []
let commentsByArticles = COMMENTS.filter(Comment => Comment.articleId === id)
console.log(commentsByArticles)
let parentCommentId = null
let level = 1
//Comments - End
//Api
API.callWithToken()
  .get('/auth/me')
  .then(res => {
    Emails = res.data.data.email
    elCommandForm.classList.remove('d-none')
    elCommandNotice.classList.add('d-none')
  })
  .catch(err => {
    elCommandForm.classList.add('d-none')
    elCommandNotice.classList.remove('d-none')
  })
.finally(function () {
    DisplayComments(commentsByArticles)
  })
//
API.call()
  .get(`/articles/${id}`)
  .then(response => {
    const article = response.data.data
    elArticleCategoryNameTab.innerText = article.category.name
    elArticleCategoryName.innerText = article.category.name
    elArticlesThumb.src = article.thumb
    elArticleTitle.innerText = article.title
    elArticlePublishDate.innerText = article.publish_date
    elArticleContent.innerHTML = article.content
    elArticleAuthor.innerText = article.author
    elArticlesThumb.src = article.thumb
    elPreloader.remove()
  })
API.call()
  .get(`/articles/${id}/related?limit=10`)
  .then(response => {
    const topStories = response.data.data
    let htmlDisplayTopStories = ''
    topStories.forEach((topStory, index) => {
      htmlDisplayTopStories += DisplayTopStories(topStory)
    })
    elTopStory.innerHTML = htmlDisplayTopStories
  })
function DisplayTopStories (articleStory) {
  return /*html*/ `
    <div class="echo-top-story justify-content-center">
    <!--<div class="echo-story-picture img-transition-scale">
        <a href="post-details.html?id=${articleStory.id}"><img src="${articleStory.thumb}" alt="${articleStory.title}" class="img-hover"></a>
    </div>-->
    <div class="echo-story-text">
        <h4><a href="post-details.html?id=${articleStory.id}" class="title-hover">${articleStory.title}</a></h4>
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
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
        const publishDate = dayjs(ArtiCate.publish_date).fromNow()
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
    elFakeAd.src = urlThumb
  })
//Comments-Start
elCommandForm.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('click')
  const Message = elCommentMessage.value.trim()
  //console.log(level)
  if (Message) {
    //level === 1 ? Message : `@${elReplyEmail.innerText}:${Message}`,
    const newMessage = {
      id: self.crypto.randomUUID(),
      Email: Emails,
      Message,
      dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      articleId: id
    }
    if (parentCommentId) {
      const parentIdx = COMMENTS.findIndex(item => item.id === parentCommentId)
      COMMENTS[parentIdx].childItems.push(newMessage)
      console.log(COMMENTS)
    } else {
      newMessage.childItems = []
      COMMENTS.unshift(newMessage)
    }
    localStorage.setItem('COMMENTS', JSON.stringify(COMMENTS))
    commentsByArticles = COMMENTS.filter(Comment => Comment.articleId === id)
    DisplayComments(commentsByArticles)
    elCommentMessage.value = ''
    parentCommentId = null
    elCommentMessageReply.classList.add('d-none')
  } else {
    alert('Vui lòng nhập nội dùng bình luận')
  }
})
elLisComment.addEventListener('click', function (e) {
  const el = e.target
  if (el.classList.contains('replyComments')) {
    parentCommentId = el.dataset.parentId
    console.log('replyComments', parentCommentId)
    elReplyEmail.innerText = el.dataset.replyEmail
    /*level = parseInt(el.dataset.level)
    console.log('level=', level)*/
    elCommentMessageReply.classList.remove('d-none')
  }
})
elCancel.addEventListener('click', function (e) {
  e.preventDefault()
  parentCommentId = null
  elCommentMessageReply.classList.add('d-none')
})
//Comment Function
function DisplayComments (items) {
  let html = ''
  items.forEach(Lists => {
    const publishDate = dayjs(Lists.dateTime).fromNow()
    const btnReply = Emails
    ?/*html*/ `    
    <div class="reply">
      <button class="replyComments" data-level="${level}" data-reply-email="${Lists.Email}" data-parent-id="${Lists.id}">
      <i class="fa-regular fa-share"></i> Reply</button>
    </div>`
    : ''
    //HTMLChild
    let htmlChild = ''
    if (Lists.childItems.length > 0) {
      Lists.childItems.forEach(HTMLCHILD => {
        const btnReply = Emails
        ?/*html*/ `    
        <div class="reply">
          <button class="replyComments" data-level="${level}" data-reply-email="${Lists.Email}" data-parent-id="${Lists.id}">
          <i class="fa-regular fa-share"></i> Reply</button>
        </div>`
        : ''
        const publishDateChild = dayjs(HTMLCHILD.dateTime).fromNow()
        htmlChild += /*html*/ `
        <!--div class="comment-inner3">-->
        <ul>
        <li class="wrapper reply">
        <div class="image-area">
          <img
            src="assets/images/home-1/trending-left/commentator-1.png"
            alt="author"
          />
        </div>
        <div class="content">
          <h5 class="title">${HTMLCHILD.Email}</h5>
          <a href="#" class="pe-none">${publishDateChild}</a>
          <p class="desc">
          ${HTMLCHILD.Message}
          </p>
        </div>
        ${btnReply}
      </li>
      </ul>
      <!--/div>-->`
      })
    }
    //HTMLChild
    html += /*html*/ `
    <ul class="comment-inner">
  <div class="comment-inner2">
    <li class="wrapper comment">
    <div class="image-area">
      <img
        src="assets/images/home-1/trending-left/commentator-2.png"
        alt="author"
      />
    </div>
    <div class="content">
      <h5 class="title">${Lists.Email}</h5>
      <a href="#" class="pe-none">${publishDate}</a>
      <p class="desc">
      ${Lists.Message}
      </p>
    </div>
    ${btnReply}
  </li>
    ${htmlChild}
    </div>
    </ul>`
  })
  elLisComment.innerHTML = html
}
//
const data = [
  {
    id: 'a9ce85ca-5053-42ff-a94b-e0fe8d6286ef',
    Email: 'KhangTest@gmail.com',
    Message: 'Hồng Kỳ N701 - xe limousine chở ông Tập thăm Việt NamHI',
    dateTime: '2023-12-20 14:16:43',
    articleId: 3973,
    childItems: [
      {
        id: 'a9ce85ca-5053-42ff-a94b-e0fe8d6286ef',
        Email: 'KhangTest@gmail.com',
        Message: 'Hồng Kỳ N701 - xe limousine chở ông Tập thăm Việt NamHI',
        dateTime: '2023-12-20 14:16:43',
        articleId: 3973
      }
    ]
  },
  {
    id: 'f4c973bf-95d9-40ae-b1c5-2684f1cef02c',
    Email: 'KhangTest@gmail.com',
    Message: 'Arab Saudi sẽ xây tòa nhà cao 2 km',
    dateTime: '2023-12-20 14:04:14',
    articleId: 2282,
    childItems: []
  }
]
//Comments-End
