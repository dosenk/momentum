const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.weather-humidity');
const speed = document.querySelector('.weather-speed');
const city = document.querySelector('.city');

async function getWeather() {
// console.log(localStorage.removeItem('city'));
// storage.clear();
  city.textContent = localStorage.getItem('city') === null ? 'Минск' : localStorage.getItem('city')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  weatherIcon.className = 'weather-icon owf';
  
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity
  speed.textContent = data.wind.speed
}

function setCity(event) {
  if (event.which == 13 || event.keyCode == 13) {
    if (city.textContent === '') city.textContent = localStorage.getItem('city')
    else {
       changeLocalst(city.textContent)
    getWeather(); 
    }
    
    city.blur();
  }
}

function changeLocalst(city) {
    localStorage.setItem('city', city)
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('mousedown', () => {
    city.textContent = ''
});
city.addEventListener('blur', () => {
    city.textContent = localStorage.getItem('city')
});