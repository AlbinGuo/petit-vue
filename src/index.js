import { initMixin } from "./init";
import { stateMixin } from "./state";

// Vue的构造函数
function Vue(options) {
  // Vue的初始化操作
  this._init(options);
}

// 在Vue原型上绑定_init初始化方法
initMixin(Vue);
// 状态初始化
stateMixin();

export default Vue;
