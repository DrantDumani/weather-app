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
  return { startAnimation, stopAnimation };
}

function showLoadingScreen() {
  const loadScreen = document.querySelector('.loading-modal');
  loadScreen.classList.remove('hide');
}

function hideLoadingScreen() {
  const loadScreen = document.querySelector('.loading-modal');
  loadScreen.classList.add('hide');
}

export { handleLoadScreenAnimation, showLoadingScreen, hideLoadingScreen };
