export const getTextColor = (hexCode) => {
  return parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.5
    ? '#000'
    : '#fff';
};
