function getInternationalTime(timezoneOffset) {
  const localDate = new Date();
  const dt = localDate.getTime();
  const localOffset = localDate.getTimezoneOffset() * 60000;
  const finalOffset = localOffset + (timezoneOffset * 1000);
  const finalDate = new Date(dt + finalOffset);
  return finalDate;
}

export default getInternationalTime;
