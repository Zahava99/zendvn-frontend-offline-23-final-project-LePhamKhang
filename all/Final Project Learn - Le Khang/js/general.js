/*const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2/'
})*/
const API = {
  call: function () {
    return axios.create({
      baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
    });
  },
  callWithToken: function (Token) {
    if (!Token) Token = localStorage.getItem('ACCESS_TOKEN');

    return axios.create({
      baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
  },
};
// Daytime and language Format
dayjs.extend(window.dayjs_plugin_relativeTime)
dayjs.locale('vi')

/*let RECENT_POSTS = JSON.parse(localStorage.getItem('RECENT_POSTS')) || [];
let recentPostsIdString = RECENT_POSTS.toString();

API.get(`articles?limit=4&ids=${recentPostsIdString}`).then((res) => {
  const articles = res.data.data;

  let html = '';
  articles.forEach((articles) => {
    html += /* html * `
    <li>
      <a href="detail.html?id=${articles.id}" class="d-flex align-articless-center">
        <img src="${articles.thumb}" alt="${articles.title}" class="img-fluid me-3" />
        <div>
          <div class="post-meta d-block">
            <span class="date">${articles.category.name}</span> 
            <span class="mx-1">&bullet;</span> 
            <span>${dayjs(articles.publish_date).fromNow()}</span>
          </div>
          <span>${articles.title}</span>
        </div>
      </a>
    </li>`;
  });
  recentPosts.innerHTML = html;
});*/
function showFormErrorsMessage(errors, el) {
  let errString = '';

  for (const property in errors) {
    errString += /* html */ `<li>${errors[property]}</li>`;
  }

  el.innerHTML = /* html */ `
  <div class="alert alert-danger" role="alert">
    <ul>${errString}</ul>
  </div>`;
}