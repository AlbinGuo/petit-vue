export function createElement(tag, data = {}, ...children) {
  let key = data.key
  if(key) {
    delete data.key
  }
  return vnode(tag, data, key, children, undefined)
}

export function createTextNode(text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

// 虚拟节点 ： 通过_c _v实现用对象来描述dom操作
// 将template转换成ast语法树 -> 生成render函数 -> 生成虚拟DOM -> 生成真实DOM【dom更新：重新生成虚拟dom】-> 更新真实dom

function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}