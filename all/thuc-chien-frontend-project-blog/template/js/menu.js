//Render Menu
const elMainMenu = document.getElementById('mainMenu')

// /* Html */ //
API.get('categories_news').then(response => {
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
    /* Html */
    `<li class="dropdown">
            <a href="#">
               <span>Danh mục khác</span> 
               <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul>${htmlMenuOther}</ul>
        </li>`
})
