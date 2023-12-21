const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = parseInt(urlParams.get('id'))

const elCategoryName = document.getElementById('categoryName')
const elPublishDate = document.getElementById('publishDate')
const elArticleTitle = document.getElementById('articleTitle')
const elArticleContent = document.getElementById('articleContent')
const elArticleThumb = document.getElementById('articleThumb')
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
//console.log(commentsByArticles)
let parentCommentId = null
let level = 1
/*
1.id=2697
2.id=2767
*/
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
API.call()
  .get(`articles/${id}`)
  .then(res => {
    const article = res.data.data
    elCategoryName.innerText = article.category.name
    elPublishDate.innerText = article.publish_date
    elArticleTitle.innerText = article.title
    elArticleContent.innerHTML = article.content
    elArticleThumb.src = article.thumb

    if (!RECENT_POSTS.includes(id)) {
      if (RECENT_POSTS.length === 4) RECENT_POSTS.shift()

      RECENT_POSTS.push(id)
      localStorage.setItem('RECENT_POSTS', JSON.stringify(RECENT_POSTS))
    }
  })
  .catch(function (error) {
    window.location.href = 'index.html'
  })
elCommandForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const Message = elCommentMessage.value.trim()
  console.log(level);
  if (Message) {
    const newMessage = {
      id: self.crypto.randomUUID(),
      Email: Emails,
      Message:level === 1 ? Message : `@${elReplyEmail.innerText}:${Message}`,
      dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      articleId: id
    }
    console.log(newMessage)
    if (parentCommentId) {
      const parentIdx = COMMENTS.findIndex(item => item.id === parentCommentId)
      COMMENTS[parentIdx].childItems.push(newMessage)
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
  if (el.classList.contains('btn-reply-comments')) {
    parentCommentId = el.dataset.parentId
    elReplyEmail.innerText = el.dataset.replyEmail
    level = parseInt(el.dataset.level)
    console.log('level=', level)
    elCommentMessageReply.classList.remove('d-none')
  }
})
elCancel.addEventListener('click', function (e) {
  e.preventDefault()
  parentCommentId = null
  elCommentMessageReply.classList.add('d-none')
})
function DisplayComments (list) {
  let html = ''
  list.forEach(lists => {
    html += DisplayCommentsItems(lists, lists.id, true)
  })
  elLisComment.innerHTML = html
  elTotalComments.innerText = `${list.length} bình luận`
}
function DisplayCommentsItems (items, ParentId = null, isParent = true) {
  const level = isParent ? 1 : 2
  const btnReply = Emails
    ?/*html*/ `<button type="button" class="btn btn-primary ms-auto btn-reply-comments" data-level="${level}" data-reply-email="${items.Email}" data-parent-id="${ParentId}">Trả lời</button>`
    : ''
  const publishDateChild = dayjs(items.dateTime).fromNow()
  const className = isParent ? 'comment' : 'reply'
  const AvatarNumber = Math.floor(Math.random() * 6) + 1
  let htmlChild = ''
  if (isParent && items.childItems.length > 0) {
    htmlChild += `<div class="comment-replies bg-light p-3 mt-3 rounded">`
    htmlChild += `<h6 class="comment-replies-title mb-4 text-muted text-uppercase">
    ${items.childItems.length}replies </h6>`
    items.childItems.forEach(ListChild => {
      htmlChild += DisplayCommentsItems(ListChild, ParentId, false)
    })
    htmlChild += `</div>`
  }
  return /*html*/ `
  <div class="${className} d-flex mb-4">
    <div class="flex-shrink-0">
      <div class="avatar avatar-sm rounded-circle">
        <img class="avatar-img" src="assets/img/person-${AvatarNumber}.jpg" alt="" class="img-fluid" />
      </div>
    </div>
    <div class="flex-shrink-1 ms-2 ms-sm-3 flex-grow-1">
      <div class="${className}-meta d-flex">
        <h6 class="mb-0 me-2">${items.Email}</h6>
        <span class="text-muted">${publishDateChild}</span>
        ${btnReply}
      </div>
      <div class="${className}-body">${items.Message}
      </div>
      ${htmlChild}
    </div>
  </div>`
}
function DisplayCommentsChildItems (items) {
  const publishDateChild = dayjs(items.dateTime).fromNow()
  const btnReply = Emails
    ? `<button type="button" class="btn btn-primary ms-auto btn-reply-comments" data-parent-id="${items.id}">Trả lời</button>`
    : ''
  return /*html*/ `
  <div class="reply d-flex mb-4">
  <div class="flex-shrink-0">
    <div class="avatar avatar-sm rounded-circle">
      <img
        class="avatar-img"
        src="assets/img/person-4.jpg"
        alt=""
        class="img-fluid"
      />
    </div>
  </div>
  <div class="flex-grow-1 ms-2 ms-sm-3">
    <div class="reply-meta d-flex align-items-baseline">
      <h6 class="mb-0 me-2">${items.Email}</h6>
      <span class="text-muted">${publishDateChild}</span>
      ${btnReply}
    </div>
    <div class="reply-body">
      ${items.Message}
    </div>
  </div>
</div>`
}
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
