// prototype __proto__ constructor
class Eat{
    a(){

    }
    static a(){//es6
        return 12;
    }
    static b=2;//ES7
}
console.log(Eat.prototype);
// es5 中没有类 只有构造函数 可以把一个函数当成类
// ES5 模拟一个ES6的类 1)判断当前这个调用方式是不是通过new来调用
// ES6的原型的属性不可枚举

function define(target,protoProperties) {
    for(let i = 0;i<protoProperties.length;i++){
        let property = protoProperties[i];
        // console.log(property.value)
        Object.defineProperty(target,property.key,{
            configurable:true,
            enumerable:false,//ES6的原型式不可枚举的
            ...property
        })
    }
}

function defineProperty(Constructor,protoProperties,staticProperties) {
    if(Array.isArray(protoProperties)){
       define(Constructor.property,protoProperties);
    }
    if(Array.isArray(staticProperties)){
        define(Constructor,staticProperties);
    }
}

var Animal = (function () {
    function Animal() {
        if(!(this instanceof Animal)){
            throw new Error('not new');
        }
        this.name = '熊猫';
    }
    defineProperty(Animal,[
        {key:'say',value:function () {
            console.log('say')
        }},
        {key:'eat',value:function () {
            console.log('eat')
        }}
    ],[
        {
            key:'a',value:function () {
                
            }
        },
        {
            key:'b',value:123
        }
    ])
    return Animal;
})()

// function Animal() {// 只能通过new来调用
//     this.name = '熊猫'
//     // return function () {
        
//     // }
// }

// Animal.prototype.say = function () {//公共方法
    
// }
// Animal.a=1;
// Animal.b=2;
// 如果new这个类 返回是一个引用类型的 function object 这个this就会指向当前的返回结果
let animal1 = new Animal();// 构造函数中的this默认指向实例
let animal2 = new Animal();
console.log(animal1.say === animal2.say);// true
// Animal();
console.log(Animal.prototype);
