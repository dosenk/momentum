const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.weather-humidity');
const speed = document.querySelector('.weather-speed');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const weatherWrapper = document.querySelector('.wrapper');

async function getWeather() {
// console.log(localStorage.removeItem('city'));
// storage.clear();

  if (localStorage.getItem('city') === null) {
    city.textContent = 'Minsk';
    localStorage.setItem('city', city.textContent);
  } else {
    city.textContent = localStorage.getItem('city');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
    // alert(data.message)
    // let city = localStorage.getItem('city')
    // console.log(localStorage.getItem('city'));
    displayError(data.message);
    localStorage.setItem('city', localStorage.getItem('oldCity'));
    getWeather();
    return;
  }

  // console.log(data.cod);

  weatherIcon.className = 'weather-icon owf';

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
  speed.textContent = `Wind speed: ${data.wind.speed} m/s`;
}

function displayError(msg) {
  weatherError.style = '';
  weatherWrapper.innerHTML += `<span id=msg>${msg[0].toUpperCase() + msg.slice(1)}</span>`;
}

function setCity(event) {
  if (event.which === 13 || event.keyCode === 13) {
    if (city.textContent === '') city.textContent = localStorage.getItem('city');
    else {
      changeLocalst(city.textContent);
      getWeather();
      //
    }

    city.blur();
  }
}

function changeLocalst(city) {
  localStorage.setItem('oldCity', localStorage.getItem('city'));
  localStorage.setItem('city', city);
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('mousedown', () => {
  console.log(city.clientWidth);
  // city.style = `width: ${city.clientWidth}px`;
  setTimeout(() => {
    city.textContent = '';
  }, 100);
});
city.addEventListener('blur', () => {
  city.textContent = localStorage.getItem('city');
  city.style = '';
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.close-btn') || e.target.classList.contains('weather-error')) {
    weatherError.style.display = 'none';
    weatherWrapper.children[1].remove();
  }
});
