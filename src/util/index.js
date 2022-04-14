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