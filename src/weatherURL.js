const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=&appid=be56b9b3a4b4bc973591bee5c0716766';

function completeWeatherURL(location, unit) {
  const formattedURL = `${weatherURL.replace(/q=\w*(?=&)/, `q=${location}`)}&units=${unit}`;
  return formattedURL;
}

export default completeWeatherURL;
