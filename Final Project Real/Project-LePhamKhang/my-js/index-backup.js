const elarticleNewsLarges = document.getElementById('articleNewsLarges')
const elTopStoryFirst = document.getElementById('TopStoryFirst')
const elTopStory = document.getElementById('TopStory')
const ellatestNews = document.getElementById('LatestNews')
const elTrendingLeft = document.getElementById('trendingLeft')
const elTrendingRight = document.getElementById('trendingRight')
const elPopularArticle = document.getElementById('PopularArticle')
const elDiscoverCategories = document.getElementById('DiscoverCategories')
//weather
const elCityName = document.getElementById('cityName')
const elTemperature = document.getElementById('temperature')
const elUvIndex = document.getElementById('uvIndex')
const elWindSpeed = document.getElementById('windSpeed')
const elHumidity = document.getElementById('humidity')
const elUvHealthConcern = document.getElementById('uvHealthConcern')
const elWeatherIcon = document.getElementById('weatherIcon')
//DisplayLargesNewArticles
API.get('articles/popular?limit=1').then(response => {
  const articles = response.data.data
  //console.log('Test01',articles)
  articles.forEach(arti => {
    elarticleNewsLarges.innerHTML = DisplayNewsArticleLarges(arti)
  })
})
//DisplayTopStories
API.get('articles?limit=4').then(response => {
  const topStories = response.data.data
  let htmlDisplayTopStoryFirst = ''
  let htmlDisplayTopStories = ''
  topStories.forEach((topStory, index) => {
    if (index === 0) {
      htmlDisplayTopStoryFirst += DisplayTopStoryFirst(topStory)
    } else {
      htmlDisplayTopStories += DisplayTopStories(topStory)
    }
  })
  elTopStoryFirst.innerHTML = htmlDisplayTopStoryFirst
  elTopStory.innerHTML = htmlDisplayTopStories
})
//DisplayLatestNews
API.get('articles/popular?limit=8').then(response => {
  const articleLatestNews = response.data.data
  let html = ''
  articleLatestNews.forEach(articleLatestNews => {
    html += DisplayLatestNews(articleLatestNews)
  })
  ellatestNews.innerHTML = html
})
//DisplayTrending
API.get('/articles/popular?limit=6').then(response => {
  const articleTrending = response.data.data
  let htmlArticlesTrendingLeft = ''
  let htmlArticlesTrendingRight = ''
  articleTrending.forEach((articleTrending, index) => {
    if (index < 4) {
      htmlArticlesTrendingLeft += DisplayTrendingLeft(articleTrending)
    } else {
      htmlArticlesTrendingRight += DisplayTrendingRight(articleTrending)
    }
  })
  elTrendingLeft.innerHTML = htmlArticlesTrendingLeft
  elTrendingRight.innerHTML = htmlArticlesTrendingRight
})
//DisplayPopular
API.get('/articles/popular?limit=3').then(response => {
  const articlesDisplayPopular = response.data.data
  let html = ''
  articlesDisplayPopular.forEach(articleDisplayPopular => {
    html += DisplayPopular(articleDisplayPopular)
  })
  elPopularArticle.innerHTML = html
})
//'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast'
const response = API.get(
  'https://api.tomorrow.io/v4/weather/forecast?location=10.7765713,106.7012093&apikey=M5IcWm8DTs0hVpOV7lN702rn8PqC1oxr'
).then(response => {
  const weatherData = response.data
  console.log('af', weatherData)
  //const dailyWeatherData = response.data.timelines.daily
  //console.log('123',dailyWeatherData)
  //const dailyTemperature = weatherData.timelines.hourly.temperature
  const dailyTemperature = Math.ceil(
    weatherData.timelines.hourly[0].values.temperature
  )
  //console.log(dailyTemperature)
  //const numericTemperature = Number(dailyTemperature)
  // Update the UI with the fetched data
  //document.getElementById('cityName').textContent = weatherData.city;
  //elCurrentTime.innerText = weatherData.timelines.hourly[0].time;
  elTemperature.innerText = dailyTemperature + '°C'
  //console.log('123',dailyTemperature)
  const uvIndex = weatherData.timelines.hourly[0].values.uvIndex
  const uvIndexCategory = getUvIndexCategory(uvIndex)
  elUvIndex.innerText = 'Cường độ tia UV:  ' + uvIndexCategory
  console.log('UV', elUvIndex)
  elWindSpeed.innerText =
    weatherData.timelines.hourly[0].values.windSpeed + ' km/h'
  elHumidity.innerText = weatherData.timelines.hourly[0].values.humidity + '%'
  elUvHealthConcern.innerText =
    weatherData.timelines.hourly[0].values.uvHealthConcern

  const getWeatherIconNames = weatherData.timelines.hourly[0].values.weatherCode
  console.log('11', getWeatherIconNames)
  const weatherIconName = getWeatherIconName(getWeatherIconNames)
  elWeatherIcon.src = `C:\\Users\\MSI\\Desktop\\Final Project\\Final Project Real\\Project\\my-img\\weather icon\\${weatherIconName}`
})
//Display Cate
API.get('categories_news/articles?limit_cate=3&limit=3').then(response => {
  const category = response.data.data
  console.log('afaf', category)
  let html = ''
  category.forEach(displayCategory => {
    const articlesCategories = displayCategory.articles
    let htmlArticlesCategory = ''
    articlesCategories.forEach(ArticlesCategories => {
      htmlArticlesCategory += DisplayArticlesCategory(ArticlesCategories)
    })
    html += /*html*/ `
        <div class="col-xl-4 col-lg-4 col-md-6 d-flex">
        <div class="echo-de-category-content echo-responsive-wd">
        <h5 class="text-capitalize">${displayCategory.name}</h5>
        ${htmlArticlesCategory}
        <hr />
        <div class="echo-de-category-show-more-btn">
        <a
          href="post-details.html"
          class="text-capitalize echo-py-btn"
          >Show more</a
        >
      </div>
    </div>
    </div>`
  })
  elDiscoverCategories.innerHTML = html
})
//Show More Button
elDiscoverCategories.addEventListener('click', function (e) {
  const el = e.target
  e.preventDefault()
  el.classList.contains('echo-py-btn')
  //console.log('clickKHang')
  
  /*if (e.target.classList.contains('echo-py-btn')) {
    e.preventDefault();

    // Add your logic to load more articles here, for example:
    // You might want to make another API call to fetch more articles
    // and append them to the existing ones.

    // For demonstration purposes, let's just log a message
    console.log('Load more articles...');
  }*/
});
//Function Area
function DisplayNewsArticleLarges (articleNewLarges) {
  const publishDate = dayjs(articleNewLarges.publish_date).fromNow()
  return /*html*/ `
  <div class="echo-hero-baner">
      <div class="echo-hero-banner-main-img  img-transition-scale">
          <a href="post-details.html?id=${articleNewLarges.id}"><img class="banner-image-one img-hover" src="${articleNewLarges.thumb}" alt="${articleNewLarges.title}"></a>
      </div>
      <h1 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html${articleNewLarges.id}" class="title-hover">${articleNewLarges.title}</a></h1>
      <hr>
      <p class="echo-hero-discription">${articleNewLarges.description}</p>
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
  </div>`
}
function DisplayTopStoryFirst (articleStoryFirst) {
  return /* html */ `
    <div class="echo-top-story first">
    <div class="echo-story-picture img-transition-scale">
        <a href="post-details.html?id=${articleStoryFirst.id}"><img src="${articleStoryFirst.thumb}" alt="${articleStoryFirst.title}" class="img-hover"></a>
    </div>
    <div class="echo-story-text">
        <h4><a href="#" class="title-hover">${articleStoryFirst.title}</a></h4>
        <div class="echo-trending-post-bottom-icons">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
    </div>
</div>`
}
function DisplayTopStories (articleStory) {
  return /*html*/ `
    <div class="echo-top-story">
    <div class="echo-story-picture img-transition-scale">
        <a href="post-details.html?id=${articleStory.id}"><img src="${articleStory.thumb}" alt="${articleStory.title}" class="img-hover"></a>
    </div>
    <div class="echo-story-text">
        <h4><a href="#" class="title-hover">${articleStory.title}</a></h4>
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
    </div>
</div>`
}
function DisplayLatestNews (articleLatestNews) {
  return /* html */ `
    <div class="swiper-slide">
    <div class="echo-latest-news-main-content h-100 ">
    <div class="echo-latest-news-img img-transition-scale" >
        <a href="post-details.html?id=${articleLatestNews.id}">
            <img src="${articleLatestNews.thumb}" alt="${articleLatestNews.title}" class="img-hovers custom-img" >
        </a>
    </div>
    <div class="echo-latest-news-single-title h-100">
        <h5><a href="post-details.html?id=${articleLatestNews.id}" class="text-capitalize title-hover">${articleLatestNews.title}</a></h5>
    </div>
    <div class="echo-latest-news-time-views">
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
        <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
    </div>
</div>
</div>`
}
function DisplayTrendingLeft (articlesTrendingLeft) {
  return /* html */ `
    <div class="echo-trending-left-site-post">
    <div class="echo-trending-left-site-post-img img-transition-scale">
        <a href="post-details.html?id=${articlesTrendingLeft.id}">
            <img src="${articlesTrendingLeft.thumb}" alt="${articlesTrendingLeft.title}" class="img-hover">
        </a>
    </div>
    <div class="echo-trending-right-site-post-title">
        <h5><a href="post-details.html" class="text-capitalize title-hover">${articlesTrendingLeft.title}</a></h5>
        <div class="echo-trending-post-bottom-icons">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
    </div>
</div>`
}
function DisplayTrendingRight (articlesTrendingRight) {
  return /* html */ `
    <div class="echo-trending-right-site-post">
    <div class="echo-trending-right-site-post-img img-transition-scale">
        <a href="post-details.html?id=${articlesTrendingRight.id}">
            <img src="${articlesTrendingRight.thumb}" alt="${articlesTrendingRight.title}" class="img-hover">
        </a>
    </div>
    <div class="echo-trending-right-site-post-title">
        <h4 class="text-capitalize"><a href="post-details.html" class="title-hover">${articlesTrendingRight.title}</a></h4>
    </div>
    <div class="echo-trending-right-site-like-comment-share-icons">
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-comment-dots"></i> 05
                Comment</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-arrow-up-from-bracket"></i>
                1.5k Share</a>
        </div>
    </div>
</div>`
}
function DisplayPopular (articlePopular) {
  return /* html */ `
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="echo-popular-area-single-item">
    <div class="echo-popular-area-img img-transition-scale">
        <a href="post-details.html?id=${articlePopular.id}"><img src="${articlePopular.thumb}" alt="${articlePopular.title}" class="img-hover"></a>
    </div>
    <div class="echo-popular-area-item-title">
        <h5 class="text-center text-capitalize"><a href="post-details.html?id=${articlePopular.id}" class="title-hover">${articlePopular.title}</a></h5>
    </div>
    <div class="echo-popular-area-read-view text-center">
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
        <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
    </div>
</div>
</div>`
}
function DisplayArticlesCategory (articlesCategories) {
  return /*html*/ `
    <div class="echo-de-category-content-img-title">
    <div
      class="echo-de-category-content-img img-transition-scale"
    >
      <a href="post-details.html">
        <img
          src="${articlesCategories.thumb}"
          alt="${articlesCategories.title}"
          class="img-hover"
        />
      </a>
    </div>
    <div class="echo-de-category-content-title">
      <h6>
        <a href="post-details.html" class="title-hover"
          >${articlesCategories.title}</a
        >
      </h6>
      <div class="echo-de-category-read">
        <a href="#" class="pe-none"
          ><i class="fa-light fa-clock"></i> 06 minute read</a
        >
      </div>
    </div>
  </div>`
}
function getWeatherIconName (weatherCode) {
  if (weatherCode === 1000 || weatherCode === 10000 || weatherCode === 10001) {
    return '10000_clear_large.png'
  } else if (
    weatherCode === 1100 ||
    weatherCode === 11000 ||
    weatherCode === 11001
  ) {
    return '11000_mostly_clear_large.png'
  } else if (
    weatherCode === 1101 ||
    weatherCode === 11010 ||
    weatherCode === 11011
  ) {
    return '11010_partly_cloudy_large.png'
  } else if (
    weatherCode === 1102 ||
    weatherCode === 11020 ||
    weatherCode === 11021
  ) {
    return '11020_mostly_cloudy_large.png'
  } else if (
    weatherCode === 1001 ||
    weatherCode === 10010 ||
    weatherCode === 10011
  ) {
    return '10010_cloudy_large.png'
  } else {
    return '10000_clear_large.png' // Default icon for unknown weather codes
  }
}
function getUvIndexCategory (uvIndex) {
  if (uvIndex >= 0 && uvIndex <= 2) {
    return 'Low'
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return uvIndex + ' Moderate'
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return 'High'
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return 'Very High'
  } else {
    return 'Extreme'
  }
}
