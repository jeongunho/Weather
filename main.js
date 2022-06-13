'use strict';

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => response.json())
//   .then(json => console.log(json))

// axios.get('https://jsonplaceholder.typicode.com/users?id=1')
//   .then(function (response) {
//     // handle success
//     console.log(response, 'success');
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error, 'error');
//   });

// axios.get('https://jsonplaceholder.typicode.com/users', {params: {id : 1}})
// .then(function (response) {
//   // handle success
//   console.log(response, 'success');
// })
// .catch(function (error) {
//   // handle error
//   console.log(error, 'error');
// });

const API_KEY = 'f62b1e4c6bc321e334b1eb243e7fded5';
const feelLikeDisplay = document.querySelector('.feel-like > span');
const windDisplay = document.querySelector('.wind > span');
const weatherDisplay = document.querySelector('.weather > img');
const locationDisplay = document.querySelector('.location');
const temperatureDisplay = document.querySelector('.temperature > span');
const weatherSelect = document.querySelector('#weather-select');
const info = document.querySelector('.info');

weatherSelect.addEventListener('change', (e) => {
  getWeather(e.currentTarget.value);
})

const getWeather = async (city='seoul') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await axios.get(url);
  const { name, main, weather, wind } = response.data;

  locationDisplay.textContent = name;
  temperatureDisplay.textContent = transferTemp(main.temp);
  weatherDisplay.setAttribute('src', transferIcon(weather[0].icon));
  feelLikeDisplay.textContent = transferTemp(main.feels_like);
  windDisplay.textContent = wind.speed;
};

const transferTemp = (temp) => {
  return (temp - 273.15).toFixed(1);
}
const transferIcon = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`
}