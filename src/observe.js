/**
 * 对传递过来的data对象使用Object.defineProperty进行重新定义(添加get/set方法) - ES5
 * Object.defineProperty不兼容IE8以及以下版本
 */
import { isObject } from "./util/index";

class Observer {
  constructor(value) {
    // Vue中如果数据太复杂，嵌套的层次太多，需要递归去解析对象中的属性，以此增加get/set方法
    // 这样比较耗性能，所以Vue3中使用Proxy来解决了这个问题，提升复杂数据结构下数据解析带来的性能问题
    this.walk(value);
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
  walk(data) {
    // 遍历data中所有属性
    let keys = Object.keys(data);
    keys.forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }
}

export function defineReactive(obj, key, value) {
  // 递归实现深度劫持
  observe(value);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return value;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === value) return;
      // 如果set一个对象也要进行劫持,observe
      observe(newVal);
      value = newVal;
      console.log("试图已更新");
    }
  });
}

export function observe(data) {
  if (!isObject(data)) return;
  // 如果是对象，那么对该对象进行观测
  return new Observer(data);
}
