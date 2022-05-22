import { initMixin } from "./init"
import { stateMixin } from "./state"
import { renderMixin } from "./render"
import { lifecycleMixin } from "./lifecycle"
import { initGlobalAPI } from './initGlobalAPI/index.js'

// Vue的构造函数
function Vue(options) {
  // Vue的初始化操作
  this._init(options);
}

// 在Vue原型上绑定_init初始化方法
initMixin(Vue);   // 增加初始化方法，将template转为AST
renderMixin(Vue); // 增加渲染方法，将AST解析为虚拟DOM
lifecycleMixin(Vue);  // 增加生命周期方法，将虚拟DOM渲染到真实DOM
// 状态初始化
stateMixin();

// 初始化全局API
initGlobalAPI(Vue)

export default Vue;
