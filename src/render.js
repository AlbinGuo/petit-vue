import { createElement, createTextNode } from './vdom/create-element'
export function renderMixin(Vue) {
  // _c 创建元素的虚拟节点
  Vue.prototype._c = function() { // 参数：tag, data, children
    return createElement(...arguments)
  }
  // _v 创建文本的虚拟节点
  Vue.prototype._v = function(text) {
    return createTextNode(text)
  }
  // _s JSON。stringify()
  Vue.prototype._s = function(val) {
    return val == null ? '' : (typeof val === 'object' ? JSON.stringify(val) : val)
  }



  Vue.prototype._render = function () {
    const vm = this

    const {render} = vm.$options
    let vnode = render.call(vm) // 从vm实例上取值
    return vnode
  }
}