// 在Vue原型上绑定私有的初始化方法_init
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    Object.keys(options).forEach(key => {
      console.log(key, options[key]);
    });
  };
}
