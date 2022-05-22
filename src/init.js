import { initState } from "./state";
import { compileToFunction } from "./compiler/index.js";
import { mountComponent, callHook } from "./lifecycle"
import { mergeOptions } from "./util/index.js";

// 在Vue原型上绑定私有的初始化方法_init
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    // 将用户传递的options和全局的进行合并
    // vm.constructoor = Vue; 谁调的_init，vm.constructor就是谁
    vm.$options = mergeOptions(vm.constructor.options, options)
    callHook(vm, 'beforeCreate')
    // 状态初始化: 初始化顺序：props-methods-data-computed-watch
    initState(vm);

    callHook(vm, 'created')
    // 如果用户传递了el, 则实现挂载流程，将页面渲染出来
    if(vm.$options.el){
      // 挂载模板
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm= this
    const options = vm.$options
    // 获取dom元素
    el = document.querySelector(el)
    // vue解析template的执行顺序：render -> template:'#app' -> outerHTML
    if(!options.render){
      // 对模板进行编译
      let template = options.template // 取出模板
      if(!template && el){
        template = el.outerHTML
      }
      // template编译成render函数、
      const render = compileToFunction(template)
      options.render = render
    }
    mountComponent(vm, el)
  }
  
}
