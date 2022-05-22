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

/**
 * options的合并
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