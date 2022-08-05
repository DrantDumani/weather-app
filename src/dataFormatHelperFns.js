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

function formatTemp(temp, unitType) {
  const unitSymbol = unitType === 'imperial' ? 'F' : 'C';
  return `${Math.round(Number(temp))} \u00B0${unitSymbol}`;
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
  return `${fWindSpeed} ${unit}`;
}

function formatWeatherCond(weatherDesc) {
  let capDesc = weatherDesc.replace(/\b\w/g, (c) => c.toUpperCase());
  return capDesc;
}

function formatIconURL(iconId) {
  const link = 'http://openweathermap.org/img/wn/10d@2x.png';
  const url = link.replace(/\d+d/, iconId);
  return url;
}

export {
  formatDate, formatTemp, formatTime, formatWindSpeed, formatWeatherCond, formatIconURL,
};
