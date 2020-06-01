// ES6中的模块化问题
// 模块化解决的问题:命名冲突(命名空间) 采用自执行函数的方式  解决代码的高内聚 低耦合
// 什么叫模块 只要是一个js文件  webpack/图片 css模块
// node中自带的模块化功能 require module.exports commonjs规范
// cmd seajs amd requirejs
// umd 统一模块
// let obj = {
//     a(){

//     }
// }

// let obj1 = {
//     a(){

//     }
// }

// node模块 commonjs规范 es6模块规范 esModule umd
//如果我希望使用一个模块 require,如果希望给别人用 module.exports

// es6 模块 如果希望给别人用 exports 如果

// es6 => node规范 webpack环境下可以通用



// document.write('hello');
// 如果通过相对路径引入 表示是自定义模块
// import jquery //第三放模块
// 1) import特点  可以变量提升 在没定义域 可以直接使用 
// 2) 不能放到作用域，只能放到顶层作用域

// console.log(a);
// import {a} from './a';//从导出的对象中一一取出
// console.log(a);

// import * as obj from './a';//把所有导出的内容放到obj对象中 
// // console.log(obj.a);
// // setInterval(() => {
// //     console.log(obj.a,obj.b,obj.c);//每次拿到的是这个变量对应的值，如果这个值变量 那么结果会更新
// // }, 1000);

// setInterval(() => {
//     console.log(obj);
//     console.log(obj.default);//每次拿到的是这个变量对应的值，如果这个值变量 那么结果会更新
// }, 1000);
// 这个obj必须采用export default才能拿到  default是关键字
// import obj,{a,b,c} from './a'
// 重命名可以用as
// import obj,{a,b,c,q, default as d} from './a'
// import q,{a,b,c} from './a'
// setInterval(() => {
//     // q 100
//     console.log(a,b,c,q)//使用as 重命名为default后 等价于 export default
// }, 1000);

//a =12  导入的变量不能修改

// export 导出是接口 变量 所以要用 {} 解构出来具体的值
// export default 导出是一个具体的内容 不用 {} 解构
// import * as z from './z';
// console.log(z);

// 默认 import 语法静态语法
// node  动态加载
//草案中 提供一个语法 import()可以实现懒加载
// let btn = document.createElement('button');
// btn.addEventListener('click',async function(){
//     let result = await import('./d');//动态导入模块 返回一个promise
//     console.log(result);
// })
// document.body.appendChild(btn);

// 模块的语法 import  / export /export default / export xx from '..'   / import()
// console.log(_);//import会有变量提升的作用 类似函数

// import _ from './a'
// _= 'world';//不能修改导出后的结果

// btn.addEventListener('click',async function(){
//     import('./d').then(res=>{
//         new res.default().show(); 异步组件
//     })
// })





class Animal{
    constructor(name){
        this.name = name
    }
    say(){
        console.log('say');
    }
    static a(){
        return 1200;
    }
}

class Tiger extends Animal{
    constructor(name){
        super(name);//Animal.call(this)
    }
    say(){
        console.log(this);
        super.say();//Animal.prototype 父类的原型
    }
    static get a(){
        // console.log(super);
    }
    static a(){
        // 静态方法的super指向父类
        return super.a()
    }
}

let tiger = new Tiger('老虎');

console.log(tiger);
console.log(Tiger.a())

//抽象类  可以被继承 但是不能被new

