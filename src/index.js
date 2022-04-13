import { initMixin } from "./init";

// Vue的构造函数
function Vue(options) {
  // Vue的初始化操作
  this._init(options);
}

initMixin(Vue);

export default Vue;
