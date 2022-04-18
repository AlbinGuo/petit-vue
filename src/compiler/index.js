 // 模板编译的正则表达式
 // Regular Expressions for parsing tags and attributes
 // copy from packages\vue-template-compiler\browser.js
 // 匹配标签伤的属性 id="app" id='app' id=app
 var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
 var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
 // 标签：abc-aaa
 var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
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

// AST语法树：用对象来描述js的原生语法，虚拟DOM:用对象描述dom节点
export function compileToFunction (template) {
  console.log('---template', template)
  return function render(){

  }
}

{/* <div id='app'>
  <p>hello</p>
</div>

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