
function searchInput(response) {
    console.log(response.data);
  let apiKey = "3867ba5bddd3dc3e708c90982a1135dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayWeatherInfo);
  }
  
  searchInput("Paris");



