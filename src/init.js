import { initState } from "./state";
// 在Vue原型上绑定私有的初始化方法_init
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    vm.$options = options;
    // 状态初始化: 初始化顺序：props-methods-data-computed-watch
    initState(vm);
    // 如果用户传递了el, 则实现挂载流程，将页面渲染出来
    if(vm.$options.el){
      // 挂载模板
      vm.$mount(vm.$options.el)
    }

    Vue.prototype.$mount = funtion (el) {
      const vm= this
      const options = vm.$options
      // 获取dom元素
      el = el && document.querySelector(el)
      // vue解析template的执行顺序：render -> template:'#app' -> outerHTML
      if(!options.render){
        // 如果没有render方法，则获取template
        if(options.template){
          // 如果template是一个字符串，则解析为dom元素
          if(typeof template === 'string'){
            // 如果template是一个dom [模板x-template]，则解析为dom元素
            if(options.template.nodeType){
              el = options.template
            }else{
              /**
               * 【如果template是一个选择器id，则获取并解析为dom元素】
               * <script type="x-template" id="aaa">
                    <div>
                      <h2>{{message}}</h2>
                    </div>
                </script>
                <script>
                    Vue.createApp({
                      // 以#号开头就不会直接解析了，会去执行querySelector
                      template: '#aaa',
                      data: function() {
                        return {
                          message: "Hello World",
                        }
                      }
                    }).mount('#app');
                </script>
               */
              el = document.querySelector(options.template)
            }
          }
        }


        // // 如果没有render方法，则获取template
        // if(option.template){
        //   // 如果template是一个字符串，则解析为dom元素
        //   if(typeof option.template === 'string'){
        //     // 如果template是一个dom元素，则直接赋值给el
        //     if(option.template.nodeType){
        //       el = option.template
        //     }else{
        //       // 如果template是一个字符串，则解析为dom元素
        //       const template = document.querySelector(option.template)
        //       if(template){
        //         el = template
        //       }
        //     }
        //   }else if(typeof option.template === 'function'){
        //     // 如果template是一个函数，则执行函数，获取dom元素
        //     el = option.template.call(vm)
        //   }
        // }
      }
    }
  };
}
