export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

// 定义一个defineProperty
export function def (obj, key, val) {
  Object.defineProperty (obj, key, {
    enumerable: false, // 不可枚举，不可被遍历
    configurable: true, // 可配置
    value: val,
    writable: true // 可写
  })
}

// 取值时的代理
export function proxy(vm, source, key) {
  Object.defineProperty(vm ,key, {
    get() {
      // this._data.name
      return vm[source][key];
    },
    set(newVal) {
      vm[source][key] = newVal;
    }
  })
}

// 生命周期钩子
const LIFECYCLE_HOOLS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
]

// 合并策略
let strats = {}

// 合并钩子函数
function mergeHook(parentVal, childVal) {
  if(childVal) {
    if(parentVal) {
      return parentVal.concat(childVal)
    }else{
      return [childVal]
    }
  }else{
    return parentVal
  }
}

LIFECYCLE_HOOLS.forEach(hook => {
  strats[hook] = mergeHook
})

/**
 * options全局API的合并
 */
 export function mergeOptions(parent, child) {
    const options = {}
    for(let key in parent) {
      mergeField(key);
    }

    for(let key in child) {
      if(!parent.hasOwnProperty(key)) {
        mergeField(key);
      }
    }

    function mergeField (key) {
      // 判断是否存在该钩子函数合并策略
      if(strats[key]) {
        return options[key] = strats[key](parent[key], child[key])
      }
      if(typeof parent[key] === 'object' && typeof child[key] === 'object') {
        options = {
          ...parent[key],
          ...child[key]
        }
      }else if(child[key] == null) {
        options[key] = parent[key];
      }else{
        options[key] = child[key];
      }
    }
    return options
 }