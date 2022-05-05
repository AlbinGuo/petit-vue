 import { parseHTML } from './parser-html' 

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

 // _c('div', {id:'app', style: {color: red; background: blue;}}, _c('p', undefined, _v('hello', + _s(name))), _v('world'))
 function generate(el) {
    let code = `_c("${el.tag}", ${
      el.attrs.length ? genProps(el.attrs) : 'undefined' // undefined => {}
    })

    `

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