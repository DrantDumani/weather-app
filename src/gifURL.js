const gifURL = 'https://api.giphy.com/v1/gifs/translate?api_key=MMSGcrpyWEenoykFcO33KSmaDpslN6RW&s=';

function completeGifURL(str) {
  const formattedURL = `${gifURL}${str}`;
  return formattedURL;
}

export default completeGifURL;
