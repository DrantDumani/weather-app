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
    fWindSpeed = Math.round(Number(windSpeed));
    unit = 'mph';
  } else {
    fWindSpeed = Math.round(Number(windSpeed) * 3.6);
    unit = 'km/h';
  }
  return `${fWindSpeed} ${unit}`;
}

export {
  formatDate, formatTemp, formatTime, formatWindSpeed,
};
