import Watcher from "./observer/watcher"
export function lifecycleMixin(Vue) {
  // 虚拟dom创建真实dom
  Vue.prototype._update = function (vnode) {

  }
}

export function mountComponent(vm, el) {
  const options = vm.$options
  vm.$el = el

  // 如果用户传递了el, 则实现挂载流程，将页面渲染出来
  // Wtcher用来渲染页面，vm._redner解析render函数，生成虚拟dom
  // vm._update将虚拟dom转为真实dom，并插入到页面中
  let updateComponent = () => { // 无论是渲染还是更新都会调用
    vm._update(vm._render())
  }
  // 渲染Watchr 每个组件都有一个watcher
  new Watcher(vm, updateComponent, () => {}, true) // true表示这是一个渲染wathcer
}