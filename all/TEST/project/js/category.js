const elMainMenu = document.getElementById('mainMenu');
const elArticles = document.getElementById('articles');
const elCategoryName = document.getElementById('categoryName');
const elPreloader = document.getElementById('preloader');
const elPageTitle = document.querySelector('title');
const elMyPagination = document.getElementById('myPagination');

const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let currentPage = parseInt(urlParams.get('page'));
if (isNaN(currentPage)) currentPage = 1;
const PAGE_RANGE = 5;
// tính toán lại START, END khi vừa vào trang, phụ thuộc vào currentPage

console.log('currentPage', currentPage);
console.log('Math.ceil(currentPage / PAGE_RANGE)', Math.ceil(currentPage / PAGE_RANGE));
let START = Math.ceil(currentPage / PAGE_RANGE) * PAGE_RANGE - PAGE_RANGE + 1

console.log('start', START);
let END = START + PAGE_RANGE - 1;

/*
PAGE              START               END
1,2,3,4,5         1                   5
6,7,8,9,10        6                   10
11,12,13,14,15    11                  15


1 / 5 = 0.xx -> 1
2 / 5 = 0.yy -> 1
3 / 5 = 0.zz -> 1
4 / 5 = 0.xy -> 1
5 / 5 = 1 -> 1

1 * 5 = 5 -> z
z - 5 + 1 = 1


6 / 5 = 1.xx -> 2
7 / 5 = 1.yy -> 2
8 / 5 = 1.zz -> 2
9 / 5 = 1.xy -> 2
10 / 5 = 2 -> 2

2 * 5 = 10
10 - 5 + 1 = 6


11 / 5 = 2.xx -> 3
12 / 5 = 2.yy -> 3
13 / 5 = 2.zz -> 3
14 / 5 = 2.xy -> 3
15 / 5 = 3 -> 3

3 * 5 = 15
15 - 5 + 1 = 11

Math.ceil(currPage / PAGE_RANGE) * PAGE_RANGE - PAGE_RANGE + 1
2 -> math.ceil(2 / 5) * 5 - 5 + 1 -> 1
8 -> math.ceil(8 / 5) * 5 - 5 + 1 -> 6
13 -> math.ceil(13 / 5) * 5 - 5 + 1 -> 11


*/

getArticles();

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

elMyPagination.addEventListener('click', function (e) {
  const el = e.target;
  if (el.classList.contains('my-page-link')) {
    currentPage = parseInt(el.innerText);
    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }

  if (el.classList.contains('my-page-link-prev')) {
    currentPage--;

    if (currentPage === START - 1) {
      END = START - 1;
      START = END - PAGE_RANGE + 1;
    }

    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }

  if (el.classList.contains('my-page-link-next')) {
    currentPage++;

    if (currentPage === END + 1) {
      START = currentPage;
      END = START + PAGE_RANGE - 1;
    }

    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }
});

function getArticles(page = 1) {
  API.get(`categories_news/${id}/articles?limit=5&page=${page}`).then((res) => {
    const data = res.data.data;
    const totalPages = res.data.meta.last_page;

    console.log(res.data);

    let html = '';
    data.forEach((item) => {
      const thumb = item.thumb;
      const title = item.title;
      const description = item.description;
      const pubDate = item.publish_date;
      const categoryName = item.category.name;

      elCategoryName.innerText = categoryName;
      elPageTitle.innerText = categoryName;

      html += /* html */ `
      <div class="echo-hero-baner">
        <div class="echo-inner-img-ct-1  img-transition-scale">
            <a href="post-details.html"><img src="${thumb}" alt="${title}"></a>
        </div>
        <div class="echo-banner-texting p-2">
            <h3 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html" class="title-hover">${title}</a></h3>
            <div class="echo-hero-area-titlepost-post-like-comment-share">
                <div class="echo-hero-area-like-read-comment-share">
                    <a href="#"><i class="fa-light fa-clock"></i> ${pubDate}</a>
                </div>
                <div class="echo-hero-area-like-read-comment-share">
                    <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                </div>
            </div>
            <hr>
            <p class="echo-hero-discription">${description}</p>
        </div>
      </div>`;
    });

    elArticles.innerHTML = html;
    renderPagination(totalPages);
    elPreloader.remove();
  });
}

function renderPagination(total) {
  const disabledPrev = currentPage === 1 ? 'disabled' : '';
  let html = /*html */ `
  <li class="page-item ${disabledPrev}">
    <a class="page-link my-page-link-prev" href="#">Previous</a>
  </li>`;

  if (END > total) END = total;

  for (let index = START; index <= END; index++) {
    const active = index === currentPage ? 'active' : '';
    html += /*html */ `
    <li class="page-item ${active}">
      <a class="page-link my-page-link" href="#">${index}</a>
    </li>`;
  }

  const disabledNext = currentPage === total ? 'disabled' : '';
  html += /*html */ `
  <li class="page-item ${disabledNext}">
    <a class="page-link my-page-link-next" href="#">Next</a>
  </li>`;
  elMyPagination.innerHTML = html;
}

function addOrUpdateUrlParameter(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(key, value);
  const newUrl = window.location.pathname + '?' + urlParams.toString();
  history.pushState(null, '', newUrl);
}
