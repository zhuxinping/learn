//目前低版本浏览器IE不支持promise需要polyfill es6-promise(这个包实现了promise)

//高版本都支持了promise

//1.promise是一个类 天生的  类中 需要传入一个executor执行器 默认会立即执行

// new Promise(()=>{
//     console.log(1)
// })
// console.log(2)

// 2. promise 内部会提供两个方法 可以更改promise状态  3个状态

// 等待态  成功态  失败态 resolve 触发成功 (成功的内容) reject 触发失败 (失败的原因) undefined
// promise是为了解决异步问题的  并发异步处理
// 如果一旦promise成功了就不能失败 反之一样
// 失败的情况 1.reject  2. 抛出异常
// 有可能别人洗的promise是一个函数
// thenable
// function Promise() {
//     return function () {
        
//     }
// }

// let p = new Promise()
// console.log(p)
let Promise = require('./promise');
let promise = new Promise((resolve,reject)=>{
    // reject()
    // throw new Error('错误')
    resolve('val')
})

promise.then((res)=>{// onfulfilled 成功
    console.log(res)
},(err)=>{// onrejected 失败
    console.log(err)
})

