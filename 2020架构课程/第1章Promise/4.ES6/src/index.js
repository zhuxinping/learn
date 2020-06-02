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





// class Animal{
//     constructor(name){
//         this.name = name
//     }
//     say(){
//         console.log('say');
//     }
//     static a(){
//         return 1200;
//     }
// }

// class Tiger extends Animal{
//     constructor(name){
//         super(name);//Animal.call(this)
//     }
//     say(){
//         console.log(this);
//         super.say();//Animal.prototype 父类的原型
//     }
//     static get a(){
//         // console.log(super);
//     }
//     static a(){
//         // 静态方法的super指向父类
//         return super.a()
//     }
// }

// let tiger = new Tiger('老虎');

// console.log(tiger);
// console.log(Tiger.a())
// class Point {
//     constructor() {
//       // ...
//     }
  
//     toString() {
//       // ...
//     }
  
//     toValue() {
//       // ...
//     }
//   }
  
  // 等同于
  
  // Point.prototype = {
  //   constructor() {},
  //   toString() {},
  //   toValue() {},
  // };

//   在类的实例上面调用方法，其实就是调用原型上的方法。


// class Point {
//     constructor(){
//       // ...
//     }
//   }
  
//   Object.assign(Point.prototype, {
//     toString(){},
//     toValue(){}
//   })


// //   由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。

// // ES6类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

// // constructor 方法 
// // constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加

// // constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
// class Foo {
//     constructor() {
//       return Object.create(null);
//     }
//   }
  
//   new Foo() instanceof Foo
//   // false


// //   ES6与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

// //定义类
// class Point {

//     constructor(x, y) {
//       this.x = x;
//       this.y = y;
//     }
  
//     toString() {
//       return '(' + this.x + ', ' + this.y + ')';
//     }
  
//   }
  
//   var point = new Point(2, 3);
  
//   point.toString() // (2, 3)
  
//   point.hasOwnProperty('x') // true
//   point.hasOwnProperty('y') // true
//   point.hasOwnProperty('toString') // false
//   point.__proto__.hasOwnProperty('toString') // true


// //   ES6与 ES5 一样，类的所有实例共享一个原型对象。

// // __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。

// // 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
// class CustomHTMLElement {
//     constructor(element) {
//       this.element = element;
//     }
  
//     get html() {
//       return this.element.innerHTML;
//     }
  
//     set html(value) {
//       this.element.innerHTML = value;
//     }
//   }
  
//   var descriptor = Object.getOwnPropertyDescriptor(
//     CustomHTMLElement.prototype, "html"
//   );
  
//   "get" in descriptor  // true
//   "set" in descriptor  // true
  

// // 属性表达式
// let methodName = 'getArea';

// class Square{
//     constructor(length){

//     }
//     [methodName](){

//     }
// }
// // Class表达式


// const MyClass = class Me{
//     getClassName(){
//         return Me.name;
//     }
// }
// // 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。

// //抽象类  可以被继承 但是不能被new


// // （1）严格模式

// // 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

// // （2）不存在提升

// // 类不存在变量提升（hoist），这一点与 ES5 完全不同。

// new Foo(); // ReferenceError
// class Foo {}
// // 上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

// {
//   let Foo = class {};
//   class Bar extends Foo {
//   }
// }
// // 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。

// // （3）name 属性

// // 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

// class Point {}
// Point.name // "Point"
// // name属性总是返回紧跟在class关键字后面的类名。


// // Generator 方法

// // 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。

// class Foo {
//   constructor(...args) {
//     this.args = args;
//   }
//   * [Symbol.iterator]() {
//     for (let arg of this.args) {
//       yield arg;
//     }
//   }
// }

// for (let x of new Foo('hello', 'world')) {
//   console.log(x);
// }
// // hello
// // world
// // 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。


// // 意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
// // ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。


// // Object.getPrototypeOf() 
// // Object.getPrototypeOf方法可以用来从子类上获取父类。

// class A {}

// class B extends A {
//   constructor() {
//     super();
//   }
// }
// // 上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。

// // 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。
// // super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
// class A {
//     p() {
//       return 2;
//     }
//   }
  
//   class B extends A {
//     constructor() {
//       super();
//       console.log(super.p()); // 2
//     }
//   }
  
//   let b = new B();
// //   上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。
  
// //   这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

// // 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

// class A {
//     constructor() {
//       this.x = 1;
//     }
//   }
  
//   class B extends A {
//     constructor() {
//       super();
//       this.x = 2;
//       super.x = 3;
//       console.log(super.x); // undefined
//       console.log(this.x); // 3
//     }
//   }
  
//   let b = new B();
// //   上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
  
// //   如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。


// class A {
//     constructor() {
//       this.x = 1;
//     }
//     static print() {
//       console.log(this.x);
//     }
//   }
  
//   class B extends A {
//     constructor() {
//       super();
//       this.x = 2;
//     }
//     static m() {
//       super.print();
//     }
//   }
  
//   B.x = 3;
//   B.m() // 3
// //   上面代码中，静态方法B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例。

// // Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
// // 
// // （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

// // （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。


// class A {
// }

// class B extends A {
// }

// B.__proto__ === A // true
// B.prototype.__proto__ === A.prototype // true
// // 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。
// // 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。




// class  Person{
//   constructor(name){
//     this.name = name;
//     //类的实例化检测
//     if(new.target === Person){
//       throw new Error('not new')
//     }
//   }

// }








import './2'