import { initState } from "./state";
// 在Vue原型上绑定私有的初始化方法_init
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    vm.$options = options;
    // 状态初始化: 初始化顺序：props-methods-data-computed-watch
    initState(vm);
  };
}
