/******/ (() => { // webpackBootstrap
/*!******************************************!*\
  !*** ./src/hot-page-reloading/master.js ***!
  \******************************************/
(function () {
  if (!('BroadcastChannel' in window)) return;
  const channel = new BroadcastChannel('wp-live-reload');
  let wasSaving = false;
  wp.data.subscribe(() => {
    const select = wp.data.select('core/editor');
    if (!select) return;
    const isSaving = select.isSavingPost();
    const isAutosaving = select.isAutosavingPost();
    if (isSaving && !isAutosaving) {
      wasSaving = true;
    }
    if (wasSaving && !isSaving) {
      channel.postMessage({
        type: 'reload'
      });
      console.log('[WP Live Reload] Broadcast sent');
      wasSaving = false;
    }
  });
})();
/******/ })()
;
//# sourceMappingURL=master.js.map