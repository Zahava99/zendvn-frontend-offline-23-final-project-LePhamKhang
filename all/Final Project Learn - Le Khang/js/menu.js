//Render Menu
const elMainMenu = document.getElementById('mainMenu')

API.get('categories_news').then(response => {
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
    /* Html */ `
      <li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
          <ul class="echo-submenu list-unstyled menu-pages">
              ${htmlMenuDropdown}
          </ul>
      </li>`
      API.get('/auth/me')
      .then((resMe) => {
        //console.log('DATA',resMe.data.data)
        const name= resMe.data.data.name
        elMainMenu.innerHTML += 
            /* html */
            `<li class="dropdown">
            <a href="#">
              <span>${name}</span> <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul>
            <li><a href="profile.html">Thông tin tài khoản</a></li>
            <li><a href="change-password.html">Thay đổi mật khẩu</a></li>
            <li><a href="#" id="btnLogout">Đăng xuất</a></li>
            </ul>
          </li>`
      })
      .catch((err) => {
        elMainMenu.innerHTML +=
          /* html */
          `<li class="dropdown">
            <a href="#">
              <span>Tài khoản</span> <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul>
              <li><a href="login.html">Đăng nhập</a></li>
              <li><a href="register.html">Đăng ký</a></li>
            </ul>
          </li>`;
      });
})
