import img from './IMG_1025.jpeg';
import './style.css';

const api = process.env.API_KEY;

const button = document.querySelector('.button');

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

//Search by name
function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}
function getResults (query) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=it&appid=${api}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerHTML = weather.weather[0].description;

  let weather_icon = document.querySelector('.current .weather-icon');
  weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png">`;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}
function dateBuilder (d) {
  let months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  let days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì",
  "Sabato"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
//Geolocalizzazione

button.addEventListener('click', () => {
    getGeoResults()
});
function getGeoResults() {

    navigator.geolocation.getCurrentPosition(success, error);


    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + api + "&units=metric&lang=it"

        fetch(url)
        .then(geoweather => {
          return geoweather.json();
        }).then(displayGeoWeather);
    }

    }

    function error() {
    location.innerHTML = "Impossibile trovare la tua posizione";
}

function displayGeoWeather(geoweather) {
  let location = document.querySelector(".city");
  let temperature = document.querySelector(".temp");
  let weather = document.querySelector(".weather");
  let icon = document.querySelector(".weather-icon");
  let minmax = document.querySelector(".hi-low");

  location.innerHTML =  geoweather.name;
  temperature.innerHTML = `${Math.round(geoweather.main.temp)}<span>°C</span>`;
  weather.innerHTML = geoweather.weather[0].description;
  icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${geoweather.weather[0].icon}.png">`;
  minmax.innerText = `${Math.round(geoweather.main.temp_min)}°C / ${Math.round(geoweather.main.temp_max)}°C`;
}
