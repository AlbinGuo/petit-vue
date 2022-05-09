 import { parseHTML } from './parser-html' 
 import { generate } from './generate'

// AST语法树：用对象来描述js的原生语法，虚拟DOM:用对象描述dom节点
export function compileToFunction (template) {
  // 解析HTML字符串，将HTML字符串转换成AST语法树对象
  let root = parseHTML(template)
  
  // 需要将ast语法树生成最终的render函数，也就是字符串的拼接（模板引擎）
  let code = generate(root)

  // 所有的模板引擎实现都需要 使用 new Function() + with
  let renderFn = new Function(`with(this) {return ${code}}`)
  console.log('renderFn===',renderFn)
  // <div id='app'><p>hello {{ name }}</p>world</div>
  // _c('div', {id:'app'}, _c('p', undefined, _v('hello', + _s(name))), _v('world'))
  return renderFn
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