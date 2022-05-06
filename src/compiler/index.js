 import { parseHTML } from './parser-html' 
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
      let lastIndex = defaultTagRE.lastIndex = 0
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
      console.log('--toens---', tokens)
      return `_v(${tokens.join('+')})`
   }
 }

 // _c('div', {id:'app', style: {color: red; background: blue;}}, _c('p', undefined, _v('hello', + _s(name))), _v('world'))
 function generate(el) {
   let children = genChildren(el)
    let code = `_c("${el.tag}", ${
      el.attrs.length ? genProps(el.attrs) : 'undefined' // undefined => {}
    }${children.length ? `,${children}` : ''})
    `
    console.log('==code', code)
    return code
 }

// AST语法树：用对象来描述js的原生语法，虚拟DOM:用对象描述dom节点
export function compileToFunction (template) {
  // 解析HTML字符串，将HTML字符串转换成AST语法树对象
  let root = parseHTML(template)
  
  // 需要将ast语法树生成最终的render函数，也就是字符串的拼接（模板引擎）
  let code = generate(root)
  console.log('code===', code)

  // <div id='app'><p>hello {{ name }}</p>world</div>
  // _c('div', {id:'app'}, _c('p', undefined, _v('hello', + _s(name))), _v('world'))
  return function render(){

  }
}

{/* <div id='app'>
  <p>hello</p>
</div>

start div :attrs:[{name: 'id', value: 'app'}]
start p 
text hello
end p
end div


// Dom转为AST语法树
let root = {
  tag: 'div'
  attrs: [{name: 'id', value: 'app'}],
  type: 1, // dom的nodetype是1
  children: [{
    tag: 'p',
    attrs: [],
    type:1,  // dom的nodetype是1
    children: [{
      type: 3, // 文本节点
      text: 'hello'
    }]
  }]
} */}