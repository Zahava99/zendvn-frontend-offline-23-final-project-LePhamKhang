const elMainMenu = document.getElementById('mainMenu');
const elArticlesNew = document.getElementById('articlesNew');
const elArticlesPopular = document.getElementById('articlesPopular');
const elArticlesByCategory = document.getElementById('articlesByCategory');

const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
});

// menu
API.get('categories_news').then((response) => {
  const data = response.data.data;

  let html = '';
  let htmlOther = '';

  data.forEach((item, index) => {
    if (index <= 2) {
      html += /* html */ `
        <li class="menu-item">
          <a href="category.html?id=${item.id}" class="echo-dropdown-main-element">${item.name}</a>
        </li>`;
    } else {
      htmlOther += /* html */ `<li class="nav-item"><a href="category.html?id=${item.id}">${item.name}</a></li>`;
    }
  });

  elMainMenu.innerHTML =
    html +
    /*html */ `
    <li class="menu-item echo-has-dropdown">
      <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
      <ul class="echo-submenu list-unstyled menu-pages">${htmlOther}</ul>
    </li>`;
});

// bài viết mới
API.get('articles?limit=3&page=1').then((response) => {
  const data = response.data.data;

  let html = '';
  data.forEach((item) => {
    const categoryName = item.category.name;
    const thumb = item.thumb;
    const title = item.title;

    html += /* html */ `
    <div class="col-lg-4 col-md-6">
      <div class="echo-latest-news-main-content">
        <div class="echo-latest-news-img img-transition-scale">
          <a href="post-details.html">
            <img src="${thumb}" alt="${title}" class="img-hover" />
          </a>
          <span class="content-catagory-tag">${categoryName}</span>
        </div>
        <div class="echo-latest-news-single-title">
          <h5>
            <a href="post-details.html" class="text-capitalize title-hover">${title}</a>
          </h5>
        </div>
        <div class="echo-latest-news-time-views">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
          <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
      </div>
    </div>`;
  });
  elArticlesNew.innerHTML = html;
});

// bài viết phổ biến
API.get('articles/popular?limit=6').then((response) => {
  const data = response.data.data;

  let htmlLeft = '';
  let htmlRight = '';

  data.forEach((item, index) => {
    const categoryName = item.category.name;
    const thumb = item.thumb;
    const title = item.title;

    if (index <= 1) {
      htmlLeft += /*html */ `
      <div class="echo-trending-right-site-post">
        <div class="echo-trending-right-site-post-img img-transition-scale">
          <a href="post-details.html">
            <img src="${thumb}" alt="${title}" class="img-hover" />
          </a>
        </div>
        <div class="echo-trending-right-site-post-title">
          <h4 class="text-capitalize">
            <a href="post-details.html" class="title-hover">${title}</a>
          </h4>
        </div>
        <div class="echo-trending-right-site-like-comment-share-icons">
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
          </div>
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
          </div>
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
          </div>
        </div>
      </div>`;
    } else {
      htmlRight += /*html */ `
      <div class="echo-trending-left-site-post">
        <div class="echo-trending-left-site-post-img img-transition-scale">
          <a href="post-details.html">
            <img src="${thumb}" alt="${title}" class="img-hover" />
          </a>
        </div>
        <div class="echo-trending-right-site-post-title">
          <a href="catagory-details2.html" class="content-catagory-tag">${categoryName}</a>
          <h5>
            <a href="post-details.html" class="text-capitalize title-hover">${title}</a>
          </h5>
          <div class="echo-trending-post-bottom-icons">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
          </div>
        </div>
      </div>`;
    }
  });

  elArticlesPopular.innerHTML = /* html */ `
  <div class="col-xl-6">${htmlLeft}</div>
  <div class="col-xl-6">${htmlRight}</div>`;
});

API.get('/categories_news/articles?limit_cate=3&limit=3').then((response) => {
  const data = response.data.data;

  let html = '';
  data.forEach((item) => {
    let htmlArticles = '';

    item.articles.forEach((itemArticle) => {
      htmlArticles += /*html */`
      <div class="echo-trending-left-site-post">
        <div class="echo-trending-left-site-post-img img-transition-scale">
          <a href="post-details.html">
            <img src="${itemArticle.thumb}" alt="${itemArticle.title}" class="img-hover" />
          </a>
        </div>
        <div class="echo-trending-right-site-post-title">
          <h5>
            <a href="post-details.html" class="text-capitalize title-hover">${itemArticle.title}</a>
          </h5>
        </div>
      </div>`;
    });

    html += /*html */`
    <div class="col-lg-4">
      <div class="wrapper">
        <h5 class="title">${item.name}</h5>
        ${htmlArticles}
      </div>
    </div>`;
  });

  elArticlesByCategory.innerHTML = html;
});
