import './style.scss';

class ResponseError extends Error {}

const locationForm = document.querySelector('.location-form');

// const queryInfo = (() => {
//   const units = ['imperial', 'metric'];
//   let currentUnitIndex = 0;
//   let currentUnit = units[currentUnitIndex];
//   const swapUnits = () => {
//     currentUnitIndex = (currentUnitIndex + 1) % units.length;
//     currentUnit = units[currentUnitIndex];
//     console.log(currentUnit);
//   };
//   const getCurrentUnit = () => currentUnit;
//   return { getCurrentUnit, swapUnits };
// })();

const queryInfo = (() => {
  let locationStr = '';
  const units = ['imperial', 'metric'];
  let currentUnitIndex = 0;
  let currentUnit = units[currentUnitIndex];
  const swapUnits = () => {
    currentUnitIndex = (currentUnitIndex + 1) % units.length;
    currentUnit = units[currentUnitIndex];
  };
  const getCurrentUnit = () => currentUnit;
  const setLocationStr = (str) => { locationStr = str; };
  const getLocationStr = () => locationStr;
  return {
    getCurrentUnit, swapUnits, setLocationStr, getLocationStr,
  };
})();

function grabInputStrFromForm(event) {
  const form = event.target;
  const searchInput = form.querySelector('.search-input');
  const str = searchInput.value;
  searchInput.value = '';
  return str;
}

function formatQueryStr(str) {
  const formattedStr = str.trim().replace(/\s+/, '+');
  return formattedStr;
}

function completeWeatherURL(location, unit) {
  const skeletonURL = 'https://api.openweathermap.org/data/2.5/weather?q=&appid=be56b9b3a4b4bc973591bee5c0716766';
  const formattedURL = `${skeletonURL.replace(/q=\w*(?=&)/, `q=${location}`)}&units=${unit}`;
  return formattedURL;
}

async function fetchData(url, errStr) {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) {
    throw new ResponseError(errStr);
  }
  const jsonData = await response.json();
  return jsonData;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const str = grabInputStrFromForm(event);
  queryInfo.setLocationStr(str);
  const location = queryInfo.getLocationStr();
  const formattedLoc = formatQueryStr(location);
  const url = completeWeatherURL(formattedLoc, queryInfo.getCurrentUnit());
  fetchData(url).then((json) => {
    handleData(json);
    console.log(json);
  }).catch(console.log);
}

locationForm.addEventListener('submit', handleFormSubmit);

function fillNodes(dataObj) {
  const container = document.querySelector('.weather-data-container');
  container.classList.remove('hide');
  const locationDisplay = document.querySelector('.location-name');
  const weatherDisplay = document.querySelector('.weather-description');
  const temperatureDisplay = document.querySelector('.temp-display');
  const dateDisplay = document.querySelector('.date-display');
  const timeDisplay = document.querySelector('.time-display');
  const humidityDisplay = document.querySelector('.humidity-display');
  const windSpeedDisplay = document.querySelector('.wind-speed-display');
  const hiLowTempDisplay = document.querySelector('.hi-low-temp');
  const feelsLikeTempDisplay = document.querySelector('.feels-like-temp');
  const unitToggleBtn = document.querySelector('.unit-toggle');

  locationDisplay.innerText = dataObj.name;
  weatherDisplay.innerText = dataObj.weatherDesc;
  temperatureDisplay.innerText = dataObj.temp;
  dateDisplay.innerText = dataObj.date;
  timeDisplay.innerText = dataObj.time;
  humidityDisplay.innerText = `${dataObj.humidity}%`;
  windSpeedDisplay.innerText = dataObj.windSpeed;
  hiLowTempDisplay.innerText = `${dataObj.lowTemp} | ${dataObj.hiTemp}`;
  feelsLikeTempDisplay.innerText = dataObj.feelsLikeTemp;
  if (queryInfo.getCurrentUnit() === 'imperial') {
    unitToggleBtn.innerText = 'Metric units';
  } else {
    unitToggleBtn.innerText = 'Imperial Units';
  }
}

function getInternationalTime(timezoneOffset) {
  const localDate = new Date();
  const dt = localDate.getTime();
  const localOffset = localDate.getTimezoneOffset() * 60000;
  const finalOffset = localOffset + (timezoneOffset * 1000);
  const finalDate = new Date(dt + finalOffset);
  return finalDate;
}

function formatDate(dateObj) {
  const options = {
    month: 'short', weekday: 'long', year: 'numeric', day: 'numeric',
  };
  return dateObj.toLocaleDateString(undefined, options);
}

function formatTime(dateObj) {
  const options = { timeStyle: 'short' };
  return dateObj.toLocaleTimeString(undefined, options);
}

function formatTemp(temp) {
  const unitSymbol = queryInfo.getCurrentUnit() === 'imperial' ? 'F' : 'C';
  return `${Math.round(Number(temp))} \u00B0${unitSymbol}`;
}

function formatWindSpeed(windSpeed) {
  let unit;
  let fWindSpeed;
  if (queryInfo.getCurrentUnit() === 'imperial') {
    fWindSpeed = Math.round(Number(windSpeed));
    unit = 'mph';
  } else {
    fWindSpeed = Math.round(Number(windSpeed) * 3.6);
    unit = 'km/h';
  }
  return `${fWindSpeed} ${unit}`;
}

function formatData(dataObj) {
  const dateObj = getInternationalTime(dataObj.timezone);
  const time = formatTime(dateObj);
  const date = formatDate(dateObj);
  const temp = formatTemp(dataObj.main.temp);
  const feelsLikeTemp = formatTemp(dataObj.main.feels_like);
  const hiTemp = formatTemp(dataObj.main.temp_max);
  const lowTemp = formatTemp(dataObj.main.temp_min);
  const windSpeed = formatWindSpeed(dataObj.wind.speed);

  const formattedData = {
    name: dataObj.name,
    weatherDesc: dataObj.weather[0].description,
    humidity: dataObj.main.humidity,
    temp,
    time,
    date,
    feelsLikeTemp,
    hiTemp,
    lowTemp,
    windSpeed,
  };
  return formattedData;
}

function handleData(data) {
  const formattedData = formatData(data);
  fillNodes(formattedData);
}
