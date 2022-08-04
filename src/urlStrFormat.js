function formatQueryStr(str) {
  const formattedStr = str.trim().replace(/\s+/, '+');
  return formattedStr;
}

export default formatQueryStr;
