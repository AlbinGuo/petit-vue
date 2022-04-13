(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function isObject(obj) {
    return obj !== null && _typeof(obj) === "object";
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // Vue中如果数据太复杂，嵌套的层次太多，需要递归去解析对象中的属性，以此增加get/set方法
      // 这样比较耗性能，所以Vue3中使用Proxy来解决了这个问题，提升复杂数据结构下数据解析带来的性能问题
      if (Array.isArray(value)) {
        // 如果是数组的话，并不会对索引进行观测，因为会导致性能问题
        // 前端开发中很少去操作索引 push shift unshift
        // 如果数组中放的是对象，再进行观测
        this.observerArray(value);
      } else {
        this.walk(value);
      }
    }
    /**
     * Vue 源码中使用的是for循环处理 observer/index.js
     * Walk through all properties and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    // walk (obj: Object) {
    //   const keys = Object.keys(obj)
    //   for (let i = 0; i < keys.length; i++) {
    //     defineReactive(obj, keys[i])
    //   }
    // }


    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 遍历data中所有属性
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observerArray",
      value: function observerArray(items) {
        // 遍历数组中的每一项
        items.forEach(function (item) {
          observe(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(obj, key, value) {
    // 递归实现深度劫持
    observe(value);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        return value;
      },
      set: function reactiveSetter(newVal) {
        if (newVal === value) return; // 如果set一个对象也要进行劫持,observe

        observe(newVal);
        value = newVal;
        console.log("试图已更新");
      }
    });
  }
  function observe(data) {
    if (!isObject(data)) return; // 如果是对象，那么对该对象进行观测

    return new Observer(data);
  }

  function initState(vm) {
    var opt = vm.$options;
    if (opt.props) ;
    if (opt.methods) ;
    if (opt.data) initData(vm);
    if (opt.computed) ;
    if (opt.watch) ;
  }

  function initData(vm) {
    // 传递过来的data，此时data可能是函数，也可能是对象{}
    // 但最终都要转为对象
    var data = vm.$options.data;
    data = vm._data = typeof data === "function" ? data.call(vm) : data || {}; // 对象劫持，转为响应式数据->MVVM

    observe(data);
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
