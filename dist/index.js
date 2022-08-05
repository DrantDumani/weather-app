"use strict";
(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["index"],{

/***/ "./src/createGifQuery.js":
/*!*******************************!*\
  !*** ./src/createGifQuery.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createGifQuery(weatherDesc, temp, windSpeed, unitType) {
  const searchTerms = [weatherDesc];
  let upperTempRange;
  let lowerTempRange;
  let upperWindRange;
  let lowerWindRange;

  if (unitType === 'imperial') {
    [lowerTempRange, upperTempRange] = [46, 78];
    [lowerWindRange, upperWindRange] = [20, 25];
  } else {
    [lowerTempRange, upperTempRange] = [8, 25];
    [lowerWindRange, upperWindRange] = [9, 11];
  }

  if (Number(temp) > upperTempRange) {
    searchTerms.push('hot');
  } else if (Number(temp) < lowerTempRange) {
    searchTerms.push('cold');
  }

  if (Number(windSpeed) > upperWindRange) {
    searchTerms.push('windy');
  } else if (Number(windSpeed) > lowerWindRange) {
    searchTerms.push('breezy');
  }

  const term = searchTerms[Math.floor(Math.random() * searchTerms.length)];
  return term;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGifQuery);

/***/ }),

/***/ "./src/dataFormatHelperFns.js":
/*!************************************!*\
  !*** ./src/dataFormatHelperFns.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "formatIconURL": () => (/* binding */ formatIconURL),
/* harmony export */   "formatTemp": () => (/* binding */ formatTemp),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "formatWeatherCond": () => (/* binding */ formatWeatherCond),
/* harmony export */   "formatWindSpeed": () => (/* binding */ formatWindSpeed)
/* harmony export */ });
function formatDate(dateObj) {
  const options = {
    month: 'short',
    weekday: 'long',
    year: 'numeric',
    day: 'numeric'
  };
  return dateObj.toLocaleDateString(undefined, options);
}

function formatTime(dateObj) {
  const options = {
    timeStyle: 'short'
  };
  return dateObj.toLocaleTimeString(undefined, options);
}

function formatTemp(temp, unitType) {
  const unitSymbol = unitType === 'imperial' ? 'F' : 'C';
  return "".concat(Math.round(Number(temp)), " \xB0").concat(unitSymbol);
}

function formatWindSpeed(windSpeed, unitType) {
  let unit;
  let fWindSpeed;

  if (unitType === 'imperial') {
    fWindSpeed = Number(windSpeed).toFixed(1).replace(/\.?0*$/, '');
    unit = 'mph';
  } else {
    fWindSpeed = (Number(windSpeed) * 3.6).toFixed(1).replace(/\.?0*$/, '');
    unit = 'km/h';
  }

  return "".concat(fWindSpeed, " ").concat(unit);
}

function formatWeatherCond(weatherDesc) {
  let capDesc = weatherDesc.replace(/\b\w/g, c => c.toUpperCase());
  return capDesc;
}

function formatIconURL(iconId) {
  const link = 'http://openweathermap.org/img/wn/10d@2x.png';
  const url = link.replace(/\d+d/, iconId);
  return url;
}



/***/ }),

/***/ "./src/dataStateManager.js":
/*!*********************************!*\
  !*** ./src/dataStateManager.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function stateManager() {
  let urlLocationStr = '';
  const units = ['imperial', 'metric'];
  let currentUnitIndex = 0;
  let currentUnit = units[currentUnitIndex];

  const swapUnits = () => {
    currentUnitIndex = (currentUnitIndex + 1) % units.length;
    currentUnit = units[currentUnitIndex];
  };

  const getCurrentUnit = () => currentUnit;

  const setLocationStr = str => {
    urlLocationStr = str;
  };

  const getLocationStr = () => urlLocationStr;

  return {
    getCurrentUnit,
    swapUnits,
    setLocationStr,
    getLocationStr
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stateManager);

/***/ }),

/***/ "./src/fillNodes.js":
/*!**************************!*\
  !*** ./src/fillNodes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function fillNodes(dataObj, unitType) {
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
  const errText = document.querySelector('.search-error-text');
  const weatherImg = document.querySelector('.weather-svg-icon');
  locationDisplay.innerText = dataObj.name;
  weatherDisplay.innerText = dataObj.weatherDesc;
  temperatureDisplay.innerText = dataObj.temp;
  dateDisplay.innerText = dataObj.date;
  timeDisplay.innerText = dataObj.time;
  humidityDisplay.innerText = "Humidity: ".concat(dataObj.humidity, "%");
  windSpeedDisplay.innerText = "Wind speed: ".concat(dataObj.windSpeed);
  hiLowTempDisplay.innerText = "Hi: ".concat(dataObj.lowTemp, " | Lo: ").concat(dataObj.hiTemp);
  feelsLikeTempDisplay.innerText = "Feels like: ".concat(dataObj.feelsLikeTemp);
  weatherImg.src = dataObj.iconId;
  weatherImg.classList.remove('hide');
  errText.innerText = '';

  if (unitType === 'imperial') {
    unitToggleBtn.innerText = 'Metric units';
  } else {
    unitToggleBtn.innerText = 'Imperial Units';
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fillNodes);

/***/ }),

/***/ "./src/getTime.js":
/*!************************!*\
  !*** ./src/getTime.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getInternationalTime(timezoneOffset) {
  const localDate = new Date();
  const dt = localDate.getTime();
  const localOffset = localDate.getTimezoneOffset() * 60000;
  const finalOffset = localOffset + timezoneOffset * 1000;
  const finalDate = new Date(dt + finalOffset);
  return finalDate;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getInternationalTime);

/***/ }),

/***/ "./src/gifURL.js":
/*!***********************!*\
  !*** ./src/gifURL.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const gifURL = 'https://api.giphy.com/v1/gifs/translate?api_key=MMSGcrpyWEenoykFcO33KSmaDpslN6RW&s=';

function completeGifURL(str) {
  const formattedURL = "".concat(gifURL).concat(str);
  return formattedURL;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (completeGifURL);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _dataStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataStateManager */ "./src/dataStateManager.js");
/* harmony import */ var _dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataFormatHelperFns */ "./src/dataFormatHelperFns.js");
/* harmony import */ var _gifURL__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gifURL */ "./src/gifURL.js");
/* harmony import */ var _weatherURL__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weatherURL */ "./src/weatherURL.js");
/* harmony import */ var _getTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getTime */ "./src/getTime.js");
/* harmony import */ var _urlStrFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./urlStrFormat */ "./src/urlStrFormat.js");
/* harmony import */ var _fillNodes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fillNodes */ "./src/fillNodes.js");
/* harmony import */ var _createGifQuery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./createGifQuery */ "./src/createGifQuery.js");
/* harmony import */ var _loadScreenHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loadScreenHandler */ "./src/loadScreenHandler.js");











class ResponseError extends Error {}

const locationForm = document.querySelector('.location-form');
const loadAnimationHandler = (0,_loadScreenHandler__WEBPACK_IMPORTED_MODULE_9__.handleLoadScreenAnimation)();
const queryInfo = (0,_dataStateManager__WEBPACK_IMPORTED_MODULE_1__["default"])();

async function fetchData(url, errStr) {
  const response = await fetch(url, {
    mode: 'cors'
  });

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
  const gifQuery = (0,_createGifQuery__WEBPACK_IMPORTED_MODULE_8__["default"])(weatherDesc, temp, windSpeed, unitType);
  const searchTerm = (0,_urlStrFormat__WEBPACK_IMPORTED_MODULE_6__["default"])(gifQuery);
  const urlStr = (0,_gifURL__WEBPACK_IMPORTED_MODULE_3__["default"])(searchTerm);
  return urlStr;
}

async function handleGifFetch(data) {
  const weatherDesc = data.weather[0].description;
  const {
    temp
  } = data.main;
  const windSpeed = data.wind.speed;
  const unitType = queryInfo.getCurrentUnit();
  const urlStr = handleGifURL(weatherDesc, temp, windSpeed, unitType);
  const gifData = await fetchData(urlStr, 'Failed to fetch gif');
  const {
    url
  } = gifData.data.images.original;
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
  const dateObj = (0,_getTime__WEBPACK_IMPORTED_MODULE_5__["default"])(dataObj.timezone);
  const weatherDesc = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatWeatherCond)(dataObj.weather[0].description);
  const time = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatTime)(dateObj);
  const date = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatDate)(dateObj);
  const temp = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatTemp)(dataObj.main.temp, queryInfo.getCurrentUnit());
  const feelsLikeTemp = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatTemp)(dataObj.main.feels_like, queryInfo.getCurrentUnit());
  const hiTemp = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatTemp)(dataObj.main.temp_max, queryInfo.getCurrentUnit());
  const lowTemp = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatTemp)(dataObj.main.temp_min, queryInfo.getCurrentUnit());
  const windSpeed = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatWindSpeed)(dataObj.wind.speed, queryInfo.getCurrentUnit());
  const iconId = (0,_dataFormatHelperFns__WEBPACK_IMPORTED_MODULE_2__.formatIconURL)(dataObj.weather[0].icon);
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
    windSpeed
  };
  return formattedData;
}

function handleData(data) {
  const formattedData = formatData(data);
  (0,_fillNodes__WEBPACK_IMPORTED_MODULE_7__["default"])(formattedData, queryInfo.getCurrentUnit());
}

function startLoadingScreen() {
  (0,_loadScreenHandler__WEBPACK_IMPORTED_MODULE_9__.showLoadingScreen)();
  loadAnimationHandler.startAnimation();
}

function stopLoadingScreen() {
  (0,_loadScreenHandler__WEBPACK_IMPORTED_MODULE_9__.hideLoadingScreen)();
  loadAnimationHandler.stopAnimation();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const location = grabInputStrFromForm(event);
  const formattedLoc = (0,_urlStrFormat__WEBPACK_IMPORTED_MODULE_6__["default"])(location);
  queryInfo.setLocationStr(formattedLoc);
  const url = (0,_weatherURL__WEBPACK_IMPORTED_MODULE_4__["default"])(formattedLoc, queryInfo.getCurrentUnit());
  startLoadingScreen();
  fetchData(url, 'Invalid location entered').then(json => {
    stopLoadingScreen();
    handleData(json);
    return json;
  }).then(handleGifFetch).catch(err => {
    handleError(err);
    stopLoadingScreen();
  });
}

function handleBtnClick() {
  queryInfo.swapUnits();
  const unitType = queryInfo.getCurrentUnit();
  const location = queryInfo.getLocationStr();
  const url = (0,_weatherURL__WEBPACK_IMPORTED_MODULE_4__["default"])(location, unitType);
  startLoadingScreen();
  fetchData(url, 'Failed to fetch gif').then(json => {
    stopLoadingScreen();
    handleData(json);
  }).catch(handleError);
}

locationForm.addEventListener('submit', handleFormSubmit);
document.addEventListener('click', e => {
  if (e.target.classList.contains('unit-toggle')) {
    handleBtnClick();
  }
});

/***/ }),

/***/ "./src/loadScreenHandler.js":
/*!**********************************!*\
  !*** ./src/loadScreenHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleLoadScreenAnimation": () => (/* binding */ handleLoadScreenAnimation),
/* harmony export */   "hideLoadingScreen": () => (/* binding */ hideLoadingScreen),
/* harmony export */   "showLoadingScreen": () => (/* binding */ showLoadingScreen)
/* harmony export */ });
function handleLoadScreenAnimation() {
  let intervalID;
  const targetElems = document.querySelectorAll('.circle-dot');
  let animIndex = 0;
  let prevAnimIndex = targetElems.length - 1;

  const startAnimation = () => {
    intervalID = setInterval(() => {
      targetElems[animIndex].classList.add('invisible-dot');
      targetElems[prevAnimIndex].classList.remove('invisible-dot');
      prevAnimIndex = animIndex;
      animIndex = (animIndex + 1) % targetElems.length;
    }, 1000);
  };

  const stopAnimation = () => {
    clearInterval(intervalID);
    animIndex = 0;
    prevAnimIndex = targetElems.length - 1;
  };

  return {
    startAnimation,
    stopAnimation
  };
}

function showLoadingScreen() {
  const loadScreen = document.querySelector('.loading-modal');
  loadScreen.classList.remove('hide');
}

function hideLoadingScreen() {
  const loadScreen = document.querySelector('.loading-modal');
  loadScreen.classList.add('hide');
}



/***/ }),

/***/ "./src/urlStrFormat.js":
/*!*****************************!*\
  !*** ./src/urlStrFormat.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function formatQueryStr(str) {
  const formattedStr = str.trim().replace(/\s+/, '+');
  return formattedStr;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatQueryStr);

/***/ }),

/***/ "./src/weatherURL.js":
/*!***************************!*\
  !*** ./src/weatherURL.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=&appid=be56b9b3a4b4bc973591bee5c0716766';

function completeWeatherURL(location, unit) {
  const formattedURL = "".concat(weatherURL.replace(/q=\w*(?=&)/, "q=".concat(location)), "&units=").concat(unit);
  return formattedURL;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (completeWeatherURL);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto-Regular.ttf */ "./src/assets/fonts/Roboto-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Roboto\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\n}\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: \"Roboto\";\n  background-color: #000000;\n  min-height: 100vh;\n  color: #fff;\n}\n\n.search-input, button, input[type=submit] {\n  background-color: inherit;\n  color: inherit;\n  font-size: 16px;\n  font-family: inherit;\n  padding: 5px;\n  border-radius: 12px;\n}\n\nmain {\n  padding: 0 5vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 24px 0;\n}\n\n.page-container {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 40px;\n}\n\n.weather-data-container {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  border: 1px solid #fff;\n  padding: 8px;\n  border-radius: 12px;\n}\n\n.loading-modal {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  min-height: 100vh;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgba(3, 3, 3, 0.5490196078);\n  font-size: 36px;\n  font-weight: bold;\n}\n\n.modal-content {\n  color: #fff;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.circle-dot {\n  background-color: #fff;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  transition: opacity 0.5s;\n  opacity: 100%;\n}\n\n.invisible-dot {\n  opacity: 0%;\n}\n\n.hide {\n  display: none;\n}\n\n.info-img-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0 240px;\n}\n.info-img-container .weather-gif {\n  max-width: 90vw;\n  max-height: 300px;\n  border-radius: 12px;\n}\n\n.primary-weather-info {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.location-name {\n  font-size: 48px;\n  margin: 3vh 0;\n}\n\n.unit-toggle {\n  align-self: flex-start;\n}\n\n.temp-display {\n  font-weight: bold;\n  font-size: 32px;\n}\n\n.location-time {\n  display: flex;\n  flex-direction: column;\n}\n\n.secondary-weather-info {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 12px 0;\n  font-size: 24px;\n}\n\nbutton, input[type=submit] {\n  border-radius: 8px;\n  cursor: pointer;\n}\n\nfooter {\n  margin-top: auto;\n  padding-bottom: 16px;\n}\n\n.footer-text {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\nsvg {\n  fill: currentColor;\n}\n\na:visited {\n  color: #fff;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACI,qBAAA;EACA,+DAAA;AACJ;AAEA;EACI,sBAAA;AAAJ;;AAGA;EACI,SAAA;EACA,qBAAA;EACA,yBAAA;EACA,iBAAA;EACA,WAAA;AAAJ;;AAGA;EACI,yBAAA;EACA,cAAA;EACA,eAAA;EACA,oBAAA;EACA,YAAA;EACA,mBAAA;AAAJ;;AAGA;EACI,cAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;AAAJ;;AAGA;EACI,iBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,SAAA;AAAJ;;AAGA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;EACA,sBAAA;EACA,YAAA;EACA,mBAAA;AAAJ;;AAIA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,6CAAA;EACA,eAAA;EACA,iBAAA;AADJ;;AAIA;EACI,WAjBU;EAkBV,aAAA;EACA,mBAAA;EACA,SAAA;AADJ;;AAIA;EACI,sBAxBU;EAyBV,WAAA;EACA,YAAA;EACA,kBAAA;EACA,wBAAA;EACA,aAAA;AADJ;;AAIA;EACI,WAAA;AADJ;;AAIA;EACI,aAAA;AADJ;;AAIA;EACI,aAAA;EACA,eAAA;EACA,YAAA;AADJ;AAGI;EACI,eAAA;EACA,iBAAA;EACA,mBAAA;AADR;;AAKA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;AAFJ;;AAKA;EACI,eAAA;EACA,aAAA;AAFJ;;AAKA;EACI,sBAAA;AAFJ;;AAKA;EACI,iBAAA;EACA,eAAA;AAFJ;;AAKA;EACI,aAAA;EACA,sBAAA;AAFJ;;AAKA;EACI,aAAA;EACA,2DAAA;EACA,WAAA;EACA,eAAA;AAFJ;;AAKA;EAEI,kBAAA;EACA,eAAA;AAHJ;;AAOA;EACI,gBAAA;EACA,oBAAA;AAJJ;;AAOA;EACI,aAAA;EACA,mBAAA;EACA,QAAA;AAJJ;;AAOA;EACI,kBAAA;AAJJ;;AAOA;EACI,WAAA;AAJJ","sourcesContent":["@font-face {\n    font-family: \"Roboto\";\n    src: url(\"./assets/fonts/Roboto-Regular.ttf\") format(\"truetype\")\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: \"Roboto\";\n    background-color: #000000;\n    min-height: 100vh;\n    color: #fff;\n}\n\n.search-input {\n    background-color: inherit;\n    color: inherit;\n    font-size: 16px;\n    font-family: inherit;\n    padding: 5px;\n    border-radius: 12px;\n}\n\nmain {\n    padding: 0 5vw;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 24px 0;\n}\n\n.page-container {\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 40px;\n}\n\n.weather-data-container {\n    display: flex;\n    flex-direction: column;\n    gap: 24px;\n    border: 1px solid #fff;\n    padding: 8px;\n    border-radius: 12px;\n}\n\n$modal-color: #fff;\n.loading-modal {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100vw;\n    min-height: 100vh;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background-color: #0303038c;\n    font-size: 36px;\n    font-weight: bold;\n}\n\n.modal-content {\n    color: $modal-color;\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.circle-dot {\n    background-color: $modal-color;\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    transition: opacity 0.5s;\n    opacity: 100%;\n}\n\n.invisible-dot {\n    opacity: 0%;\n}\n\n.hide {\n    display: none;\n}\n\n.info-img-container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0 240px;\n\n    .weather-gif {\n        max-width: 90vw;\n        max-height: 300px;\n        border-radius: 12px;\n    }\n}\n\n.primary-weather-info {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n.location-name {\n    font-size: 48px;\n    margin: 3vh 0;\n}\n\n.unit-toggle {\n    align-self: flex-start;\n}\n\n.temp-display {\n    font-weight: bold;\n    font-size: 32px;\n}\n\n.location-time {\n    display: flex;\n    flex-direction: column;\n}\n\n.secondary-weather-info {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n    gap: 12px 0;\n    font-size: 24px;\n}\n\nbutton, input[type=submit]{\n    @extend .search-input;\n    border-radius: 8px;\n    cursor: pointer;\n}\n\n\nfooter {\n    margin-top: auto;\n    padding-bottom: 16px;\n}\n\n.footer-text {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n\nsvg {\n    fill: currentColor;\n}\n\na:visited {\n    color: #fff;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/Roboto-Regular.ttf":
/*!*********************************************!*\
  !*** ./src/assets/fonts/Roboto-Regular.ttf ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fc2b5060f7accec5cf74.ttf";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jcmVhdGVHaWZRdWVyeS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhRm9ybWF0SGVscGVyRm5zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGFTdGF0ZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZmlsbE5vZGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dldFRpbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2lmVVJMLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvYWRTY3JlZW5IYW5kbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VybFN0ckZvcm1hdC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyVVJMLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUdpZlF1ZXJ5KHdlYXRoZXJEZXNjLCB0ZW1wLCB3aW5kU3BlZWQsIHVuaXRUeXBlKSB7XG4gIGNvbnN0IHNlYXJjaFRlcm1zID0gW3dlYXRoZXJEZXNjXTtcbiAgbGV0IHVwcGVyVGVtcFJhbmdlO1xuICBsZXQgbG93ZXJUZW1wUmFuZ2U7XG4gIGxldCB1cHBlcldpbmRSYW5nZTtcbiAgbGV0IGxvd2VyV2luZFJhbmdlO1xuICBpZiAodW5pdFR5cGUgPT09ICdpbXBlcmlhbCcpIHtcbiAgICBbbG93ZXJUZW1wUmFuZ2UsIHVwcGVyVGVtcFJhbmdlXSA9IFs0NiwgNzhdO1xuICAgIFtsb3dlcldpbmRSYW5nZSwgdXBwZXJXaW5kUmFuZ2VdID0gWzIwLCAyNV07XG4gIH0gZWxzZSB7XG4gICAgW2xvd2VyVGVtcFJhbmdlLCB1cHBlclRlbXBSYW5nZV0gPSBbOCwgMjVdO1xuICAgIFtsb3dlcldpbmRSYW5nZSwgdXBwZXJXaW5kUmFuZ2VdID0gWzksIDExXTtcbiAgfVxuICBpZiAoTnVtYmVyKHRlbXApID4gdXBwZXJUZW1wUmFuZ2UpIHtcbiAgICBzZWFyY2hUZXJtcy5wdXNoKCdob3QnKTtcbiAgfSBlbHNlIGlmIChOdW1iZXIodGVtcCkgPCBsb3dlclRlbXBSYW5nZSkge1xuICAgIHNlYXJjaFRlcm1zLnB1c2goJ2NvbGQnKTtcbiAgfVxuICBpZiAoTnVtYmVyKHdpbmRTcGVlZCkgPiB1cHBlcldpbmRSYW5nZSkge1xuICAgIHNlYXJjaFRlcm1zLnB1c2goJ3dpbmR5Jyk7XG4gIH0gZWxzZSBpZiAoTnVtYmVyKHdpbmRTcGVlZCkgPiBsb3dlcldpbmRSYW5nZSkge1xuICAgIHNlYXJjaFRlcm1zLnB1c2goJ2JyZWV6eScpO1xuICB9XG4gIGNvbnN0IHRlcm0gPSBzZWFyY2hUZXJtc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzZWFyY2hUZXJtcy5sZW5ndGgpXTtcbiAgcmV0dXJuIHRlcm07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdpZlF1ZXJ5O1xuIiwiZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlT2JqKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgbW9udGg6ICdzaG9ydCcsIHdlZWtkYXk6ICdsb25nJywgeWVhcjogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyxcbiAgfTtcbiAgcmV0dXJuIGRhdGVPYmoudG9Mb2NhbGVEYXRlU3RyaW5nKHVuZGVmaW5lZCwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoZGF0ZU9iaikge1xuICBjb25zdCBvcHRpb25zID0geyB0aW1lU3R5bGU6ICdzaG9ydCcgfTtcbiAgcmV0dXJuIGRhdGVPYmoudG9Mb2NhbGVUaW1lU3RyaW5nKHVuZGVmaW5lZCwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRlbXAodGVtcCwgdW5pdFR5cGUpIHtcbiAgY29uc3QgdW5pdFN5bWJvbCA9IHVuaXRUeXBlID09PSAnaW1wZXJpYWwnID8gJ0YnIDogJ0MnO1xuICByZXR1cm4gYCR7TWF0aC5yb3VuZChOdW1iZXIodGVtcCkpfSBcXHUwMEIwJHt1bml0U3ltYm9sfWA7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFdpbmRTcGVlZCh3aW5kU3BlZWQsIHVuaXRUeXBlKSB7XG4gIGxldCB1bml0O1xuICBsZXQgZldpbmRTcGVlZDtcbiAgaWYgKHVuaXRUeXBlID09PSAnaW1wZXJpYWwnKSB7XG4gICAgZldpbmRTcGVlZCA9IE51bWJlcih3aW5kU3BlZWQpLnRvRml4ZWQoMSkucmVwbGFjZSgvXFwuPzAqJC8sICcnKTtcbiAgICB1bml0ID0gJ21waCc7XG4gIH0gZWxzZSB7XG4gICAgZldpbmRTcGVlZCA9IChOdW1iZXIod2luZFNwZWVkKSAqIDMuNikudG9GaXhlZCgxKS5yZXBsYWNlKC9cXC4/MCokLywgJycpO1xuICAgIHVuaXQgPSAna20vaCc7XG4gIH1cbiAgcmV0dXJuIGAke2ZXaW5kU3BlZWR9ICR7dW5pdH1gO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRXZWF0aGVyQ29uZCh3ZWF0aGVyRGVzYykge1xuICBsZXQgY2FwRGVzYyA9IHdlYXRoZXJEZXNjLnJlcGxhY2UoL1xcYlxcdy9nLCAoYykgPT4gYy50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIGNhcERlc2M7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEljb25VUkwoaWNvbklkKSB7XG4gIGNvbnN0IGxpbmsgPSAnaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vMTBkQDJ4LnBuZyc7XG4gIGNvbnN0IHVybCA9IGxpbmsucmVwbGFjZSgvXFxkK2QvLCBpY29uSWQpO1xuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQge1xuICBmb3JtYXREYXRlLCBmb3JtYXRUZW1wLCBmb3JtYXRUaW1lLCBmb3JtYXRXaW5kU3BlZWQsIGZvcm1hdFdlYXRoZXJDb25kLCBmb3JtYXRJY29uVVJMLFxufTtcbiIsImZ1bmN0aW9uIHN0YXRlTWFuYWdlcigpIHtcbiAgbGV0IHVybExvY2F0aW9uU3RyID0gJyc7XG4gIGNvbnN0IHVuaXRzID0gWydpbXBlcmlhbCcsICdtZXRyaWMnXTtcbiAgbGV0IGN1cnJlbnRVbml0SW5kZXggPSAwO1xuICBsZXQgY3VycmVudFVuaXQgPSB1bml0c1tjdXJyZW50VW5pdEluZGV4XTtcbiAgY29uc3Qgc3dhcFVuaXRzID0gKCkgPT4ge1xuICAgIGN1cnJlbnRVbml0SW5kZXggPSAoY3VycmVudFVuaXRJbmRleCArIDEpICUgdW5pdHMubGVuZ3RoO1xuICAgIGN1cnJlbnRVbml0ID0gdW5pdHNbY3VycmVudFVuaXRJbmRleF07XG4gIH07XG4gIGNvbnN0IGdldEN1cnJlbnRVbml0ID0gKCkgPT4gY3VycmVudFVuaXQ7XG4gIGNvbnN0IHNldExvY2F0aW9uU3RyID0gKHN0cikgPT4geyB1cmxMb2NhdGlvblN0ciA9IHN0cjsgfTtcbiAgY29uc3QgZ2V0TG9jYXRpb25TdHIgPSAoKSA9PiB1cmxMb2NhdGlvblN0cjtcbiAgcmV0dXJuIHtcbiAgICBnZXRDdXJyZW50VW5pdCwgc3dhcFVuaXRzLCBzZXRMb2NhdGlvblN0ciwgZ2V0TG9jYXRpb25TdHIsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXRlTWFuYWdlcjtcbiIsImZ1bmN0aW9uIGZpbGxOb2RlcyhkYXRhT2JqLCB1bml0VHlwZSkge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1kYXRhLWNvbnRhaW5lcicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBjb25zdCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24tbmFtZScpO1xuICBjb25zdCB3ZWF0aGVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWRlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IHRlbXBlcmF0dXJlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wLWRpc3BsYXknKTtcbiAgY29uc3QgZGF0ZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZS1kaXNwbGF5Jyk7XG4gIGNvbnN0IHRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUtZGlzcGxheScpO1xuICBjb25zdCBodW1pZGl0eURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHktZGlzcGxheScpO1xuICBjb25zdCB3aW5kU3BlZWREaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQtc3BlZWQtZGlzcGxheScpO1xuICBjb25zdCBoaUxvd1RlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpLWxvdy10ZW1wJyk7XG4gIGNvbnN0IGZlZWxzTGlrZVRlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UtdGVtcCcpO1xuICBjb25zdCB1bml0VG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuaXQtdG9nZ2xlJyk7XG4gIGNvbnN0IGVyclRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWVycm9yLXRleHQnKTtcbiAgY29uc3Qgd2VhdGhlckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXN2Zy1pY29uJyk7XG5cbiAgbG9jYXRpb25EaXNwbGF5LmlubmVyVGV4dCA9IGRhdGFPYmoubmFtZTtcbiAgd2VhdGhlckRpc3BsYXkuaW5uZXJUZXh0ID0gZGF0YU9iai53ZWF0aGVyRGVzYztcbiAgdGVtcGVyYXR1cmVEaXNwbGF5LmlubmVyVGV4dCA9IGRhdGFPYmoudGVtcDtcbiAgZGF0ZURpc3BsYXkuaW5uZXJUZXh0ID0gZGF0YU9iai5kYXRlO1xuICB0aW1lRGlzcGxheS5pbm5lclRleHQgPSBkYXRhT2JqLnRpbWU7XG4gIGh1bWlkaXR5RGlzcGxheS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7ZGF0YU9iai5odW1pZGl0eX0lYDtcbiAgd2luZFNwZWVkRGlzcGxheS5pbm5lclRleHQgPSBgV2luZCBzcGVlZDogJHtkYXRhT2JqLndpbmRTcGVlZH1gO1xuICBoaUxvd1RlbXBEaXNwbGF5LmlubmVyVGV4dCA9IGBIaTogJHtkYXRhT2JqLmxvd1RlbXB9IHwgTG86ICR7ZGF0YU9iai5oaVRlbXB9YDtcbiAgZmVlbHNMaWtlVGVtcERpc3BsYXkuaW5uZXJUZXh0ID0gYEZlZWxzIGxpa2U6ICR7ZGF0YU9iai5mZWVsc0xpa2VUZW1wfWA7XG4gIHdlYXRoZXJJbWcuc3JjID0gZGF0YU9iai5pY29uSWQ7XG4gIHdlYXRoZXJJbWcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBlcnJUZXh0LmlubmVyVGV4dCA9ICcnO1xuICBpZiAodW5pdFR5cGUgPT09ICdpbXBlcmlhbCcpIHtcbiAgICB1bml0VG9nZ2xlQnRuLmlubmVyVGV4dCA9ICdNZXRyaWMgdW5pdHMnO1xuICB9IGVsc2Uge1xuICAgIHVuaXRUb2dnbGVCdG4uaW5uZXJUZXh0ID0gJ0ltcGVyaWFsIFVuaXRzJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmaWxsTm9kZXM7XG4iLCJmdW5jdGlvbiBnZXRJbnRlcm5hdGlvbmFsVGltZSh0aW1lem9uZU9mZnNldCkge1xuICBjb25zdCBsb2NhbERhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkdCA9IGxvY2FsRGF0ZS5nZXRUaW1lKCk7XG4gIGNvbnN0IGxvY2FsT2Zmc2V0ID0gbG9jYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgY29uc3QgZmluYWxPZmZzZXQgPSBsb2NhbE9mZnNldCArICh0aW1lem9uZU9mZnNldCAqIDEwMDApO1xuICBjb25zdCBmaW5hbERhdGUgPSBuZXcgRGF0ZShkdCArIGZpbmFsT2Zmc2V0KTtcbiAgcmV0dXJuIGZpbmFsRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0SW50ZXJuYXRpb25hbFRpbWU7XG4iLCJjb25zdCBnaWZVUkwgPSAnaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvdHJhbnNsYXRlP2FwaV9rZXk9TU1TR2NycHlXRWVub3lrRmNPMzNLU21hRHBzbE42Ulcmcz0nO1xuXG5mdW5jdGlvbiBjb21wbGV0ZUdpZlVSTChzdHIpIHtcbiAgY29uc3QgZm9ybWF0dGVkVVJMID0gYCR7Z2lmVVJMfSR7c3RyfWA7XG4gIHJldHVybiBmb3JtYXR0ZWRVUkw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBsZXRlR2lmVVJMO1xuIiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHN0YXRlTWFuYWdlciBmcm9tICcuL2RhdGFTdGF0ZU1hbmFnZXInO1xuaW1wb3J0IHtcbiAgZm9ybWF0RGF0ZSwgZm9ybWF0VGVtcCwgZm9ybWF0VGltZSwgZm9ybWF0V2luZFNwZWVkLCBmb3JtYXRXZWF0aGVyQ29uZCwgZm9ybWF0SWNvblVSTCxcbn0gZnJvbSAnLi9kYXRhRm9ybWF0SGVscGVyRm5zJztcbmltcG9ydCBjb21wbGV0ZUdpZlVSTCBmcm9tICcuL2dpZlVSTCc7XG5pbXBvcnQgY29tcGxldGVXZWF0aGVyVVJMIGZyb20gJy4vd2VhdGhlclVSTCc7XG5pbXBvcnQgZ2V0SW50ZXJuYXRpb25hbFRpbWUgZnJvbSAnLi9nZXRUaW1lJztcbmltcG9ydCBmb3JtYXRRdWVyeVN0ciBmcm9tICcuL3VybFN0ckZvcm1hdCc7XG5pbXBvcnQgZmlsbE5vZGVzIGZyb20gJy4vZmlsbE5vZGVzJztcbmltcG9ydCBjcmVhdGVHaWZRdWVyeSBmcm9tICcuL2NyZWF0ZUdpZlF1ZXJ5JztcbmltcG9ydCB7IGhhbmRsZUxvYWRTY3JlZW5BbmltYXRpb24sIHNob3dMb2FkaW5nU2NyZWVuLCBoaWRlTG9hZGluZ1NjcmVlbiB9IGZyb20gJy4vbG9hZFNjcmVlbkhhbmRsZXInO1xuXG5jbGFzcyBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuY29uc3QgbG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uLWZvcm0nKTtcbmNvbnN0IGxvYWRBbmltYXRpb25IYW5kbGVyID0gaGFuZGxlTG9hZFNjcmVlbkFuaW1hdGlvbigpO1xuY29uc3QgcXVlcnlJbmZvID0gc3RhdGVNYW5hZ2VyKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YSh1cmwsIGVyclN0cikge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiAnY29ycycgfSk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgUmVzcG9uc2VFcnJvcihlcnJTdHIpO1xuICB9XG4gIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4ganNvbkRhdGE7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICBpZiAoZXJyIGluc3RhbmNlb2YgUmVzcG9uc2VFcnJvcikge1xuICAgIGNvbnN0IGVycm9yVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZXJyb3ItdGV4dCcpO1xuICAgIGVycm9yVGV4dC5pbm5lclRleHQgPSBlcnIubWVzc2FnZTtcbiAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihlcnIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHaWZJbWcoc3JjKSB7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWdpZicpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBpbWcuY2xhc3NMaXN0LmFkZCgnd2VhdGhlci1naWYnKTtcbiAgaW1nLmFsdCA9ICdXZWF0aGVyIFZpc3VhbGl6YXRpb24nO1xuICBpbWcuc3JjID0gc3JjO1xuICBjb25zdCBpbWdDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2lmLWNvbnRhaW5lcicpO1xuICBpbWdDb250YWluZXIuYXBwZW5kKGltZyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUdpZlVSTCh3ZWF0aGVyRGVzYywgdGVtcCwgd2luZFNwZWVkLCB1bml0VHlwZSkge1xuICBjb25zdCBnaWZRdWVyeSA9IGNyZWF0ZUdpZlF1ZXJ5KHdlYXRoZXJEZXNjLCB0ZW1wLCB3aW5kU3BlZWQsIHVuaXRUeXBlKTtcbiAgY29uc3Qgc2VhcmNoVGVybSA9IGZvcm1hdFF1ZXJ5U3RyKGdpZlF1ZXJ5KTtcbiAgY29uc3QgdXJsU3RyID0gY29tcGxldGVHaWZVUkwoc2VhcmNoVGVybSk7XG4gIHJldHVybiB1cmxTdHI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdpZkZldGNoKGRhdGEpIHtcbiAgY29uc3Qgd2VhdGhlckRlc2MgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gIGNvbnN0IHsgdGVtcCB9ID0gZGF0YS5tYWluO1xuICBjb25zdCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gIGNvbnN0IHVuaXRUeXBlID0gcXVlcnlJbmZvLmdldEN1cnJlbnRVbml0KCk7XG4gIGNvbnN0IHVybFN0ciA9IGhhbmRsZUdpZlVSTCh3ZWF0aGVyRGVzYywgdGVtcCwgd2luZFNwZWVkLCB1bml0VHlwZSk7XG4gIGNvbnN0IGdpZkRhdGEgPSBhd2FpdCBmZXRjaERhdGEodXJsU3RyLCAnRmFpbGVkIHRvIGZldGNoIGdpZicpO1xuICBjb25zdCB7IHVybCB9ID0gZ2lmRGF0YS5kYXRhLmltYWdlcy5vcmlnaW5hbDtcbiAgY3JlYXRlR2lmSW1nKHVybCk7XG59XG5cbmZ1bmN0aW9uIGdyYWJJbnB1dFN0ckZyb21Gb3JtKGV2ZW50KSB7XG4gIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG4gIGNvbnN0IHN0ciA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRhKGRhdGFPYmopIHtcbiAgY29uc3QgZGF0ZU9iaiA9IGdldEludGVybmF0aW9uYWxUaW1lKGRhdGFPYmoudGltZXpvbmUpO1xuICBjb25zdCB3ZWF0aGVyRGVzYyA9IGZvcm1hdFdlYXRoZXJDb25kKGRhdGFPYmoud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gIGNvbnN0IHRpbWUgPSBmb3JtYXRUaW1lKGRhdGVPYmopO1xuICBjb25zdCBkYXRlID0gZm9ybWF0RGF0ZShkYXRlT2JqKTtcbiAgY29uc3QgdGVtcCA9IGZvcm1hdFRlbXAoZGF0YU9iai5tYWluLnRlbXAsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgZmVlbHNMaWtlVGVtcCA9IGZvcm1hdFRlbXAoZGF0YU9iai5tYWluLmZlZWxzX2xpa2UsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgaGlUZW1wID0gZm9ybWF0VGVtcChkYXRhT2JqLm1haW4udGVtcF9tYXgsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgbG93VGVtcCA9IGZvcm1hdFRlbXAoZGF0YU9iai5tYWluLnRlbXBfbWluLCBxdWVyeUluZm8uZ2V0Q3VycmVudFVuaXQoKSk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGZvcm1hdFdpbmRTcGVlZChkYXRhT2JqLndpbmQuc3BlZWQsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgaWNvbklkID0gZm9ybWF0SWNvblVSTChkYXRhT2JqLndlYXRoZXJbMF0uaWNvbik7XG5cbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IHtcbiAgICBuYW1lOiBkYXRhT2JqLm5hbWUsXG4gICAgaHVtaWRpdHk6IGRhdGFPYmoubWFpbi5odW1pZGl0eSxcbiAgICB3ZWF0aGVyRGVzYyxcbiAgICBpY29uSWQsXG4gICAgdGVtcCxcbiAgICB0aW1lLFxuICAgIGRhdGUsXG4gICAgZmVlbHNMaWtlVGVtcCxcbiAgICBoaVRlbXAsXG4gICAgbG93VGVtcCxcbiAgICB3aW5kU3BlZWQsXG4gIH07XG4gIHJldHVybiBmb3JtYXR0ZWREYXRhO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEYXRhKGRhdGEpIHtcbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IGZvcm1hdERhdGEoZGF0YSk7XG4gIGZpbGxOb2Rlcyhmb3JtYXR0ZWREYXRhLCBxdWVyeUluZm8uZ2V0Q3VycmVudFVuaXQoKSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZ1NjcmVlbigpIHtcbiAgc2hvd0xvYWRpbmdTY3JlZW4oKTtcbiAgbG9hZEFuaW1hdGlvbkhhbmRsZXIuc3RhcnRBbmltYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gc3RvcExvYWRpbmdTY3JlZW4oKSB7XG4gIGhpZGVMb2FkaW5nU2NyZWVuKCk7XG4gIGxvYWRBbmltYXRpb25IYW5kbGVyLnN0b3BBbmltYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBsb2NhdGlvbiA9IGdyYWJJbnB1dFN0ckZyb21Gb3JtKGV2ZW50KTtcbiAgY29uc3QgZm9ybWF0dGVkTG9jID0gZm9ybWF0UXVlcnlTdHIobG9jYXRpb24pO1xuICBxdWVyeUluZm8uc2V0TG9jYXRpb25TdHIoZm9ybWF0dGVkTG9jKTtcbiAgY29uc3QgdXJsID0gY29tcGxldGVXZWF0aGVyVVJMKGZvcm1hdHRlZExvYywgcXVlcnlJbmZvLmdldEN1cnJlbnRVbml0KCkpO1xuICBzdGFydExvYWRpbmdTY3JlZW4oKTtcbiAgZmV0Y2hEYXRhKHVybCwgJ0ludmFsaWQgbG9jYXRpb24gZW50ZXJlZCcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBzdG9wTG9hZGluZ1NjcmVlbigpO1xuICAgIGhhbmRsZURhdGEoanNvbik7XG4gICAgcmV0dXJuIGpzb247XG4gIH0pLnRoZW4oaGFuZGxlR2lmRmV0Y2gpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgICBzdG9wTG9hZGluZ1NjcmVlbigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCdG5DbGljaygpIHtcbiAgcXVlcnlJbmZvLnN3YXBVbml0cygpO1xuICBjb25zdCB1bml0VHlwZSA9IHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpO1xuICBjb25zdCBsb2NhdGlvbiA9IHF1ZXJ5SW5mby5nZXRMb2NhdGlvblN0cigpO1xuICBjb25zdCB1cmwgPSBjb21wbGV0ZVdlYXRoZXJVUkwobG9jYXRpb24sIHVuaXRUeXBlKTtcbiAgc3RhcnRMb2FkaW5nU2NyZWVuKCk7XG4gIGZldGNoRGF0YSh1cmwsICdGYWlsZWQgdG8gZmV0Y2ggZ2lmJykudGhlbigoanNvbikgPT4ge1xuICAgIHN0b3BMb2FkaW5nU2NyZWVuKCk7XG4gICAgaGFuZGxlRGF0YShqc29uKTtcbiAgfSlcbiAgICAuY2F0Y2goaGFuZGxlRXJyb3IpO1xufVxuXG5sb2NhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlRm9ybVN1Ym1pdCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndW5pdC10b2dnbGUnKSkge1xuICAgIGhhbmRsZUJ0bkNsaWNrKCk7XG4gIH1cbn0pO1xuIiwiZnVuY3Rpb24gaGFuZGxlTG9hZFNjcmVlbkFuaW1hdGlvbigpIHtcbiAgbGV0IGludGVydmFsSUQ7XG4gIGNvbnN0IHRhcmdldEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZS1kb3QnKTtcbiAgbGV0IGFuaW1JbmRleCA9IDA7XG4gIGxldCBwcmV2QW5pbUluZGV4ID0gdGFyZ2V0RWxlbXMubGVuZ3RoIC0gMTtcblxuICBjb25zdCBzdGFydEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGFyZ2V0RWxlbXNbYW5pbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZG90Jyk7XG4gICAgICB0YXJnZXRFbGVtc1twcmV2QW5pbUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUtZG90Jyk7XG4gICAgICBwcmV2QW5pbUluZGV4ID0gYW5pbUluZGV4O1xuICAgICAgYW5pbUluZGV4ID0gKGFuaW1JbmRleCArIDEpICUgdGFyZ2V0RWxlbXMubGVuZ3RoO1xuICAgIH0sIDEwMDApO1xuICB9O1xuXG4gIGNvbnN0IHN0b3BBbmltYXRpb24gPSAoKSA9PiB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICBhbmltSW5kZXggPSAwO1xuICAgIHByZXZBbmltSW5kZXggPSB0YXJnZXRFbGVtcy5sZW5ndGggLSAxO1xuICB9O1xuICByZXR1cm4geyBzdGFydEFuaW1hdGlvbiwgc3RvcEFuaW1hdGlvbiB9O1xufVxuXG5mdW5jdGlvbiBzaG93TG9hZGluZ1NjcmVlbigpIHtcbiAgY29uc3QgbG9hZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW1vZGFsJyk7XG4gIGxvYWRTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufVxuXG5mdW5jdGlvbiBoaWRlTG9hZGluZ1NjcmVlbigpIHtcbiAgY29uc3QgbG9hZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW1vZGFsJyk7XG4gIGxvYWRTY3JlZW4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufVxuXG5leHBvcnQgeyBoYW5kbGVMb2FkU2NyZWVuQW5pbWF0aW9uLCBzaG93TG9hZGluZ1NjcmVlbiwgaGlkZUxvYWRpbmdTY3JlZW4gfTtcbiIsImZ1bmN0aW9uIGZvcm1hdFF1ZXJ5U3RyKHN0cikge1xuICBjb25zdCBmb3JtYXR0ZWRTdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoL1xccysvLCAnKycpO1xuICByZXR1cm4gZm9ybWF0dGVkU3RyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXRRdWVyeVN0cjtcbiIsImNvbnN0IHdlYXRoZXJVUkwgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0mYXBwaWQ9YmU1NmI5YjNhNGI0YmM5NzM1OTFiZWU1YzA3MTY3NjYnO1xuXG5mdW5jdGlvbiBjb21wbGV0ZVdlYXRoZXJVUkwobG9jYXRpb24sIHVuaXQpIHtcbiAgY29uc3QgZm9ybWF0dGVkVVJMID0gYCR7d2VhdGhlclVSTC5yZXBsYWNlKC9xPVxcdyooPz0mKS8sIGBxPSR7bG9jYXRpb259YCl9JnVuaXRzPSR7dW5pdH1gO1xuICByZXR1cm4gZm9ybWF0dGVkVVJMO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wbGV0ZVdlYXRoZXJVUkw7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbn1cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5zZWFyY2gtaW5wdXQsIGJ1dHRvbiwgaW5wdXRbdHlwZT1zdWJtaXRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXG59XFxuXFxubWFpbiB7XFxuICBwYWRkaW5nOiAwIDV2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjRweCAwO1xcbn1cXG5cXG4ucGFnZS1jb250YWluZXIge1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDQwcHg7XFxufVxcblxcbi53ZWF0aGVyLWRhdGEtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxufVxcblxcbi5sb2FkaW5nLW1vZGFsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDMsIDMsIDMsIDAuNTQ5MDE5NjA3OCk7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLm1vZGFsLWNvbnRlbnQge1xcbiAgY29sb3I6ICNmZmY7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTJweDtcXG59XFxuXFxuLmNpcmNsZS1kb3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzO1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuLmludmlzaWJsZS1kb3Qge1xcbiAgb3BhY2l0eTogMCU7XFxufVxcblxcbi5oaWRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5pbmZvLWltZy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogMCAyNDBweDtcXG59XFxuLmluZm8taW1nLWNvbnRhaW5lciAud2VhdGhlci1naWYge1xcbiAgbWF4LXdpZHRoOiA5MHZ3O1xcbiAgbWF4LWhlaWdodDogMzAwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbn1cXG5cXG4ucHJpbWFyeS13ZWF0aGVyLWluZm8ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDEycHg7XFxufVxcblxcbi5sb2NhdGlvbi1uYW1lIHtcXG4gIGZvbnQtc2l6ZTogNDhweDtcXG4gIG1hcmdpbjogM3ZoIDA7XFxufVxcblxcbi51bml0LXRvZ2dsZSB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4udGVtcC1kaXNwbGF5IHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbn1cXG5cXG4ubG9jYXRpb24tdGltZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnNlY29uZGFyeS13ZWF0aGVyLWluZm8ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDFmcikpO1xcbiAgZ2FwOiAxMnB4IDA7XFxuICBmb250LXNpemU6IDI0cHg7XFxufVxcblxcbmJ1dHRvbiwgaW5wdXRbdHlwZT1zdWJtaXRdIHtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG59XFxuXFxuLmZvb3Rlci10ZXh0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiA0cHg7XFxufVxcblxcbnN2ZyB7XFxuICBmaWxsOiBjdXJyZW50Q29sb3I7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICBjb2xvcjogI2ZmZjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDSSxxQkFBQTtFQUNBLCtEQUFBO0FBQ0o7QUFFQTtFQUNJLHNCQUFBO0FBQUo7O0FBR0E7RUFDSSxTQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUdBO0VBQ0kseUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQUo7O0FBR0E7RUFDSSxjQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBQUo7O0FBR0E7RUFDSSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQUo7O0FBSUE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsNkNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFESjs7QUFJQTtFQUNJLFdBakJVO0VBa0JWLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFESjs7QUFJQTtFQUNJLHNCQXhCVTtFQXlCVixXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxhQUFBO0FBREo7O0FBSUE7RUFDSSxXQUFBO0FBREo7O0FBSUE7RUFDSSxhQUFBO0FBREo7O0FBSUE7RUFDSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFESjtBQUdJO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFEUjs7QUFLQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFGSjs7QUFLQTtFQUNJLGVBQUE7RUFDQSxhQUFBO0FBRko7O0FBS0E7RUFDSSxzQkFBQTtBQUZKOztBQUtBO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FBRko7O0FBS0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFGSjs7QUFLQTtFQUNJLGFBQUE7RUFDQSwyREFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBRko7O0FBS0E7RUFFSSxrQkFBQTtFQUNBLGVBQUE7QUFISjs7QUFPQTtFQUNJLGdCQUFBO0VBQ0Esb0JBQUE7QUFKSjs7QUFPQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFKSjs7QUFPQTtFQUNJLGtCQUFBO0FBSko7O0FBT0E7RUFDSSxXQUFBO0FBSkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIjtcXG4gICAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZlxcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKVxcbn1cXG5cXG4qIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5zZWFyY2gtaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbn1cXG5cXG5tYWluIHtcXG4gICAgcGFkZGluZzogMCA1dnc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMjRweCAwO1xcbn1cXG5cXG4ucGFnZS1jb250YWluZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA0MHB4O1xcbn1cXG5cXG4ud2VhdGhlci1kYXRhLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMjRweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbn1cXG5cXG4kbW9kYWwtY29sb3I6ICNmZmY7XFxuLmxvYWRpbmctbW9kYWwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAzMDMwMzhjO1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4ubW9kYWwtY29udGVudCB7XFxuICAgIGNvbG9yOiAkbW9kYWwtY29sb3I7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMTJweDtcXG59XFxuXFxuLmNpcmNsZS1kb3Qge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbW9kYWwtY29sb3I7XFxuICAgIHdpZHRoOiAxNXB4O1xcbiAgICBoZWlnaHQ6IDE1cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzO1xcbiAgICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4uaW52aXNpYmxlLWRvdCB7XFxuICAgIG9wYWNpdHk6IDAlO1xcbn1cXG5cXG4uaGlkZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5pbmZvLWltZy1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGdhcDogMCAyNDBweDtcXG5cXG4gICAgLndlYXRoZXItZ2lmIHtcXG4gICAgICAgIG1heC13aWR0aDogOTB2dztcXG4gICAgICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gICAgfVxcbn1cXG5cXG4ucHJpbWFyeS13ZWF0aGVyLWluZm8ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDEycHg7XFxufVxcblxcbi5sb2NhdGlvbi1uYW1lIHtcXG4gICAgZm9udC1zaXplOiA0OHB4O1xcbiAgICBtYXJnaW46IDN2aCAwO1xcbn1cXG5cXG4udW5pdC10b2dnbGUge1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4udGVtcC1kaXNwbGF5IHtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXG59XFxuXFxuLmxvY2F0aW9uLXRpbWUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uc2Vjb25kYXJ5LXdlYXRoZXItaW5mbyB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDFmcikpO1xcbiAgICBnYXA6IDEycHggMDtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG5cXG5idXR0b24sIGlucHV0W3R5cGU9c3VibWl0XXtcXG4gICAgQGV4dGVuZCAuc2VhcmNoLWlucHV0O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuXFxuZm9vdGVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gICAgcGFkZGluZy1ib3R0b206IDE2cHg7XFxufVxcblxcbi5mb290ZXItdGV4dCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogNHB4O1xcbn1cXG5cXG5zdmcge1xcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVHaWZRdWVyeSIsIndlYXRoZXJEZXNjIiwidGVtcCIsIndpbmRTcGVlZCIsInVuaXRUeXBlIiwic2VhcmNoVGVybXMiLCJ1cHBlclRlbXBSYW5nZSIsImxvd2VyVGVtcFJhbmdlIiwidXBwZXJXaW5kUmFuZ2UiLCJsb3dlcldpbmRSYW5nZSIsIk51bWJlciIsInB1c2giLCJ0ZXJtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiZm9ybWF0RGF0ZSIsImRhdGVPYmoiLCJvcHRpb25zIiwibW9udGgiLCJ3ZWVrZGF5IiwieWVhciIsImRheSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInVuZGVmaW5lZCIsImZvcm1hdFRpbWUiLCJ0aW1lU3R5bGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJmb3JtYXRUZW1wIiwidW5pdFN5bWJvbCIsInJvdW5kIiwiZm9ybWF0V2luZFNwZWVkIiwidW5pdCIsImZXaW5kU3BlZWQiLCJ0b0ZpeGVkIiwicmVwbGFjZSIsImZvcm1hdFdlYXRoZXJDb25kIiwiY2FwRGVzYyIsImMiLCJ0b1VwcGVyQ2FzZSIsImZvcm1hdEljb25VUkwiLCJpY29uSWQiLCJsaW5rIiwidXJsIiwic3RhdGVNYW5hZ2VyIiwidXJsTG9jYXRpb25TdHIiLCJ1bml0cyIsImN1cnJlbnRVbml0SW5kZXgiLCJjdXJyZW50VW5pdCIsInN3YXBVbml0cyIsImdldEN1cnJlbnRVbml0Iiwic2V0TG9jYXRpb25TdHIiLCJzdHIiLCJnZXRMb2NhdGlvblN0ciIsImZpbGxOb2RlcyIsImRhdGFPYmoiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJsb2NhdGlvbkRpc3BsYXkiLCJ3ZWF0aGVyRGlzcGxheSIsInRlbXBlcmF0dXJlRGlzcGxheSIsImRhdGVEaXNwbGF5IiwidGltZURpc3BsYXkiLCJodW1pZGl0eURpc3BsYXkiLCJ3aW5kU3BlZWREaXNwbGF5IiwiaGlMb3dUZW1wRGlzcGxheSIsImZlZWxzTGlrZVRlbXBEaXNwbGF5IiwidW5pdFRvZ2dsZUJ0biIsImVyclRleHQiLCJ3ZWF0aGVySW1nIiwiaW5uZXJUZXh0IiwibmFtZSIsImRhdGUiLCJ0aW1lIiwiaHVtaWRpdHkiLCJsb3dUZW1wIiwiaGlUZW1wIiwiZmVlbHNMaWtlVGVtcCIsInNyYyIsImdldEludGVybmF0aW9uYWxUaW1lIiwidGltZXpvbmVPZmZzZXQiLCJsb2NhbERhdGUiLCJEYXRlIiwiZHQiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImZpbmFsT2Zmc2V0IiwiZmluYWxEYXRlIiwiZ2lmVVJMIiwiY29tcGxldGVHaWZVUkwiLCJmb3JtYXR0ZWRVUkwiLCJjb21wbGV0ZVdlYXRoZXJVUkwiLCJmb3JtYXRRdWVyeVN0ciIsImhhbmRsZUxvYWRTY3JlZW5BbmltYXRpb24iLCJzaG93TG9hZGluZ1NjcmVlbiIsImhpZGVMb2FkaW5nU2NyZWVuIiwiUmVzcG9uc2VFcnJvciIsIkVycm9yIiwibG9jYXRpb25Gb3JtIiwibG9hZEFuaW1hdGlvbkhhbmRsZXIiLCJxdWVyeUluZm8iLCJmZXRjaERhdGEiLCJlcnJTdHIiLCJyZXNwb25zZSIsImZldGNoIiwibW9kZSIsIm9rIiwianNvbkRhdGEiLCJqc29uIiwiaGFuZGxlRXJyb3IiLCJlcnIiLCJlcnJvclRleHQiLCJtZXNzYWdlIiwiY3JlYXRlR2lmSW1nIiwiaW1nIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImFsdCIsImltZ0NvbnRhaW5lciIsImFwcGVuZCIsImhhbmRsZUdpZlVSTCIsImdpZlF1ZXJ5Iiwic2VhcmNoVGVybSIsInVybFN0ciIsImhhbmRsZUdpZkZldGNoIiwiZGF0YSIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsIm1haW4iLCJ3aW5kIiwic3BlZWQiLCJnaWZEYXRhIiwiaW1hZ2VzIiwib3JpZ2luYWwiLCJncmFiSW5wdXRTdHJGcm9tRm9ybSIsImV2ZW50IiwiZm9ybSIsInRhcmdldCIsInNlYXJjaElucHV0IiwidmFsdWUiLCJmb3JtYXREYXRhIiwidGltZXpvbmUiLCJmZWVsc19saWtlIiwidGVtcF9tYXgiLCJ0ZW1wX21pbiIsImljb24iLCJmb3JtYXR0ZWREYXRhIiwiaGFuZGxlRGF0YSIsInN0YXJ0TG9hZGluZ1NjcmVlbiIsInN0YXJ0QW5pbWF0aW9uIiwic3RvcExvYWRpbmdTY3JlZW4iLCJzdG9wQW5pbWF0aW9uIiwiaGFuZGxlRm9ybVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwibG9jYXRpb24iLCJmb3JtYXR0ZWRMb2MiLCJ0aGVuIiwiY2F0Y2giLCJoYW5kbGVCdG5DbGljayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY29udGFpbnMiLCJpbnRlcnZhbElEIiwidGFyZ2V0RWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYW5pbUluZGV4IiwicHJldkFuaW1JbmRleCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImxvYWRTY3JlZW4iLCJmb3JtYXR0ZWRTdHIiLCJ0cmltIiwid2VhdGhlclVSTCJdLCJzb3VyY2VSb290IjoiIn0=