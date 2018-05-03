function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
if(isTouchDevice()){ $('body').addClass('is-touch'); }
