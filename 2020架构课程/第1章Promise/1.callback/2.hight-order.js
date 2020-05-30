// 对某些函数进行扩展 面向切片编程  对原来的函数进行包装

function say(who) {// 装饰模式
    console.log('say',who)
    
}
Function.prototype.before = function (callback) {//统一扩展了公共方法
    // console.log(this)
    // return function (callback) {
    //     callback()
    //     this() //指向window
    // }
    return  (...args) => {//箭头函数没有this指向，会向上层查找  箭头函数也没有arguments
        callback();
        this(...args); //this指向 谁调用就指向谁

    }
}

Function.prototype.after = function (callback) {
    return (...args) => {//剩余运算符
        //展开运算符
        this(...args); 
        callback();
    }
}

// 说话之前  先刷牙   这也是一个高阶函数
let newSay = say.before(function () {
    console.log('刷牙')
})

let otherSay = say.after(function () {
    console.log('说完了')
})
newSay('我');
otherSay('你');
// 原型链 prototype  __proto__