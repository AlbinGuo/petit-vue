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

methodsToPatch.forEach(method => {
  // 数组原生方法
  const original = arrayProto[method]
  // 给数组arrayMethods上添加要重写的这七种方法
  arrayMethods[method] = function mutator (...args) {
    // 调用原生的Array.prototype上的方法，此时args还没有被监测
    arrayProto[method].apply(this, args)
    // push,unshift添加的元素可能是对象，需要观察
    let inserted; // 当前数组要插入的元素
    const ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
      case 'splice':
        inserted = args.slice(2)
      default:
        break;
      // 对inserted进行观察
      if(inserted) ob.observerArray(inserted)

    }
    
  }
  
})