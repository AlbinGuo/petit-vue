import { observe } from "./observe";

export function stateMixin() {}

export function initState(vm) {
  const opt = vm.$options;
  if (opt.props) initProps(vm);
  if (opt.methods) initMethods(vm);
  if (opt.data) initData(vm);
  if (opt.computed) initComputed(vm);
  if (opt.watch) initWatch(vm);
}

function initProps(vm) {}

function initMethods(vm) {}

function initData(vm) {
  // 传递过来的data，此时data可能是函数，也可能是对象{}
  // 但最终都要转为对象
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
  // 对象劫持，转为响应式数据->MVVM
  observe(data);
}

function initComputed(vm) {}

function initWatch(vm) {}
