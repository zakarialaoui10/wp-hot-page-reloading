/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared.js"
/*!***********************!*\
  !*** ./src/shared.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHANNEL_NAME: () => (/* binding */ CHANNEL_NAME),
/* harmony export */   EVENT_NAME: () => (/* binding */ EVENT_NAME)
/* harmony export */ });
const CHANNEL_NAME = 'wp-hot-page-reloading';
const EVENT_NAME = 'wp-live-reload:trigger';

/***/ },

/***/ "./node_modules/ziko/src/hooks/use-ipc.js"
/*!************************************************!*\
  !*** ./node_modules/ziko/src/hooks/use-ipc.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIPC: () => (/* binding */ useIPC)
/* harmony export */ });
class UseIPC {
    #channel;
    #eventData;
    #handlers;
    #uuid;
    #subscribers;
    #currentRooms;
    constructor(name = "") {
        this.#channel = new BroadcastChannel(name);
        this.#eventData = new Map();
        this.#handlers = new Map(); // Map<event, Array<{fn, rooms}>>
        this.#uuid = "ziko-channel:" + (Math.random()*10e16);  // To Be Replaced by UUID
        this.#subscribers = new Set([this.#uuid]);
        this.#currentRooms = new Set(); 
        this.#channel.addEventListener("message", (e) => {
            const { last_sent_event, userId, eventData, rooms } = e.data;
            if (userId === this.#uuid) return; // ignore own messages
            // broadcast if no rooms, else check intersection
            if (rooms && rooms.length && !rooms.some(r => this.#currentRooms.has(r))) return;
            this.#subscribers.add(userId);
            this.#eventData = new Map(eventData);
            const handlersList = this.#handlers.get(last_sent_event);
            if (!handlersList) return;
            handlersList.forEach(({ fn, rooms: handlerRooms }) => {
                // trigger if listener has no room filter, or intersects subscriber rooms
                if (!handlerRooms || handlerRooms.length === 0 ||
                    !rooms || rooms.some(r => handlerRooms.includes(r))) {
                    fn(this.#eventData.get(last_sent_event));
                }
            });
        });
    }

    emit(event, data, rooms) {
        this.#eventData.set(event, data);
        if(typeof rooms === 'string') rooms = [rooms]
        this.#channel.postMessage({
            eventData: Array.from(this.#eventData.entries()),
            last_sent_event: event,
            userId: this.#uuid,
            rooms: rooms && rooms.length ? rooms : undefined
        });
        return this;
    }
    on(event, handler = console.log, rooms) {
        if (!this.#handlers.has(event)) this.#handlers.set(event, []);
        if(typeof rooms === 'string') rooms = [rooms]
        this.#handlers.get(event).push({ fn: handler, rooms });
        return this;
    }
    off(event, handler) {
        if (!this.#handlers.has(event)) return this;
        this.#handlers.set(
            event,
            this.#handlers.get(event).filter(h => h.fn !== handler)
        );
        return this;
    }
    once(event, handler, rooms) {
        const wrapper = (data) => {
            handler(data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper, rooms);
        return this;
    }
    join(...rooms) {
        rooms.forEach(r => this.#currentRooms.add(r));
        return this;
    }
    leave(...rooms) {
        if (!rooms.length) this.#currentRooms.clear();
        else rooms.forEach(r => this.#currentRooms.delete(r));
        return this;
    }
    close() {
        this.#channel.close();
        return this;
    }
}

const useIPC = (name) => new UseIPC(name);



/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/slave.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ziko_src_hooks_use_ipc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ziko/src/hooks/use-ipc.js */ "./node_modules/ziko/src/hooks/use-ipc.js");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.js */ "./src/shared.js");


const slave = (0,ziko_src_hooks_use_ipc_js__WEBPACK_IMPORTED_MODULE_0__.useIPC)(_shared_js__WEBPACK_IMPORTED_MODULE_1__.CHANNEL_NAME);
slave.on(_shared_js__WEBPACK_IMPORTED_MODULE_1__.EVENT_NAME, () => {
  location.reload();
});
})();

/******/ })()
;
//# sourceMappingURL=slave.js.map