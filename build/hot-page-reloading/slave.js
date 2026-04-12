/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/hot-page-reloading/slave.js ***!
  \*****************************************/
(function () {
  if (!('BroadcastChannel' in window)) return;
  const channel = new BroadcastChannel('wp-live-reload');
  channel.onmessage = function (event) {
    if (event.data && event.data.type === 'reload') {
      console.log('[WP Live Reload] Reloading page...');
      location.reload();
    }
  };
})();
/******/ })()
;
//# sourceMappingURL=slave.js.map