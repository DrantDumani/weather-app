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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Roboto\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\n}\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: \"Roboto\";\n  background-color: #000000;\n  min-height: 100vh;\n  color: #fff;\n}\n\n.search-input, button, input[type=submit] {\n  background-color: inherit;\n  color: inherit;\n  font-size: 16px;\n  font-family: inherit;\n  padding: 5px;\n  border-radius: 12px;\n}\n\nmain {\n  padding: 0 5vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 24px 0;\n}\n\n.page-container {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 40px;\n}\n\n.weather-data-container {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  border: 1px solid #fff;\n  padding: 8px;\n  border-radius: 12px;\n}\n\n.weather-desc-container {\n  display: flex;\n  align-items: center;\n}\n\n.loading-modal {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  min-height: 100vh;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgba(3, 3, 3, 0.5490196078);\n  font-size: 36px;\n  font-weight: bold;\n}\n\n.modal-content {\n  color: #fff;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.circle-dot {\n  background-color: #fff;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  transition: opacity 0.5s;\n  opacity: 100%;\n}\n\n.invisible-dot {\n  opacity: 0%;\n}\n\n.hide {\n  display: none;\n}\n\n.info-img-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0 240px;\n}\n.info-img-container .weather-gif {\n  max-width: 90vw;\n  max-height: 300px;\n  border-radius: 12px;\n}\n\n.primary-weather-info {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.location-name {\n  font-size: 48px;\n  margin: 3vh 0;\n}\n\n.unit-toggle {\n  align-self: flex-start;\n}\n\n.temp-display {\n  font-weight: bold;\n  font-size: 32px;\n}\n\n.location-time {\n  display: flex;\n  flex-direction: column;\n}\n\n.secondary-weather-info {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 12px 0;\n  font-size: 24px;\n}\n\nbutton, input[type=submit] {\n  border-radius: 8px;\n  cursor: pointer;\n}\n\nfooter {\n  margin-top: auto;\n  padding-bottom: 16px;\n}\n\n.footer-text {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\nsvg {\n  fill: currentColor;\n}\n\na:visited {\n  color: #fff;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACI,qBAAA;EACA,+DAAA;AACJ;AAEA;EACI,sBAAA;AAAJ;;AAGA;EACI,SAAA;EACA,qBAAA;EACA,yBAAA;EACA,iBAAA;EACA,WAAA;AAAJ;;AAGA;EACI,yBAAA;EACA,cAAA;EACA,eAAA;EACA,oBAAA;EACA,YAAA;EACA,mBAAA;AAAJ;;AAGA;EACI,cAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;AAAJ;;AAGA;EACI,iBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,SAAA;AAAJ;;AAGA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;EACA,sBAAA;EACA,YAAA;EACA,mBAAA;AAAJ;;AAGA;EACI,aAAA;EACA,mBAAA;AAAJ;;AAIA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,6CAAA;EACA,eAAA;EACA,iBAAA;AADJ;;AAIA;EACI,WAjBU;EAkBV,aAAA;EACA,mBAAA;EACA,SAAA;AADJ;;AAIA;EACI,sBAxBU;EAyBV,WAAA;EACA,YAAA;EACA,kBAAA;EACA,wBAAA;EACA,aAAA;AADJ;;AAIA;EACI,WAAA;AADJ;;AAIA;EACI,aAAA;AADJ;;AAIA;EACI,aAAA;EACA,eAAA;EACA,YAAA;AADJ;AAGI;EACI,eAAA;EACA,iBAAA;EACA,mBAAA;AADR;;AAKA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;AAFJ;;AAKA;EACI,eAAA;EACA,aAAA;AAFJ;;AAKA;EACI,sBAAA;AAFJ;;AAKA;EACI,iBAAA;EACA,eAAA;AAFJ;;AAKA;EACI,aAAA;EACA,sBAAA;AAFJ;;AAKA;EACI,aAAA;EACA,2DAAA;EACA,WAAA;EACA,eAAA;AAFJ;;AAKA;EAEI,kBAAA;EACA,eAAA;AAHJ;;AAOA;EACI,gBAAA;EACA,oBAAA;AAJJ;;AAOA;EACI,aAAA;EACA,mBAAA;EACA,QAAA;AAJJ;;AAOA;EACI,kBAAA;AAJJ;;AAOA;EACI,WAAA;AAJJ","sourcesContent":["@font-face {\n    font-family: \"Roboto\";\n    src: url(\"./assets/fonts/Roboto-Regular.ttf\") format(\"truetype\")\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: \"Roboto\";\n    background-color: #000000;\n    min-height: 100vh;\n    color: #fff;\n}\n\n.search-input {\n    background-color: inherit;\n    color: inherit;\n    font-size: 16px;\n    font-family: inherit;\n    padding: 5px;\n    border-radius: 12px;\n}\n\nmain {\n    padding: 0 5vw;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 24px 0;\n}\n\n.page-container {\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 40px;\n}\n\n.weather-data-container {\n    display: flex;\n    flex-direction: column;\n    gap: 24px;\n    border: 1px solid #fff;\n    padding: 8px;\n    border-radius: 12px;\n}\n\n.weather-desc-container {\n    display: flex;\n    align-items: center;\n}\n\n$modal-color: #fff;\n.loading-modal {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100vw;\n    min-height: 100vh;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background-color: #0303038c;\n    font-size: 36px;\n    font-weight: bold;\n}\n\n.modal-content {\n    color: $modal-color;\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.circle-dot {\n    background-color: $modal-color;\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    transition: opacity 0.5s;\n    opacity: 100%;\n}\n\n.invisible-dot {\n    opacity: 0%;\n}\n\n.hide {\n    display: none;\n}\n\n.info-img-container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0 240px;\n\n    .weather-gif {\n        max-width: 90vw;\n        max-height: 300px;\n        border-radius: 12px;\n    }\n}\n\n.primary-weather-info {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n.location-name {\n    font-size: 48px;\n    margin: 3vh 0;\n}\n\n.unit-toggle {\n    align-self: flex-start;\n}\n\n.temp-display {\n    font-weight: bold;\n    font-size: 32px;\n}\n\n.location-time {\n    display: flex;\n    flex-direction: column;\n}\n\n.secondary-weather-info {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n    gap: 12px 0;\n    font-size: 24px;\n}\n\nbutton, input[type=submit]{\n    @extend .search-input;\n    border-radius: 8px;\n    cursor: pointer;\n}\n\n\nfooter {\n    margin-top: auto;\n    padding-bottom: 16px;\n}\n\n.footer-text {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n\nsvg {\n    fill: currentColor;\n}\n\na:visited {\n    color: #fff;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yy9jcmVhdGVHaWZRdWVyeS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhRm9ybWF0SGVscGVyRm5zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGFTdGF0ZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZmlsbE5vZGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dldFRpbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2lmVVJMLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvYWRTY3JlZW5IYW5kbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VybFN0ckZvcm1hdC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyVVJMLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUdpZlF1ZXJ5KHdlYXRoZXJEZXNjLCB0ZW1wLCB3aW5kU3BlZWQsIHVuaXRUeXBlKSB7XG4gIGNvbnN0IHNlYXJjaFRlcm1zID0gW3dlYXRoZXJEZXNjXTtcbiAgbGV0IHVwcGVyVGVtcFJhbmdlO1xuICBsZXQgbG93ZXJUZW1wUmFuZ2U7XG4gIGxldCB1cHBlcldpbmRSYW5nZTtcbiAgbGV0IGxvd2VyV2luZFJhbmdlO1xuICBpZiAodW5pdFR5cGUgPT09ICdpbXBlcmlhbCcpIHtcbiAgICBbbG93ZXJUZW1wUmFuZ2UsIHVwcGVyVGVtcFJhbmdlXSA9IFs0NiwgNzhdO1xuICAgIFtsb3dlcldpbmRSYW5nZSwgdXBwZXJXaW5kUmFuZ2VdID0gWzIwLCAyNV07XG4gIH0gZWxzZSB7XG4gICAgW2xvd2VyVGVtcFJhbmdlLCB1cHBlclRlbXBSYW5nZV0gPSBbOCwgMjVdO1xuICAgIFtsb3dlcldpbmRSYW5nZSwgdXBwZXJXaW5kUmFuZ2VdID0gWzksIDExXTtcbiAgfVxuICBpZiAoTnVtYmVyKHRlbXApID4gdXBwZXJUZW1wUmFuZ2UpIHtcbiAgICBzZWFyY2hUZXJtcy5wdXNoKCdob3QnKTtcbiAgfSBlbHNlIGlmIChOdW1iZXIodGVtcCkgPCBsb3dlclRlbXBSYW5nZSkge1xuICAgIHNlYXJjaFRlcm1zLnB1c2goJ2NvbGQnKTtcbiAgfVxuICBpZiAoTnVtYmVyKHdpbmRTcGVlZCkgPiB1cHBlcldpbmRSYW5nZSkge1xuICAgIHNlYXJjaFRlcm1zLnB1c2goJ3dpbmR5Jyk7XG4gIH0gZWxzZSBpZiAoTnVtYmVyKHdpbmRTcGVlZCkgPiBsb3dlcldpbmRSYW5nZSkge1xuICAgIHNlYXJjaFRlcm1zLnB1c2goJ2JyZWV6eScpO1xuICB9XG4gIGNvbnN0IHRlcm0gPSBzZWFyY2hUZXJtc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzZWFyY2hUZXJtcy5sZW5ndGgpXTtcbiAgcmV0dXJuIHRlcm07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdpZlF1ZXJ5O1xuIiwiZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlT2JqKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgbW9udGg6ICdzaG9ydCcsIHdlZWtkYXk6ICdsb25nJywgeWVhcjogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyxcbiAgfTtcbiAgcmV0dXJuIGRhdGVPYmoudG9Mb2NhbGVEYXRlU3RyaW5nKHVuZGVmaW5lZCwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoZGF0ZU9iaikge1xuICBjb25zdCBvcHRpb25zID0geyB0aW1lU3R5bGU6ICdzaG9ydCcgfTtcbiAgcmV0dXJuIGRhdGVPYmoudG9Mb2NhbGVUaW1lU3RyaW5nKHVuZGVmaW5lZCwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRlbXAodGVtcCwgdW5pdFR5cGUpIHtcbiAgY29uc3QgdW5pdFN5bWJvbCA9IHVuaXRUeXBlID09PSAnaW1wZXJpYWwnID8gJ0YnIDogJ0MnO1xuICByZXR1cm4gYCR7TWF0aC5yb3VuZChOdW1iZXIodGVtcCkpfSBcXHUwMEIwJHt1bml0U3ltYm9sfWA7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFdpbmRTcGVlZCh3aW5kU3BlZWQsIHVuaXRUeXBlKSB7XG4gIGxldCB1bml0O1xuICBsZXQgZldpbmRTcGVlZDtcbiAgaWYgKHVuaXRUeXBlID09PSAnaW1wZXJpYWwnKSB7XG4gICAgZldpbmRTcGVlZCA9IE51bWJlcih3aW5kU3BlZWQpLnRvRml4ZWQoMSkucmVwbGFjZSgvXFwuPzAqJC8sICcnKTtcbiAgICB1bml0ID0gJ21waCc7XG4gIH0gZWxzZSB7XG4gICAgZldpbmRTcGVlZCA9IChOdW1iZXIod2luZFNwZWVkKSAqIDMuNikudG9GaXhlZCgxKS5yZXBsYWNlKC9cXC4/MCokLywgJycpO1xuICAgIHVuaXQgPSAna20vaCc7XG4gIH1cbiAgcmV0dXJuIGAke2ZXaW5kU3BlZWR9ICR7dW5pdH1gO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRXZWF0aGVyQ29uZCh3ZWF0aGVyRGVzYykge1xuICBsZXQgY2FwRGVzYyA9IHdlYXRoZXJEZXNjLnJlcGxhY2UoL1xcYlxcdy9nLCAoYykgPT4gYy50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIGNhcERlc2M7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEljb25VUkwoaWNvbklkKSB7XG4gIGNvbnN0IGxpbmsgPSAnaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vMTBkQDJ4LnBuZyc7XG4gIGNvbnN0IHVybCA9IGxpbmsucmVwbGFjZSgvXFxkK2QvLCBpY29uSWQpO1xuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQge1xuICBmb3JtYXREYXRlLCBmb3JtYXRUZW1wLCBmb3JtYXRUaW1lLCBmb3JtYXRXaW5kU3BlZWQsIGZvcm1hdFdlYXRoZXJDb25kLCBmb3JtYXRJY29uVVJMLFxufTtcbiIsImZ1bmN0aW9uIHN0YXRlTWFuYWdlcigpIHtcbiAgbGV0IHVybExvY2F0aW9uU3RyID0gJyc7XG4gIGNvbnN0IHVuaXRzID0gWydpbXBlcmlhbCcsICdtZXRyaWMnXTtcbiAgbGV0IGN1cnJlbnRVbml0SW5kZXggPSAwO1xuICBsZXQgY3VycmVudFVuaXQgPSB1bml0c1tjdXJyZW50VW5pdEluZGV4XTtcbiAgY29uc3Qgc3dhcFVuaXRzID0gKCkgPT4ge1xuICAgIGN1cnJlbnRVbml0SW5kZXggPSAoY3VycmVudFVuaXRJbmRleCArIDEpICUgdW5pdHMubGVuZ3RoO1xuICAgIGN1cnJlbnRVbml0ID0gdW5pdHNbY3VycmVudFVuaXRJbmRleF07XG4gIH07XG4gIGNvbnN0IGdldEN1cnJlbnRVbml0ID0gKCkgPT4gY3VycmVudFVuaXQ7XG4gIGNvbnN0IHNldExvY2F0aW9uU3RyID0gKHN0cikgPT4geyB1cmxMb2NhdGlvblN0ciA9IHN0cjsgfTtcbiAgY29uc3QgZ2V0TG9jYXRpb25TdHIgPSAoKSA9PiB1cmxMb2NhdGlvblN0cjtcbiAgcmV0dXJuIHtcbiAgICBnZXRDdXJyZW50VW5pdCwgc3dhcFVuaXRzLCBzZXRMb2NhdGlvblN0ciwgZ2V0TG9jYXRpb25TdHIsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXRlTWFuYWdlcjtcbiIsImZ1bmN0aW9uIGZpbGxOb2RlcyhkYXRhT2JqLCB1bml0VHlwZSkge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1kYXRhLWNvbnRhaW5lcicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBjb25zdCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24tbmFtZScpO1xuICBjb25zdCB3ZWF0aGVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWRlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IHRlbXBlcmF0dXJlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wLWRpc3BsYXknKTtcbiAgY29uc3QgZGF0ZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZS1kaXNwbGF5Jyk7XG4gIGNvbnN0IHRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUtZGlzcGxheScpO1xuICBjb25zdCBodW1pZGl0eURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHktZGlzcGxheScpO1xuICBjb25zdCB3aW5kU3BlZWREaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQtc3BlZWQtZGlzcGxheScpO1xuICBjb25zdCBoaUxvd1RlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpLWxvdy10ZW1wJyk7XG4gIGNvbnN0IGZlZWxzTGlrZVRlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UtdGVtcCcpO1xuICBjb25zdCB1bml0VG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuaXQtdG9nZ2xlJyk7XG4gIGNvbnN0IGVyclRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWVycm9yLXRleHQnKTtcbiAgY29uc3Qgd2VhdGhlckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXN2Zy1pY29uJyk7XG5cbiAgbG9jYXRpb25EaXNwbGF5LmlubmVyVGV4dCA9IGRhdGFPYmoubmFtZTtcbiAgd2VhdGhlckRpc3BsYXkuaW5uZXJUZXh0ID0gZGF0YU9iai53ZWF0aGVyRGVzYztcbiAgdGVtcGVyYXR1cmVEaXNwbGF5LmlubmVyVGV4dCA9IGRhdGFPYmoudGVtcDtcbiAgZGF0ZURpc3BsYXkuaW5uZXJUZXh0ID0gZGF0YU9iai5kYXRlO1xuICB0aW1lRGlzcGxheS5pbm5lclRleHQgPSBkYXRhT2JqLnRpbWU7XG4gIGh1bWlkaXR5RGlzcGxheS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7ZGF0YU9iai5odW1pZGl0eX0lYDtcbiAgd2luZFNwZWVkRGlzcGxheS5pbm5lclRleHQgPSBgV2luZCBzcGVlZDogJHtkYXRhT2JqLndpbmRTcGVlZH1gO1xuICBoaUxvd1RlbXBEaXNwbGF5LmlubmVyVGV4dCA9IGBIaTogJHtkYXRhT2JqLmxvd1RlbXB9IHwgTG86ICR7ZGF0YU9iai5oaVRlbXB9YDtcbiAgZmVlbHNMaWtlVGVtcERpc3BsYXkuaW5uZXJUZXh0ID0gYEZlZWxzIGxpa2U6ICR7ZGF0YU9iai5mZWVsc0xpa2VUZW1wfWA7XG4gIHdlYXRoZXJJbWcuc3JjID0gZGF0YU9iai5pY29uSWQ7XG4gIHdlYXRoZXJJbWcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBlcnJUZXh0LmlubmVyVGV4dCA9ICcnO1xuICBpZiAodW5pdFR5cGUgPT09ICdpbXBlcmlhbCcpIHtcbiAgICB1bml0VG9nZ2xlQnRuLmlubmVyVGV4dCA9ICdNZXRyaWMgdW5pdHMnO1xuICB9IGVsc2Uge1xuICAgIHVuaXRUb2dnbGVCdG4uaW5uZXJUZXh0ID0gJ0ltcGVyaWFsIFVuaXRzJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmaWxsTm9kZXM7XG4iLCJmdW5jdGlvbiBnZXRJbnRlcm5hdGlvbmFsVGltZSh0aW1lem9uZU9mZnNldCkge1xuICBjb25zdCBsb2NhbERhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkdCA9IGxvY2FsRGF0ZS5nZXRUaW1lKCk7XG4gIGNvbnN0IGxvY2FsT2Zmc2V0ID0gbG9jYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgY29uc3QgZmluYWxPZmZzZXQgPSBsb2NhbE9mZnNldCArICh0aW1lem9uZU9mZnNldCAqIDEwMDApO1xuICBjb25zdCBmaW5hbERhdGUgPSBuZXcgRGF0ZShkdCArIGZpbmFsT2Zmc2V0KTtcbiAgcmV0dXJuIGZpbmFsRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0SW50ZXJuYXRpb25hbFRpbWU7XG4iLCJjb25zdCBnaWZVUkwgPSAnaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvdHJhbnNsYXRlP2FwaV9rZXk9TU1TR2NycHlXRWVub3lrRmNPMzNLU21hRHBzbE42Ulcmcz0nO1xuXG5mdW5jdGlvbiBjb21wbGV0ZUdpZlVSTChzdHIpIHtcbiAgY29uc3QgZm9ybWF0dGVkVVJMID0gYCR7Z2lmVVJMfSR7c3RyfWA7XG4gIHJldHVybiBmb3JtYXR0ZWRVUkw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBsZXRlR2lmVVJMO1xuIiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHN0YXRlTWFuYWdlciBmcm9tICcuL2RhdGFTdGF0ZU1hbmFnZXInO1xuaW1wb3J0IHtcbiAgZm9ybWF0RGF0ZSwgZm9ybWF0VGVtcCwgZm9ybWF0VGltZSwgZm9ybWF0V2luZFNwZWVkLCBmb3JtYXRXZWF0aGVyQ29uZCwgZm9ybWF0SWNvblVSTCxcbn0gZnJvbSAnLi9kYXRhRm9ybWF0SGVscGVyRm5zJztcbmltcG9ydCBjb21wbGV0ZUdpZlVSTCBmcm9tICcuL2dpZlVSTCc7XG5pbXBvcnQgY29tcGxldGVXZWF0aGVyVVJMIGZyb20gJy4vd2VhdGhlclVSTCc7XG5pbXBvcnQgZ2V0SW50ZXJuYXRpb25hbFRpbWUgZnJvbSAnLi9nZXRUaW1lJztcbmltcG9ydCBmb3JtYXRRdWVyeVN0ciBmcm9tICcuL3VybFN0ckZvcm1hdCc7XG5pbXBvcnQgZmlsbE5vZGVzIGZyb20gJy4vZmlsbE5vZGVzJztcbmltcG9ydCBjcmVhdGVHaWZRdWVyeSBmcm9tICcuL2NyZWF0ZUdpZlF1ZXJ5JztcbmltcG9ydCB7IGhhbmRsZUxvYWRTY3JlZW5BbmltYXRpb24sIHNob3dMb2FkaW5nU2NyZWVuLCBoaWRlTG9hZGluZ1NjcmVlbiB9IGZyb20gJy4vbG9hZFNjcmVlbkhhbmRsZXInO1xuXG5jbGFzcyBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuY29uc3QgbG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uLWZvcm0nKTtcbmNvbnN0IGxvYWRBbmltYXRpb25IYW5kbGVyID0gaGFuZGxlTG9hZFNjcmVlbkFuaW1hdGlvbigpO1xuY29uc3QgcXVlcnlJbmZvID0gc3RhdGVNYW5hZ2VyKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YSh1cmwsIGVyclN0cikge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiAnY29ycycgfSk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgUmVzcG9uc2VFcnJvcihlcnJTdHIpO1xuICB9XG4gIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4ganNvbkRhdGE7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICBpZiAoZXJyIGluc3RhbmNlb2YgUmVzcG9uc2VFcnJvcikge1xuICAgIGNvbnN0IGVycm9yVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZXJyb3ItdGV4dCcpO1xuICAgIGVycm9yVGV4dC5pbm5lclRleHQgPSBlcnIubWVzc2FnZTtcbiAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihlcnIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHaWZJbWcoc3JjKSB7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWdpZicpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBpbWcuY2xhc3NMaXN0LmFkZCgnd2VhdGhlci1naWYnKTtcbiAgaW1nLmFsdCA9ICdXZWF0aGVyIFZpc3VhbGl6YXRpb24nO1xuICBpbWcuc3JjID0gc3JjO1xuICBjb25zdCBpbWdDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2lmLWNvbnRhaW5lcicpO1xuICBpbWdDb250YWluZXIuYXBwZW5kKGltZyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUdpZlVSTCh3ZWF0aGVyRGVzYywgdGVtcCwgd2luZFNwZWVkLCB1bml0VHlwZSkge1xuICBjb25zdCBnaWZRdWVyeSA9IGNyZWF0ZUdpZlF1ZXJ5KHdlYXRoZXJEZXNjLCB0ZW1wLCB3aW5kU3BlZWQsIHVuaXRUeXBlKTtcbiAgY29uc3Qgc2VhcmNoVGVybSA9IGZvcm1hdFF1ZXJ5U3RyKGdpZlF1ZXJ5KTtcbiAgY29uc3QgdXJsU3RyID0gY29tcGxldGVHaWZVUkwoc2VhcmNoVGVybSk7XG4gIHJldHVybiB1cmxTdHI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdpZkZldGNoKGRhdGEpIHtcbiAgY29uc3Qgd2VhdGhlckRlc2MgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gIGNvbnN0IHsgdGVtcCB9ID0gZGF0YS5tYWluO1xuICBjb25zdCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gIGNvbnN0IHVuaXRUeXBlID0gcXVlcnlJbmZvLmdldEN1cnJlbnRVbml0KCk7XG4gIGNvbnN0IHVybFN0ciA9IGhhbmRsZUdpZlVSTCh3ZWF0aGVyRGVzYywgdGVtcCwgd2luZFNwZWVkLCB1bml0VHlwZSk7XG4gIGNvbnN0IGdpZkRhdGEgPSBhd2FpdCBmZXRjaERhdGEodXJsU3RyLCAnRmFpbGVkIHRvIGZldGNoIGdpZicpO1xuICBjb25zdCB7IHVybCB9ID0gZ2lmRGF0YS5kYXRhLmltYWdlcy5vcmlnaW5hbDtcbiAgY3JlYXRlR2lmSW1nKHVybCk7XG59XG5cbmZ1bmN0aW9uIGdyYWJJbnB1dFN0ckZyb21Gb3JtKGV2ZW50KSB7XG4gIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG4gIGNvbnN0IHN0ciA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRhKGRhdGFPYmopIHtcbiAgY29uc3QgZGF0ZU9iaiA9IGdldEludGVybmF0aW9uYWxUaW1lKGRhdGFPYmoudGltZXpvbmUpO1xuICBjb25zdCB3ZWF0aGVyRGVzYyA9IGZvcm1hdFdlYXRoZXJDb25kKGRhdGFPYmoud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gIGNvbnN0IHRpbWUgPSBmb3JtYXRUaW1lKGRhdGVPYmopO1xuICBjb25zdCBkYXRlID0gZm9ybWF0RGF0ZShkYXRlT2JqKTtcbiAgY29uc3QgdGVtcCA9IGZvcm1hdFRlbXAoZGF0YU9iai5tYWluLnRlbXAsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgZmVlbHNMaWtlVGVtcCA9IGZvcm1hdFRlbXAoZGF0YU9iai5tYWluLmZlZWxzX2xpa2UsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgaGlUZW1wID0gZm9ybWF0VGVtcChkYXRhT2JqLm1haW4udGVtcF9tYXgsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgbG93VGVtcCA9IGZvcm1hdFRlbXAoZGF0YU9iai5tYWluLnRlbXBfbWluLCBxdWVyeUluZm8uZ2V0Q3VycmVudFVuaXQoKSk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGZvcm1hdFdpbmRTcGVlZChkYXRhT2JqLndpbmQuc3BlZWQsIHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpKTtcbiAgY29uc3QgaWNvbklkID0gZm9ybWF0SWNvblVSTChkYXRhT2JqLndlYXRoZXJbMF0uaWNvbik7XG5cbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IHtcbiAgICBuYW1lOiBkYXRhT2JqLm5hbWUsXG4gICAgaHVtaWRpdHk6IGRhdGFPYmoubWFpbi5odW1pZGl0eSxcbiAgICB3ZWF0aGVyRGVzYyxcbiAgICBpY29uSWQsXG4gICAgdGVtcCxcbiAgICB0aW1lLFxuICAgIGRhdGUsXG4gICAgZmVlbHNMaWtlVGVtcCxcbiAgICBoaVRlbXAsXG4gICAgbG93VGVtcCxcbiAgICB3aW5kU3BlZWQsXG4gIH07XG4gIHJldHVybiBmb3JtYXR0ZWREYXRhO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEYXRhKGRhdGEpIHtcbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IGZvcm1hdERhdGEoZGF0YSk7XG4gIGZpbGxOb2Rlcyhmb3JtYXR0ZWREYXRhLCBxdWVyeUluZm8uZ2V0Q3VycmVudFVuaXQoKSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZ1NjcmVlbigpIHtcbiAgc2hvd0xvYWRpbmdTY3JlZW4oKTtcbiAgbG9hZEFuaW1hdGlvbkhhbmRsZXIuc3RhcnRBbmltYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gc3RvcExvYWRpbmdTY3JlZW4oKSB7XG4gIGhpZGVMb2FkaW5nU2NyZWVuKCk7XG4gIGxvYWRBbmltYXRpb25IYW5kbGVyLnN0b3BBbmltYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBsb2NhdGlvbiA9IGdyYWJJbnB1dFN0ckZyb21Gb3JtKGV2ZW50KTtcbiAgY29uc3QgZm9ybWF0dGVkTG9jID0gZm9ybWF0UXVlcnlTdHIobG9jYXRpb24pO1xuICBxdWVyeUluZm8uc2V0TG9jYXRpb25TdHIoZm9ybWF0dGVkTG9jKTtcbiAgY29uc3QgdXJsID0gY29tcGxldGVXZWF0aGVyVVJMKGZvcm1hdHRlZExvYywgcXVlcnlJbmZvLmdldEN1cnJlbnRVbml0KCkpO1xuICBzdGFydExvYWRpbmdTY3JlZW4oKTtcbiAgZmV0Y2hEYXRhKHVybCwgJ0ludmFsaWQgbG9jYXRpb24gZW50ZXJlZCcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBzdG9wTG9hZGluZ1NjcmVlbigpO1xuICAgIGhhbmRsZURhdGEoanNvbik7XG4gICAgcmV0dXJuIGpzb247XG4gIH0pLnRoZW4oaGFuZGxlR2lmRmV0Y2gpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgICBzdG9wTG9hZGluZ1NjcmVlbigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCdG5DbGljaygpIHtcbiAgcXVlcnlJbmZvLnN3YXBVbml0cygpO1xuICBjb25zdCB1bml0VHlwZSA9IHF1ZXJ5SW5mby5nZXRDdXJyZW50VW5pdCgpO1xuICBjb25zdCBsb2NhdGlvbiA9IHF1ZXJ5SW5mby5nZXRMb2NhdGlvblN0cigpO1xuICBjb25zdCB1cmwgPSBjb21wbGV0ZVdlYXRoZXJVUkwobG9jYXRpb24sIHVuaXRUeXBlKTtcbiAgc3RhcnRMb2FkaW5nU2NyZWVuKCk7XG4gIGZldGNoRGF0YSh1cmwsICdGYWlsZWQgdG8gZmV0Y2ggZ2lmJykudGhlbigoanNvbikgPT4ge1xuICAgIHN0b3BMb2FkaW5nU2NyZWVuKCk7XG4gICAgaGFuZGxlRGF0YShqc29uKTtcbiAgfSlcbiAgICAuY2F0Y2goaGFuZGxlRXJyb3IpO1xufVxuXG5sb2NhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlRm9ybVN1Ym1pdCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndW5pdC10b2dnbGUnKSkge1xuICAgIGhhbmRsZUJ0bkNsaWNrKCk7XG4gIH1cbn0pO1xuIiwiZnVuY3Rpb24gaGFuZGxlTG9hZFNjcmVlbkFuaW1hdGlvbigpIHtcbiAgbGV0IGludGVydmFsSUQ7XG4gIGNvbnN0IHRhcmdldEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZS1kb3QnKTtcbiAgbGV0IGFuaW1JbmRleCA9IDA7XG4gIGxldCBwcmV2QW5pbUluZGV4ID0gdGFyZ2V0RWxlbXMubGVuZ3RoIC0gMTtcblxuICBjb25zdCBzdGFydEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGFyZ2V0RWxlbXNbYW5pbUluZGV4XS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZG90Jyk7XG4gICAgICB0YXJnZXRFbGVtc1twcmV2QW5pbUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUtZG90Jyk7XG4gICAgICBwcmV2QW5pbUluZGV4ID0gYW5pbUluZGV4O1xuICAgICAgYW5pbUluZGV4ID0gKGFuaW1JbmRleCArIDEpICUgdGFyZ2V0RWxlbXMubGVuZ3RoO1xuICAgIH0sIDEwMDApO1xuICB9O1xuXG4gIGNvbnN0IHN0b3BBbmltYXRpb24gPSAoKSA9PiB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICBhbmltSW5kZXggPSAwO1xuICAgIHByZXZBbmltSW5kZXggPSB0YXJnZXRFbGVtcy5sZW5ndGggLSAxO1xuICB9O1xuICByZXR1cm4geyBzdGFydEFuaW1hdGlvbiwgc3RvcEFuaW1hdGlvbiB9O1xufVxuXG5mdW5jdGlvbiBzaG93TG9hZGluZ1NjcmVlbigpIHtcbiAgY29uc3QgbG9hZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW1vZGFsJyk7XG4gIGxvYWRTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufVxuXG5mdW5jdGlvbiBoaWRlTG9hZGluZ1NjcmVlbigpIHtcbiAgY29uc3QgbG9hZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW1vZGFsJyk7XG4gIGxvYWRTY3JlZW4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufVxuXG5leHBvcnQgeyBoYW5kbGVMb2FkU2NyZWVuQW5pbWF0aW9uLCBzaG93TG9hZGluZ1NjcmVlbiwgaGlkZUxvYWRpbmdTY3JlZW4gfTtcbiIsImZ1bmN0aW9uIGZvcm1hdFF1ZXJ5U3RyKHN0cikge1xuICBjb25zdCBmb3JtYXR0ZWRTdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoL1xccysvLCAnKycpO1xuICByZXR1cm4gZm9ybWF0dGVkU3RyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXRRdWVyeVN0cjtcbiIsImNvbnN0IHdlYXRoZXJVUkwgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0mYXBwaWQ9YmU1NmI5YjNhNGI0YmM5NzM1OTFiZWU1YzA3MTY3NjYnO1xuXG5mdW5jdGlvbiBjb21wbGV0ZVdlYXRoZXJVUkwobG9jYXRpb24sIHVuaXQpIHtcbiAgY29uc3QgZm9ybWF0dGVkVVJMID0gYCR7d2VhdGhlclVSTC5yZXBsYWNlKC9xPVxcdyooPz0mKS8sIGBxPSR7bG9jYXRpb259YCl9JnVuaXRzPSR7dW5pdH1gO1xuICByZXR1cm4gZm9ybWF0dGVkVVJMO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wbGV0ZVdlYXRoZXJVUkw7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbn1cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5zZWFyY2gtaW5wdXQsIGJ1dHRvbiwgaW5wdXRbdHlwZT1zdWJtaXRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXG59XFxuXFxubWFpbiB7XFxuICBwYWRkaW5nOiAwIDV2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjRweCAwO1xcbn1cXG5cXG4ucGFnZS1jb250YWluZXIge1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDQwcHg7XFxufVxcblxcbi53ZWF0aGVyLWRhdGEtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxufVxcblxcbi53ZWF0aGVyLWRlc2MtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubG9hZGluZy1tb2RhbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzLCAzLCAzLCAwLjU0OTAxOTYwNzgpO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5tb2RhbC1jb250ZW50IHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEycHg7XFxufVxcblxcbi5jaXJjbGUtZG90IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cztcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbi5pbnZpc2libGUtZG90IHtcXG4gIG9wYWNpdHk6IDAlO1xcbn1cXG5cXG4uaGlkZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaW5mby1pbWctY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBnYXA6IDAgMjQwcHg7XFxufVxcbi5pbmZvLWltZy1jb250YWluZXIgLndlYXRoZXItZ2lmIHtcXG4gIG1heC13aWR0aDogOTB2dztcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXG59XFxuXFxuLnByaW1hcnktd2VhdGhlci1pbmZvIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxMnB4O1xcbn1cXG5cXG4ubG9jYXRpb24tbmFtZSB7XFxuICBmb250LXNpemU6IDQ4cHg7XFxuICBtYXJnaW46IDN2aCAwO1xcbn1cXG5cXG4udW5pdC10b2dnbGUge1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuXFxuLnRlbXAtZGlzcGxheSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG59XFxuXFxuLmxvY2F0aW9uLXRpbWUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5zZWNvbmRhcnktd2VhdGhlci1pbmZvIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcXG4gIGdhcDogMTJweCAwO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG5cXG5idXR0b24sIGlucHV0W3R5cGU9c3VibWl0XSB7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XFxufVxcblxcbi5mb290ZXItdGV4dCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogNHB4O1xcbn1cXG5cXG5zdmcge1xcbiAgZmlsbDogY3VycmVudENvbG9yO1xcbn1cXG5cXG5hOnZpc2l0ZWQge1xcbiAgY29sb3I6ICNmZmY7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0kscUJBQUE7RUFDQSwrREFBQTtBQUNKO0FBRUE7RUFDSSxzQkFBQTtBQUFKOztBQUdBO0VBQ0ksU0FBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUFBSjs7QUFHQTtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksY0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUdBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBQUo7O0FBSUE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsNkNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFESjs7QUFJQTtFQUNJLFdBakJVO0VBa0JWLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFESjs7QUFJQTtFQUNJLHNCQXhCVTtFQXlCVixXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxhQUFBO0FBREo7O0FBSUE7RUFDSSxXQUFBO0FBREo7O0FBSUE7RUFDSSxhQUFBO0FBREo7O0FBSUE7RUFDSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFESjtBQUdJO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFEUjs7QUFLQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFGSjs7QUFLQTtFQUNJLGVBQUE7RUFDQSxhQUFBO0FBRko7O0FBS0E7RUFDSSxzQkFBQTtBQUZKOztBQUtBO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FBRko7O0FBS0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFGSjs7QUFLQTtFQUNJLGFBQUE7RUFDQSwyREFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBRko7O0FBS0E7RUFFSSxrQkFBQTtFQUNBLGVBQUE7QUFISjs7QUFPQTtFQUNJLGdCQUFBO0VBQ0Esb0JBQUE7QUFKSjs7QUFPQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFKSjs7QUFPQTtFQUNJLGtCQUFBO0FBSko7O0FBT0E7RUFDSSxXQUFBO0FBSkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIjtcXG4gICAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZlxcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKVxcbn1cXG5cXG4qIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5zZWFyY2gtaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbn1cXG5cXG5tYWluIHtcXG4gICAgcGFkZGluZzogMCA1dnc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMjRweCAwO1xcbn1cXG5cXG4ucGFnZS1jb250YWluZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA0MHB4O1xcbn1cXG5cXG4ud2VhdGhlci1kYXRhLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMjRweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbn1cXG5cXG4ud2VhdGhlci1kZXNjLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiRtb2RhbC1jb2xvcjogI2ZmZjtcXG4ubG9hZGluZy1tb2RhbCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDMwMzAzOGM7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5tb2RhbC1jb250ZW50IHtcXG4gICAgY29sb3I6ICRtb2RhbC1jb2xvcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMnB4O1xcbn1cXG5cXG4uY2lyY2xlLWRvdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRtb2RhbC1jb2xvcjtcXG4gICAgd2lkdGg6IDE1cHg7XFxuICAgIGhlaWdodDogMTVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXM7XFxuICAgIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbi5pbnZpc2libGUtZG90IHtcXG4gICAgb3BhY2l0eTogMCU7XFxufVxcblxcbi5oaWRlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmluZm8taW1nLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgZ2FwOiAwIDI0MHB4O1xcblxcbiAgICAud2VhdGhlci1naWYge1xcbiAgICAgICAgbWF4LXdpZHRoOiA5MHZ3O1xcbiAgICAgICAgbWF4LWhlaWdodDogMzAwcHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgICB9XFxufVxcblxcbi5wcmltYXJ5LXdlYXRoZXItaW5mbyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMTJweDtcXG59XFxuXFxuLmxvY2F0aW9uLW5hbWUge1xcbiAgICBmb250LXNpemU6IDQ4cHg7XFxuICAgIG1hcmdpbjogM3ZoIDA7XFxufVxcblxcbi51bml0LXRvZ2dsZSB7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi50ZW1wLWRpc3BsYXkge1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcbn1cXG5cXG4ubG9jYXRpb24tdGltZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5zZWNvbmRhcnktd2VhdGhlci1pbmZvIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgzMDBweCwgMWZyKSk7XFxuICAgIGdhcDogMTJweCAwO1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxufVxcblxcbmJ1dHRvbiwgaW5wdXRbdHlwZT1zdWJtaXRde1xcbiAgICBAZXh0ZW5kIC5zZWFyY2gtaW5wdXQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5cXG5mb290ZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG59XFxuXFxuLmZvb3Rlci10ZXh0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA0cHg7XFxufVxcblxcbnN2ZyB7XFxuICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcXG59XFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZUdpZlF1ZXJ5Iiwid2VhdGhlckRlc2MiLCJ0ZW1wIiwid2luZFNwZWVkIiwidW5pdFR5cGUiLCJzZWFyY2hUZXJtcyIsInVwcGVyVGVtcFJhbmdlIiwibG93ZXJUZW1wUmFuZ2UiLCJ1cHBlcldpbmRSYW5nZSIsImxvd2VyV2luZFJhbmdlIiwiTnVtYmVyIiwicHVzaCIsInRlcm0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJmb3JtYXREYXRlIiwiZGF0ZU9iaiIsIm9wdGlvbnMiLCJtb250aCIsIndlZWtkYXkiLCJ5ZWFyIiwiZGF5IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidW5kZWZpbmVkIiwiZm9ybWF0VGltZSIsInRpbWVTdHlsZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImZvcm1hdFRlbXAiLCJ1bml0U3ltYm9sIiwicm91bmQiLCJmb3JtYXRXaW5kU3BlZWQiLCJ1bml0IiwiZldpbmRTcGVlZCIsInRvRml4ZWQiLCJyZXBsYWNlIiwiZm9ybWF0V2VhdGhlckNvbmQiLCJjYXBEZXNjIiwiYyIsInRvVXBwZXJDYXNlIiwiZm9ybWF0SWNvblVSTCIsImljb25JZCIsImxpbmsiLCJ1cmwiLCJzdGF0ZU1hbmFnZXIiLCJ1cmxMb2NhdGlvblN0ciIsInVuaXRzIiwiY3VycmVudFVuaXRJbmRleCIsImN1cnJlbnRVbml0Iiwic3dhcFVuaXRzIiwiZ2V0Q3VycmVudFVuaXQiLCJzZXRMb2NhdGlvblN0ciIsInN0ciIsImdldExvY2F0aW9uU3RyIiwiZmlsbE5vZGVzIiwiZGF0YU9iaiIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImxvY2F0aW9uRGlzcGxheSIsIndlYXRoZXJEaXNwbGF5IiwidGVtcGVyYXR1cmVEaXNwbGF5IiwiZGF0ZURpc3BsYXkiLCJ0aW1lRGlzcGxheSIsImh1bWlkaXR5RGlzcGxheSIsIndpbmRTcGVlZERpc3BsYXkiLCJoaUxvd1RlbXBEaXNwbGF5IiwiZmVlbHNMaWtlVGVtcERpc3BsYXkiLCJ1bml0VG9nZ2xlQnRuIiwiZXJyVGV4dCIsIndlYXRoZXJJbWciLCJpbm5lclRleHQiLCJuYW1lIiwiZGF0ZSIsInRpbWUiLCJodW1pZGl0eSIsImxvd1RlbXAiLCJoaVRlbXAiLCJmZWVsc0xpa2VUZW1wIiwic3JjIiwiZ2V0SW50ZXJuYXRpb25hbFRpbWUiLCJ0aW1lem9uZU9mZnNldCIsImxvY2FsRGF0ZSIsIkRhdGUiLCJkdCIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwiZmluYWxPZmZzZXQiLCJmaW5hbERhdGUiLCJnaWZVUkwiLCJjb21wbGV0ZUdpZlVSTCIsImZvcm1hdHRlZFVSTCIsImNvbXBsZXRlV2VhdGhlclVSTCIsImZvcm1hdFF1ZXJ5U3RyIiwiaGFuZGxlTG9hZFNjcmVlbkFuaW1hdGlvbiIsInNob3dMb2FkaW5nU2NyZWVuIiwiaGlkZUxvYWRpbmdTY3JlZW4iLCJSZXNwb25zZUVycm9yIiwiRXJyb3IiLCJsb2NhdGlvbkZvcm0iLCJsb2FkQW5pbWF0aW9uSGFuZGxlciIsInF1ZXJ5SW5mbyIsImZldGNoRGF0YSIsImVyclN0ciIsInJlc3BvbnNlIiwiZmV0Y2giLCJtb2RlIiwib2siLCJqc29uRGF0YSIsImpzb24iLCJoYW5kbGVFcnJvciIsImVyciIsImVycm9yVGV4dCIsIm1lc3NhZ2UiLCJjcmVhdGVHaWZJbWciLCJpbWciLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiYWx0IiwiaW1nQ29udGFpbmVyIiwiYXBwZW5kIiwiaGFuZGxlR2lmVVJMIiwiZ2lmUXVlcnkiLCJzZWFyY2hUZXJtIiwidXJsU3RyIiwiaGFuZGxlR2lmRmV0Y2giLCJkYXRhIiwid2VhdGhlciIsImRlc2NyaXB0aW9uIiwibWFpbiIsIndpbmQiLCJzcGVlZCIsImdpZkRhdGEiLCJpbWFnZXMiLCJvcmlnaW5hbCIsImdyYWJJbnB1dFN0ckZyb21Gb3JtIiwiZXZlbnQiLCJmb3JtIiwidGFyZ2V0Iiwic2VhcmNoSW5wdXQiLCJ2YWx1ZSIsImZvcm1hdERhdGEiLCJ0aW1lem9uZSIsImZlZWxzX2xpa2UiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwiaWNvbiIsImZvcm1hdHRlZERhdGEiLCJoYW5kbGVEYXRhIiwic3RhcnRMb2FkaW5nU2NyZWVuIiwic3RhcnRBbmltYXRpb24iLCJzdG9wTG9hZGluZ1NjcmVlbiIsInN0b3BBbmltYXRpb24iLCJoYW5kbGVGb3JtU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJsb2NhdGlvbiIsImZvcm1hdHRlZExvYyIsInRoZW4iLCJjYXRjaCIsImhhbmRsZUJ0bkNsaWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjb250YWlucyIsImludGVydmFsSUQiLCJ0YXJnZXRFbGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhbmltSW5kZXgiLCJwcmV2QW5pbUluZGV4Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibG9hZFNjcmVlbiIsImZvcm1hdHRlZFN0ciIsInRyaW0iLCJ3ZWF0aGVyVVJMIl0sInNvdXJjZVJvb3QiOiIifQ==