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
const ACCESS_TOKEN = 'ACCESS_TOKEN';
const Token = localStorage.getItem('ACCESS_TOKEN')
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
const elSearchInput1 = document.getElementById('searchInput1')
elSearchInput1.addEventListener('keyup',function(e){
    if (e.key=='Enter') {
        const keyWorld = elSearchInput1.value.trim()
        if (keyWorld) {
            window.location.href = `search.html?keyword=${keyWorld}`
        } else {
                alert('Nhap tu khoa can tim')
                elSearchInput1.value=''
        }
    }
})
//weather
const elCityName = document.getElementById('cityName')
const elTemperature = document.getElementById('temperature')
const elTemperatureWeather = document.getElementById('temperatureWeather')
const elUvIndex = document.getElementById('uvIndex')
const elWindSpeed = document.getElementById('windSpeed')
const elHumidity = document.getElementById('humidity')
const elUvHealthConcern = document.getElementById('uvHealthConcern')
const elWeatherIcon = document.getElementById('weatherIcon')
//DisplayForecastWeather
//'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast'
const response = API.call()
  .get(
    'https://api.tomorrow.io/v4/weather/forecast?location=10.7765713,106.7012093&apikey=M5IcWm8DTs0hVpOV7lN702rn8PqC1oxr'
  )
  .then(response => {
    const weatherData = response.data
    console.log('af', weatherData)
    //const dailyWeatherData = response.data.timelines.daily
    //console.log('123',dailyWeatherData)
    //const dailyTemperature = weatherData.timelines.hourly.temperature
    const dailyTemperature = Math.ceil(
      weatherData.timelines.hourly[0].values.temperature
    )
    console.log(dailyTemperature)
    //const numericTemperature = Number(dailyTemperature)
    // Update the UI with the fetched data
    //document.getElementById('cityName').textContent = weatherData.city;
    //elCurrentTime.innerText = weatherData.timelines.hourly[0].time;
    elTemperature.innerHTML = dailyTemperature + '°C'
    elTemperatureWeather.innerHTML = dailyTemperature + '°C'
    console.log('CC', elTemperature)
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

    const getWeatherIconNames =
      weatherData.timelines.hourly[0].values.weatherCode
    console.log('11', getWeatherIconNames)
    const weatherIconName = getWeatherIconName(getWeatherIconNames)
    elWeatherIcon.src = `C:\\Users\\MSI\\Desktop\\Final Project\\Final Project Real\\Project-LePhamKhang\\my-img\\weather icon\\${weatherIconName}`
  })
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
function Toast(popup){
  Toastify({
    text: popup,
    duration: 2000,
    close: true
    }).showToast();
}