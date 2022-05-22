/**
 * 对传递过来的data对象使用Object.defineProperty进行重新定义(添加get/set方法) - ES5
 * Object.defineProperty不兼容IE8以及以下版本
 */
import { isObject, def } from "../util/index";
import {arrayMethods} from "./array";
import Dep from "./dep";

class Observer {
  constructor(value) {
    // 给初始对象或者，每一个数组中push、unshift进来的对象添加__ob__属性
    // value.__ob__ = this 
    def(value, '__ob__', this)

    // Vue中如果数据太复杂，嵌套的层次太多，需要递归去解析对象中的属性，以此增加get/set方法
    // 这样比较耗性能，所以Vue3中使用Proxy来解决了这个问题，提升复杂数据结构下数据解析带来的性能问题
    if(Array.isArray(value)) {
      // 如果是数组的话，并不会对索引进行观测，因为会导致性能问题
      // 前端开发中很少去操作索引 push shift unshift
      value.__proto__ = arrayMethods;
      // 如果数组中放的是对象，再进行观测
      this.observerArray(value)
    }else{
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
  walk(data) {
    // 遍历data中所有属性
    let keys = Object.keys(data);
    keys.forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }

  observerArray(items) {
    console.log('items:',items)
    // 遍历数组中的每一项
    items.forEach(item => {
      observe(item);
    });
  }
}

export function defineReactive(obj, key, value) {
  let dep = new Dep()
  // 递归实现深度劫持
  observe(value);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 每个属性都对应着自己的watcher
      if(Dep.target){
        // 如果当前watcher存在，则将当前属性所对应的watcher添加到dep中
        dep.depend()
        console.log('------------notify-----------------',  dep.subs)
      }  
      return value;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === value) return;
      // 如果set一个对象也要进行劫持,observe
      observe(newVal);
      value = newVal;
      dep.notify(); // 通知该属性依赖的的watcher进行更新操作
    }
  });
}

export function observe(data) {
  if (!isObject(data)) return;
  // 如果是对象，那么对该对象进行观测
  return new Observer(data);
}
