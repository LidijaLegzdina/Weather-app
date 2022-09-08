let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayTime = `${day} ${hours}:${minutes}`;
let currentDayTime = document.querySelector("#current-day-time");
currentDayTime.innerHTML = dayTime;

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
                
          <div class="col-2 col-sm tue fs-6">
                        <div class="weather-forecast-date">${formatDay(
                          forecastDay.dt
                        )}</div>
            <br/>
            <img class="fs-1" id="weather-forecast-icon" src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"/>
              <br />
              <br />
              <span class="weather-forecast-temp-max">
              ${Math.round(forecastDay.temp.max)}°
            </span>
            <span class="weather-forecast-temp-min">
              ${Math.round(forecastDay.temp.min)}°
            </span>
           `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0fbf741dd6f046088a411342ceb1813f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperatureRiga(response) {
  let temperatureDefault = document.querySelector("#current-temperature");
  let rigaTemperature = Math.round(response.data.main.temp);
  temperatureDefault.innerHTML = `${rigaTemperature} °C`;
  let iconElementRiga = document.querySelector("#current-weather-icon");
  iconElementRiga.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let feelsLikeRiga = Math.round(response.data.main.feels_like);
  let feelsLikeNowRiga = document.querySelector("#feels-like-now");
  feelsLikeNowRiga.innerHTML = `Feels like ${feelsLikeRiga}°C`;
  let descriptionRiga = response.data.weather[0].description;
  let descriptionNowRiga = document.querySelector("#description");
  descriptionNowRiga.innerHTML = descriptionRiga;
  let precipitationRiga = Math.round(response.data.main.humidity);
  let precipitationNowRiga = document.querySelector("#precipitation");
  precipitationNowRiga.innerHTML = `Precipitation ${precipitationRiga}%`;
  let windRiga = Math.round(response.data.wind.speed);
  let windNowRiga = document.querySelector("#wind");
  windNowRiga.innerHTML = `${windRiga} m/s`;

  getForecast(response.data.coord);
}

let apiKey = "0fbf741dd6f046088a411342ceb1813f";
let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=Riga&units=metric&appid=${apiKey}`;
axios.get(`${apiUrl1}&appid=${apiKey}`).then(showTemperatureRiga);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#current-temperature");
  tempNow.innerHTML = `${temperature}°C`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeNow = document.querySelector("#feels-like-now");
  feelsLikeNow.innerHTML = `Feels like ${feelsLike}°C`;
  let description = response.data.weather[0].description;
  let descriptionNow = document.querySelector("#description");
  descriptionNow.innerHTML = description;
  let precipitation = Math.round(response.data.main.humidity);
  let precipitationNow = document.querySelector("#precipitation");
  precipitationNow.innerHTML = `Precipitation ${precipitation}%`;
  let wind = Math.round(response.data.wind.speed);
  let windNow = document.querySelector("#wind");
  windNow.innerHTML = `${wind} m/s`;
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityInput.value}`;
  let apiKey = "0fbf741dd6f046088a411342ceb1813f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let formCity = document.querySelector("#change-city");
formCity.addEventListener("submit", searchCity);
