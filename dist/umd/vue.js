(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function initState(vm) {
    var opt = vm.$options;
    if (opt.props) ;
    if (opt.methods) ;
    if (opt.data) initData(vm);
    if (opt.computed) ;
    if (opt.watch) ;
  }

  function initData(vm) {
    console.log("vm.$options:", vm.$options.data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 状态初始化: 初始化顺序：props-methods-data-computed-watch

      initState(vm);
    };
  }

  function Vue(options) {
    // Vue的初始化操作
    this._init(options);
  } // 在Vue原型上绑定_init初始化方法


  initMixin(Vue); // 状态初始化

  return Vue;

}));
//# sourceMappingURL=vue.js.map
