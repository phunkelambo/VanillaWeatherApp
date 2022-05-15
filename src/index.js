let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


let hours = now.getHours();
let ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = days[now.getDay()];
let dates = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${month} ${dates}, ${year}`;

let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes} ${ampm}`;


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = "3867ba5bdd3dc3e708c90982a1135dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayTemperature (response) {
    document.querySelector(`#cityName`).innerHTML = response.data.name;
    document.querySelector(`#temperature`).innerHTML = Math.round(response.data.main.temp);
    document.querySelector(`#wind`).innerHTML = Math.round(response.data.wind.speed);
    document.querySelector(`#humidity`).innerHTML = Math.round(response.data.main.humidity);
    document.querySelector(`#description`).innerHTML = response.data.weather[0].description;
    
    
    celsius = response.data.main.temp;
    
    
    let iconElement = document.querySelector(`#icon`);

    iconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

  
function searchInput(city) {
  let apiKey = "3867ba5bdd3dc3e708c90982a1135dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
  
  function handleSubmit(event) {
    event.preventDefault();
  let cityElement = document.querySelector(`#cityName`);
  searchInput(cityElement.value);
  }

  let form = document.querySelector("#searchForm");
  form.addEventListener("sumbit", handleSubmit);

  searchInput("New York");
 



