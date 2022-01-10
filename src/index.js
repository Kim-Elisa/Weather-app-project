function showTemperature(response) {
  let temperatureElement = document.querySelector("#todays-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#today-weather-description");
  let iconElement = document.querySelector("#today-weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// search city

function search(city) {
  let units = "metric";
  let apiKey = "d1be4136ed4955ecd4ad578e1cdcae10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  city.innerHTML = `${cityName}`;
}

// handle city search and submit

function handleCitySearch(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#search-text-input");
  search(citySearchInput.value);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", handleCitySearch);

search("Japan");

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

// get current date and time

function formatDate(date) {
  let now = new Date();
  let headingDayTime = document.querySelector("#today-weather");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = days[now.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[now.getMonth()];
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  let formattedDateTime = `${currentDay} ${currentDate} ${currentMonth} ${currentHour}:${currentMin}`;
  headingDayTime.innerHTML = `${formattedDateTime}`;

  return formattedDateTime;
}

// temperature unit change function (from week 4 homework)

//function changeUnit(event) {
//event.preventDefault();
//let temp = document.querySelector("#todays-temp");
//if (unit.innerHTML === "°F") {
//  temp.innerHTML = "66°F";
//  unit.innerHTML = "°C";
//} else {
//  temp.innerHTML = "19°C";
//  unit.innerHTML = "°F";
//  }
//}

//let unit = document.querySelector("#temp-units");

//unit.addEventListener("click", changeUnit);

//removed from showCityWeather function
//let cityName = response.data.name;
//let cityTemp = Math.round(response.data.main.temp);
//let searchInput = document.querySelector("#search-text-input");
//searchInput.value = cityName;
