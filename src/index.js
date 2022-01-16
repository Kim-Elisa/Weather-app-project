// get current date and time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMin = date.getMinutes();

  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  return `${currentDay} ${currentHour}:${currentMin}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// show 5 day forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row no-gutters" id="forecast-card">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
       <div class="card mb-2" style="max-width: 70%">
       <div class="row">
          <div class="col-md-6">
           <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            </div>
            <div class="col-md-6" id="forecast-detail">
            <div class="card-body">
              <div class="forecast-temperatures"> 
              <span id="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span id="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
              </div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
                  alt=""
                  width="42"
                   />
            </div>
          </div>
          </div>
          </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//get forecast using coordinates from API

function getForecast(coordinates) {
  let apiKey = "d1be4136ed4955ecd4ad578e1cdcae10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#todays-temp");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#current-date");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#today-weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// search city

function search(city) {
  let units = "metric";
  let apiKey = "d1be4136ed4955ecd4ad578e1cdcae10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  city.innerHTML = `${city}`;
}

// handle city search and submit

function handleCitySearch(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#search-text-input");
  search(citySearchInput.value);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", handleCitySearch);

// show temperature unit change

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// default city

search("Tokyo");

// current location button and geolocation API

function retrieveCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "d1be4136ed4955ecd4ad578e1cdcae10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function searchCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentPosition);
