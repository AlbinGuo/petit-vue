var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ name }}

 function genProps(attrs) {
   let str = "";
   for(let i = 0; i < attrs.length; i++) {
     let attr = attrs[i]
     if(attr.name === 'style'){
       let obj = {}
        attr.value.split(';').forEach(item => {
          let [key, value] = item.split(":")
          if(typeof value === 'string') {
            obj[key] = value.trim()
          }
        })
        attr.value = obj
     }
     str += `${attr.name}:${JSON.stringify(attr.value)},`
   }
   return `{${str.slice(0, -1)}}`
 }

 function genChildren(el) {
    let children = el.children
    if(children && children.length > 0) {
      return `${children.map(c => gen(c)).join(',')}`
    }else {
      return false
    }
 }

 function gen(node) {
   if(node.type == 1) {
     // 元素标签
     return generate(node)
   }else {
     // 字符串
     let text = node.text
     // a {{ name }} b {{ age }} c
     // _v('a', _s(name), 'b', _s(age), 'c')
      let tokens = []
      let match, index
      let lastIndex = defaultTagRE.lastIndex = 0 // 只要是全局匹配，就需要重置lastIndex到0
      while(match = defaultTagRE.exec(text)) {
        index = match.index
        if(index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        tokens.push(`_s(${match[1].trim()})`)
        lastIndex = index + match[0].length
      }
      if(lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`
   }
 }

 // _c('div', {id:'app', style: {color: red; background: blue;}}, _c('p', undefined, _v('hello', + _s(name))), _v('world'))
 export function generate(el) {
   let children = genChildren(el)
    let code = `_c("${el.tag}", ${
      el.attrs.length ? genProps(el.attrs) : 'undefined' // undefined => {}
    }${children.length ? `,${children}` : ''})
    `
    return code
 }