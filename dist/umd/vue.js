(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  // 在Vue原型上绑定私有的初始化方法_init
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      Object.keys(options).forEach(function (key) {
        console.log(key, options[key]);
      });
    };
  }

  function Vue(options) {
    // Vue的初始化操作
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
