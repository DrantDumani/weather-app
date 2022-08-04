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
  const setLocationStr = (str) => { urlLocationStr = str; };
  const getLocationStr = () => urlLocationStr;
  return {
    getCurrentUnit, swapUnits, setLocationStr, getLocationStr,
  };
}

export default stateManager;
