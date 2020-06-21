
// ast语法树  用对象来描述原生语法的 虚拟dmo 用对象来描述dom节点的
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:asdads>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export function compileToFunction(template) {
    return function render() {

    }
}


// let root = {
//     tag:'div',
//     attrs:[{name:'id',value:'app'}],
//     parent:null,
//     children:[
//         {
//             tag:'p',
//             attrs:[],
//             parent:root,
//             type:1,
//             children:[
//                 {
//                     text:'hello',
//                     type:3
//                 }
//             ]
//         }
//     ]
// }