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
  } // 定义一个defineProperty

  function def(obj, key, val) {
    Object.defineProperty(obj, key, {
      enumerable: false,
      // 不可枚举，不可被遍历
      configurable: true,
      // 可配置
      value: val,
      writable: true // 可写

    });
  }

  // 需要重写数组中的7个方法， push pop shift unshift splice sort reverse
  // 会导致数组的长度发生变化，需要通知观察者
  var arrayProto = Array.prototype; // value.__proto__ = arrayMethods 将数组的原型指向arrayMethods，这样就可以访问到数组中我们重写的方法 。
  // arrayMethods.__proto__ = arrayProto 将arrayMethods的原型指向数组的原型

  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
  methodsToPatch.forEach(function (method) {

    arrayMethods[method] = function mutator() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 调用原生的Array.prototype上的方法，此时args还没有被监测
      var result = arrayProto[method].apply(this, args); // push,unshift添加的元素可能是对象，需要观察

      var inserted; // 当前数组要插入的元素

      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      } // 对inserted进行观察


      console.log('inserted', inserted);
      if (inserted) ob.observerArray(inserted);
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 给初始对象或者，每一个数组中push、unshift进来的对象添加__ob__属性
      // value.__ob__ = this 
      def(value, '__ob__', this); // Vue中如果数据太复杂，嵌套的层次太多，需要递归去解析对象中的属性，以此增加get/set方法
      // 这样比较耗性能，所以Vue3中使用Proxy来解决了这个问题，提升复杂数据结构下数据解析带来的性能问题

      if (Array.isArray(value)) {
        // 如果是数组的话，并不会对索引进行观测，因为会导致性能问题
        // 前端开发中很少去操作索引 push shift unshift
        value.__proto__ = arrayMethods; // 如果数组中放的是对象，再进行观测

        this.observerArray(value);
      } else {
        // 对对象进行观测
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
        console.log('items:', items); // 遍历数组中的每一项

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

  function compileToFunction(template) {
    console.log('---template', template);
    return function render() {};
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 状态初始化: 初始化顺序：props-methods-data-computed-watch

      initState(vm); // 如果用户传递了el, 则实现挂载流程，将页面渲染出来

      if (vm.$options.el) {
        // 挂载模板
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options; // 获取dom元素

      el = document.querySelector(el); // vue解析template的执行顺序：render -> template:'#app' -> outerHTML

      if (!options.render) {
        // 对模板进行编译
        var template = options.template; // 取出模板

        if (!template && el) {
          template = el.outerHTML;
        } // template编译成render函数


        var render = compileToFunction(template);
        options.render = render;
      }
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
