'use strict';

// axios.get('https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=f62b1e4c6bc321e334b1eb243e7fded5')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//   });

const API_KEY = 'f62b1e4c6bc321e334b1eb243e7fded5';
const selectBox = document.querySelector('#select-box');
const locatioDisplay = document.querySelector('.location');
const tempratureDisplay = document.querySelector('.temperature > span');
const weatherDisplay = document.querySelector('.weather > img');
const feelsLikeDisplay = document.querySelector('.feelsLike > span');
const windDisplay = document.querySelector('.wind > span');
const forecastDisplay = document.querySelector('.forecast');

document.addEventListener('DOMContentLoaded', () => {
  transformInfo('seoul');
});
selectBox.addEventListener('change', (e) => {
  transformInfo(e.currentTarget.value);
});

const transformInfo = async (value) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`;
  const response = await axios.get(url);
  const {main, name, weather, wind} = response.data;

  locatioDisplay.textContent = name;
  tempratureDisplay.textContent = transformTemp(main.temp);
  feelsLikeDisplay.textContent = transformTemp(main.feels_like);
  windDisplay.textContent = wind.speed;
  weatherDisplay.setAttribute('src', transformIcon(weather[0].icon));
  console.log(response);
}

const transformTemp = (temp) => {
  return (temp - 273.15).toFixed(1);
}
const transformIcon = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`
}