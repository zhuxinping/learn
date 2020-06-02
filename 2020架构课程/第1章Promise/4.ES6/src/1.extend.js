// es5继承
// 定义一个类 实例属性 原型属性

function Animal() {
    this.name = '动物'//实例属性
    this.say = function () {
        console.log('说话');
    }
}

Animal.prototype.say = function () {
    console.log('说话');
}


let animal = new Animal();
// console.log(animal.__proto__ === Animal.prototype);// __proto__指向实例所属类的原型
// console.log(animal.__proto__.__proto__ === Object.prototype);// true   Animal.prototype对象所属类的原型是Object.prototype
// console.log(Object.prototype.__proto__);// null 如果指向自己就会死循环  到这里就是根了
// console.log(Object.__proto__ === Function.prototype);//类就是个函数 所以它的原型是Function.prototype  对象的链 是函数的原型
// console.log(Function.prototype.__proto__ === Object.prototype);
// console.log(Function.__proto__ === Object.__proto__);
// console.log(animal.say());
// // 1.继承实例属性

function Tiger() {
    Animal.call(this);//继承实例属性 调用父类构造函数 改变this指向
}
// let tiger = new Tiger();
// console.log(tiger.name);
// 继承公共属性
// IE不支持 直接操作___proto__
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype);
Tiger.prototype.__proto__ =  Animal.prototype;//Tiger的原型的链指向父类的原型 就可以继承到父类原型的公共方法
let tiger = new Tiger();
console.log(tiger.say);

//实现了继承
//  Tiger.prototype.eat =function () {
     
//  }
// 先继承  再加方法  不然 会丢失方法eat
Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}})
 Tiger.prototype.eat =function () {
     
 }

function create(parentPrototype) {
    function Fn() {
        
    }
    //通过第三方构造函数的原型指向Animal的原型，然后返回 这个构造函数的一个实例
    //那么这个实例就会指向Animal公共的方法,然后把这个实例赋值给子类的原型，一旦子类的原型找不到Fn类的方法 就会去找父类原型上的方法  实现了继承
    Fn.prototype = parentPrototype;
    return new Fn();

}

//把子类原型指向一个实例  实例找不到方法 就去找对应
// prototype  每个类都有prototype对象
// __proto__ 每个人都有指向所属类的原型
// constructor定义在原型上
// console.log(Animal.prototype.constructor === Animal);
// ES6的类 实现继承 是靠call+Object.create = extends

function mycreate(parentPrototype) {
    function Fn() {
        
    }
    Fn.prototype = parentPrototype;
    return new Fn();
}
 Tiger.prototype = mycreate(Animal.prototype)

