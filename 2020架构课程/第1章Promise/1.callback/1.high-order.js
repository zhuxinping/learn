// 1.一个函数的参数是一个函数  ->高阶函数(回调函数)
// 2.如果一个函数返回一个函数  这个函数就叫高阶函数
// function a(fn) {

// }

// a(function name(params) {
    
// })

// function b(params) {
//     return function (params) {
        
//     }
// }

//1.判断类型 1)typeof 无法辨别对象 2)constructor [] {} 谁构造出来
// 3) instanceof 判断谁是谁的实例 .__protp__
// 4）Object.protype.toString.call

/**
 *@isType方法名
 *
 * @param {*} params
 */
// 高阶函数实现了第一个功能 保存变量(闭包)
function isType(type) {
    // 将String保存在这个代码块
    return function (content) {
        //为了改变this指向
        return Object.prototype.toString.call(content) == `[object ${type}]`
    }
}
let util = {}
let arr = ['String','Number','Object','Array']
arr.forEach((type)=>{
    util['is'+type] = isType(type)
});
// console.log(util.isString('hello'));
console.log(util.isObject({'name':'zxp'}));
// let isString = isType('String')
// console.log(isString('hello'))

// let isNumber = isType('Number')

// console.log(isNumber(123))
// 什么叫闭包:在定义的时候 函数就决定了它所在的作用域,  一个函数不在自己所在的作用域下执行 会形成闭包

//函数的柯里化  缩小函数范围
//和反柯里化 扩大函数的范围

// function isType(content,type) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }

// function currying(fn) {
//     let args = Array.prototype.slice.call(arguments,1)
//     return function () {
//         let lastArgs = args.concat(Array.prototype.slice.call(arguments))
//         return fn.apply(this,lastArgs)
//     }
// }
// let IsString = currying(isType,'Number')
// console.log(IsString(12))
//2)反柯里化
// object.prototype.toString => toString

