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

  locationDisplay.innerText = dataObj.name;
  weatherDisplay.innerText = dataObj.weatherDesc;
  temperatureDisplay.innerText = dataObj.temp;
  dateDisplay.innerText = dataObj.date;
  timeDisplay.innerText = dataObj.time;
  humidityDisplay.innerText = `${dataObj.humidity}%`;
  windSpeedDisplay.innerText = dataObj.windSpeed;
  hiLowTempDisplay.innerText = `${dataObj.lowTemp} | ${dataObj.hiTemp}`;
  feelsLikeTempDisplay.innerText = dataObj.feelsLikeTemp;
  if (unitType === 'imperial') {
    unitToggleBtn.innerText = 'Metric units';
  } else {
    unitToggleBtn.innerText = 'Imperial Units';
  }
}

export default fillNodes;
