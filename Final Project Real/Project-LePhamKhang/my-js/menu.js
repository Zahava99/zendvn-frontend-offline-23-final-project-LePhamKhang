const elMainMenu = document.getElementById('mainMenu')
const elMobileMenuActive = document.getElementById('mobile-menu-active')
const elFooterMostPopular = document.getElementById('FooterMostPopular')
API.call().get('/categories_news').then(response => {
  const categories = response.data.data
  let htmlMenu = ''
  let htmlMenuDropdown = ''
  let htmlMenuMobile = ''
  let htmlMenuMobileDropDown= ''
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
    /* Html*/ `
      <li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
          <ul class="echo-submenu list-unstyled menu-pages">
              ${htmlMenuDropdown}
          </ul>
      </li>`
  const Token = localStorage.getItem('ACCESS_TOKEN')
  API.callWithToken().get('/auth/me')
    .then(response => {
      elMainMenu.innerHTML +=
        /*html*/
        `<li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">${response.data.data.name}</a>
          <ul class="echo-submenu list-unstyled menu-pages">
              <li class="menu-item"><a href="profile.html" class="echo-main-element">Thông tin tài khoản</a></li>
              <li class="menu-item"><a href="changePassword.html" class="echo-main-element">Thay đổi mật khẩu</a></li>
              <li class="menu-item"><a href="AdminArticleCreate.html" class="echo-main-element">Tạo bài viết</a></li>
              <li class="menu-item"><a href="AdminArticleManagement.html" class="echo-main-element">Quản lý bài viết</a></li>
              <li class="menu-item"><a href="#" class="echo-main-element"id="btnLogout">Đăng xuất</a></li>
          </ul>
      </li>`
    })
    .catch(err => {
      elMainMenu.innerHTML +=
        /*html*/
        `<li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">Tài khoản</a>
          <ul class="echo-submenu list-unstyled menu-pages">
              <li class="menu-item"><a href="login.html" class="echo-main-element">Đăng nhập</a></li>
              <li class="menu-item"><a href="register.html" class="echo-main-element">Đăng ký</a></li>
          </ul>
      </li>`
    })
})
elMainMenu.addEventListener('click', function (e) {
  const el = e.target;

  if (el.id === 'btnLogout') {
    e.preventDefault();
    localStorage.removeItem('ACCESS_TOKEN');
    window.location.href = 'index.html';
  }
});
API.call().get('/categories_news').then(response => {
  const categories = response.data.data;
  let htmlMobileMenu = '';
  let htmlMobileMenuDropdown = '';
  //let elMobileMenuActive = document.getElementById('mobile-menu-active'); // Thay 'yourMainMenuId' bằng ID thực tế của menu chính

  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMobileMenu += `
          <li class="menu-item">
          <a href="category.html?id=${item.id}" class="main mobile-menu-link">${item.name}</a></li>`;
    } else {
      htmlMobileMenuDropdown += `
          <li>
          <a href="category.html?id=${item.id}" class="mobile-menu-link">${item.name}</a></li>`;
    }
  });

  elMobileMenuActive.innerHTML =
  htmlMobileMenu +
    /* Html*/ `
      <li class="has-dropdown">
          <a href="#" class="main" aria-expanded="false">Danh mục khác</a>
          <ul class="submenu mm-collapse">
              ${htmlMobileMenuDropdown}
          </ul>
      </li>`;
      
  // ... (các phần khác của mã JavaScript)

  // Thêm xử lý sự kiện click vào menu
  let dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener('click', function() {
      console.log('click')
      this.classList.toggle('mm-active');
      let expanded = this.querySelector('.main').getAttribute('aria-expanded') === 'true';
      this.querySelector('.main').setAttribute('aria-expanded', !expanded);
      let submenu = this.querySelector('.submenu');
      if (submenu) { 
        submenu.classList.toggle('mm-collapsing');
        setTimeout(() => {
          submenu.classList.toggle('mm-collapsing');
          submenu.classList.toggle('mm-show');
        }, 50);
      }
    });
  });
  //ASD
  //
}).catch(error => {
  console.error('Error fetching categories:', error);
});
//
API.call().get('/categories_news/featured?limit=10').then(response => {
  const categories = response.data.data
  let htmlFooterMostPopular = ''
  categories.forEach((item, index) => {
    if (index < 10) {
      htmlFooterMostPopular += `
          <li>
          <a href="category.html?id=${item.id}">${item.name}</a></li>`
    }
  })
  elFooterMostPopular.innerHTML = htmlFooterMostPopular 
})
const userMenu = document.getElementById('user-menu');
API.callWithToken().get('/auth/me')
  .then(response => {
    userMenu.innerHTML +=
      /*html*/
      `<li class="has-dropdown userinfo">
        <a href="#" class="main">${response.data.data.name}</a>
        <ul class="submenu mm-collapse">
            <li><a href="profile.html" class="mobile-menu-link">Thông tin tài khoản</a></li>
            <li><a href="changePassword.html" class="mobile-menu-link">Thay đổi mật khẩu</a></li>
            <li><a href="AdminArticleCreate.html" class="mobile-menu-link">Tạo bài viết</a></li>
            <li><a href="AdminArticleManagement.html" class="mobile-menu-link">Quản lý bài viết</a></li>
            <li><a href="#" class="mobile-menu-link"id="btnLogout">Đăng xuất</a></li>
        </ul>
    </li>`
    let dropdowns = document.querySelectorAll('.userinfo');
    dropdowns.forEach(function(dropdown) {
      dropdown.addEventListener('click', function() {
        console.log('click')
        this.classList.toggle('mm-active');
        let expanded = this.querySelector('.main').getAttribute('aria-expanded') === 'true';
        this.querySelector('.main').setAttribute('aria-expanded', !expanded);
        let submenu = this.querySelector('.submenu');
        if (submenu) { 
          submenu.classList.toggle('mm-collapsing');
          setTimeout(() => {
            submenu.classList.toggle('mm-collapsing');
            submenu.classList.toggle('mm-show');
          }, 50);
        }
      });
    });
  })
  .catch(err => {
    userMenu.innerHTML +=
      /*html*/
      `<li class="has-dropdown">
        <a href="#" class="main">Tài khoản</a>
        <ul class="submenu mm-collapse">
            <li><a href="login copy.html" class="mobile-menu-link">Đăng nhập</a></li>
            <li><a href="register.html" class="mobile-menu-link">Đăng ký</a></li>
        </ul>
    </li>`
    let dropdowns = document.querySelectorAll('.userinfo');
    dropdowns.forEach(function(dropdown) {
      dropdown.addEventListener('click', function() {
        console.log('click')
        this.classList.toggle('mm-active');
        let expanded = this.querySelector('.main').getAttribute('aria-expanded') === 'true';
        this.querySelector('.main').setAttribute('aria-expanded', !expanded);
        let submenu = this.querySelector('.submenu');
        if (submenu) { 
          submenu.classList.toggle('mm-collapsing');
          setTimeout(() => {
            submenu.classList.toggle('mm-collapsing');
            submenu.classList.toggle('mm-show');
          }, 50);
        }
      });
    });
  })
  userMenu.addEventListener('click', function (e) {
    const el = e.target;
    console.log('click');
    if (el.id === 'btnLogout') {
      e.preventDefault();
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.href = 'index copy.html';
    }
  });