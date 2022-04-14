// 需要重写数组中的7个方法， push pop shift unshift splice sort reverse
// 会导致数组的长度发生变化，需要通知观察者
const arrayProto = Array.prototype
// value.__proto__ = arrayMethods 将数组的原型指向arrayMethods，这样就可以访问到数组中我们重写的方法 。
// arrayMethods.__proto__ = arrayProto 将arrayMethods的原型指向数组的原型
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]