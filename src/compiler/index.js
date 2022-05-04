 // 模板编译的正则表达式
 // Regular Expressions for parsing tags and attributes
 // copy from packages\vue-template-compiler\browser.js
 // 匹配标签伤的属性 id="app" id='app' id=app
 var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
 var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
 // 标签：abc-aaa
 var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
 // <aaa:bbb>
 var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
 // 标签开头的正则，捕获的内容是标签名
 var startTagOpen = new RegExp(("^<" + qnameCapture));
 // 匹配开始标签的结束符 >
 var startTagClose = /^\s*(\/?)>/;
 // 匹配结尾标签: </div>
 var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
 var doctype = /^<!DOCTYPE [^>]+>/i;
 var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ name }}

 function start (tagName, attrs) {
  console.log("开始标签：",tagName, "属性", attrs)
 }

 function parseHTML (html) {
    // 循环解析html
    while(html){
      let textEnd = html.indexOf('<')
      if(textEnd == 0){
        // 如果当前索引为0，则是一个标签【开始标签，或者结束标签】
        let startTagMatch = parseStartTag()
        // 解析开始标签
        start(startTagMatch.tagName, startTagMatch.attrs)
        break
      }
    }

    // 截取
    function advance(n) {
      html = html.substring(n)
    }

    function parseStartTag() {
      let start = html.match(startTagOpen)
      // 匹配开始标签
      if(start) {
        let match = {
          tagName: start[1],
          attrs: []
        }
        advance(start[0].length)
        let end,attr
        // 匹配属性
        while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length)
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || ''
          })
        }
        
        // 匹配结束标签
        if(end){
          advance(end[0].length)
          return match
        }
      }
      
    }
 }

// AST语法树：用对象来描述js的原生语法，虚拟DOM:用对象描述dom节点
export function compileToFunction (template) {
  let root = parseHTML(template)
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