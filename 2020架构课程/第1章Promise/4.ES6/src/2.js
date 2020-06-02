// @log1(1)
// @log2(2)
class Animal{
    // static a = 1;//静态属性 es7 给类增加一个属性 a = 1
    @reaonly a = 1;// 不是给原型上增加
    @before say(){
        console.log('say');
    }
}

let animal = new Animal;
// 如何查看衣蛾属性是实例上的还是原型上的

// console.log(Animal.a);
// console.log(animal.hasOwnProperty('a'));

// 装饰器 @ 草案

// @可以装饰类    可以装饰类中的属性和方法

function log1(target) {
    console.log(target);
    return function () {
        console.log('1')
    }
}

function log2(target) {
    console.log(target);
    return function () {
        console.log('2')
    }
}

function readonly(proto,key,descriptor) {
    descriptor.writable = false;
}

function before(proto,key,descriptor) {
    let old = descriptor.value;
    descriptor.value = function () {
        
        console.log('xxx');
        old();
    }
}

// mbox


//洋葱模型





