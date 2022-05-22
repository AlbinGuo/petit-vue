export function patch(oldVnode, vnode) {
  // 老的element
  const oldElm = oldVnode
  // 老元素的父节点
  const parentElm = oldElm.parentNode
  let el = createElm(vnode)

  // 如果老元素存在，则将新元素添加到老元素之后
  parentElm.insertBefore(el, oldElm.nextSibling)
  // 删除老元素
  parentElm.removeChild(oldElm)

  // 返回渲染完成的结果
  return el
}

// 根据虚拟节点创建真实节点
function createElm(vnode) {
  let { tag, children, key, data, text } = vnode
  
  if(typeof tag === 'string') {
    // 标签
    vnode.el = document.createElement(tag)
    // 更新属性
    updateProperties(vnode)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  }else{
    // 文本
    vnode.el = document.createTextNode(text)
  }

  return vnode.el
}

// 更新属性
function updateProperties(vnode) {
  let newProps = vnode.data
  let el = vnode.el
  for(let key in newProps) {
    if(key === 'style') {
      console.log('newProps.style==', newProps.style)
      for(let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName]
      }
     
    }else if(key === 'class') {
      el.className = newProps[key]
    }else{
      el.setAttribute(key, newProps[key])
    }
  }
}