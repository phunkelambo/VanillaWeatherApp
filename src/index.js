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



function getForecast(coordinates) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayWeatherInfo (response) {
  document.querySelector("h1.city").innerHTML = response.data.name;

    document.querySelector(`#cityName`).innerHTML = response.data.name;
    document.querySelector(`#temperature`).innerHTML = Math.round(response.data.main.temp);
    document.querySelector(`#wind`).innerHTML = Math.round(response.data.wind.speed);
    document.querySelector(`#humidity`).innerHTML = Math.round(response.data.main.humidity);
    document.querySelector(`#description`).innerHTML = response.data.weather[0].description;
   
   
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }

  
  function searchInput(city) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayWeatherInfo);
}
  

function searchInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName").value;
  searchInput(city);
}


function searchLocation(position) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

  

  function displaytempf(event) {
    event.preventDefault();
    let tempf = (tempC * 9) / 5 + 32;
    let tempElement = document.querySelector("#tempf");

    
    tempC.classList.remove("active");
    tempf.classList.add("active");
    tempf.innerHTML = Math.round(tempf);
  }

  function displayTempC(event) {
    event.preventDefault();
    tempC.classList.add("active");
    tempf.classList.remove("active");
    let tempElement = document.querySelector("temperature");
    tempElement.innerHTML = Math.round(temperature);
  }

  let tempC = null;

  let form = document.querySelector("#searchForm");
  form.addEventListener("sumbit", searchInfo);


  let fLink = document.querySelector("#tempf");
  fLink.addEventListener("click", displaytempf);
  
  let cLink = document.querySelector("#tempC");
  cLink.addEventListener("click", displayTempC);

  searchInput("NewYork");
  



