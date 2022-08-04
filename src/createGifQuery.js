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

export default createGifQuery;
