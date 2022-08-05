import './style.scss';
import stateManager from './dataStateManager';
import {
  formatDate, formatTemp, formatTime, formatWindSpeed, formatWeatherCond, formatIconURL,
} from './dataFormatHelperFns';
import completeGifURL from './gifURL';
import completeWeatherURL from './weatherURL';
import getInternationalTime from './getTime';
import formatQueryStr from './urlStrFormat';
import fillNodes from './fillNodes';
import createGifQuery from './createGifQuery';
import { handleLoadScreenAnimation, showLoadingScreen, hideLoadingScreen } from './loadScreenHandler';

class ResponseError extends Error {}

const locationForm = document.querySelector('.location-form');
const loadAnimationHandler = handleLoadScreenAnimation();
const queryInfo = stateManager();

async function fetchData(url, errStr) {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) {
    throw new ResponseError(errStr);
  }
  const jsonData = await response.json();
  return jsonData;
}

function handleError(err) {
  if (err instanceof ResponseError) {
    const errorText = document.querySelector('.search-error-text');
    errorText.innerText = err.message;
  } else throw new Error(err);
}

function createGifImg(src) {
  const img = document.querySelector('.weather-gif') || document.createElement('img');
  img.classList.add('weather-gif');
  img.alt = 'Weather Visualization';
  img.src = src;
  const imgContainer = document.querySelector('.gif-container');
  imgContainer.append(img);
}

function handleGifURL(weatherDesc, temp, windSpeed, unitType) {
  const gifQuery = createGifQuery(weatherDesc, temp, windSpeed, unitType);
  const searchTerm = formatQueryStr(gifQuery);
  const urlStr = completeGifURL(searchTerm);
  return urlStr;
}

async function handleGifFetch(data) {
  const weatherDesc = data.weather[0].description;
  const { temp } = data.main;
  const windSpeed = data.wind.speed;
  const unitType = queryInfo.getCurrentUnit();
  const urlStr = handleGifURL(weatherDesc, temp, windSpeed, unitType);
  const gifData = await fetchData(urlStr, 'Failed to fetch gif');
  const { url } = gifData.data.images.original;
  createGifImg(url);
}

function grabInputStrFromForm(event) {
  const form = event.target;
  const searchInput = form.querySelector('.search-input');
  const str = searchInput.value;
  searchInput.value = '';
  return str;
}

function formatData(dataObj) {
  const dateObj = getInternationalTime(dataObj.timezone);
  const weatherDesc = formatWeatherCond(dataObj.weather[0].description);
  const time = formatTime(dateObj);
  const date = formatDate(dateObj);
  const temp = formatTemp(dataObj.main.temp, queryInfo.getCurrentUnit());
  const feelsLikeTemp = formatTemp(dataObj.main.feels_like, queryInfo.getCurrentUnit());
  const hiTemp = formatTemp(dataObj.main.temp_max, queryInfo.getCurrentUnit());
  const lowTemp = formatTemp(dataObj.main.temp_min, queryInfo.getCurrentUnit());
  const windSpeed = formatWindSpeed(dataObj.wind.speed, queryInfo.getCurrentUnit());
  const iconId = formatIconURL(dataObj.weather[0].icon);

  const formattedData = {
    name: dataObj.name,
    humidity: dataObj.main.humidity,
    weatherDesc,
    iconId,
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
  fillNodes(formattedData, queryInfo.getCurrentUnit());
}

function startLoadingScreen() {
  showLoadingScreen();
  loadAnimationHandler.startAnimation();
}

function stopLoadingScreen() {
  hideLoadingScreen();
  loadAnimationHandler.stopAnimation();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const location = grabInputStrFromForm(event);
  const formattedLoc = formatQueryStr(location);
  queryInfo.setLocationStr(formattedLoc);
  const url = completeWeatherURL(formattedLoc, queryInfo.getCurrentUnit());
  startLoadingScreen();
  fetchData(url, 'Invalid location entered').then((json) => {
    stopLoadingScreen();
    handleData(json);
    return json;
  }).then(handleGifFetch)
    .catch((err) => {
      handleError(err);
      stopLoadingScreen();
    });
}

function handleBtnClick() {
  queryInfo.swapUnits();
  const unitType = queryInfo.getCurrentUnit();
  const location = queryInfo.getLocationStr();
  const url = completeWeatherURL(location, unitType);
  startLoadingScreen();
  fetchData(url, 'Failed to fetch gif').then((json) => {
    stopLoadingScreen();
    handleData(json);
  })
    .catch(handleError);
}

locationForm.addEventListener('submit', handleFormSubmit);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('unit-toggle')) {
    handleBtnClick();
  }
});
