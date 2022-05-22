import { mergeOptions } from '../util/index'
export function initGlobalAPI (Vue) {
  // 整合所有全局相关的API
  Vue.options = {}
  Vue.mixin = function (mixin) {
    // 对象合并
    this.options = mergeOptions(this.options, mixin)
    console.log('this.options====', this.options)
  }

  Vue.mixin({
    a: 1,
    beforeCreate() {
      console.log('beforeCreate1')
    },
  })

  Vue.mixin({
    b: 2,
    beforeCreate() {
      console.log('beforeCreate2')
    },
  })
}