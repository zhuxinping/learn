// Promise.resolve
let Promise = require('./promise');
// let p = new Promise((resolve,reject)=>{
//     resolve(new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(1000);
//         },1000)
//     }))
// })

// p.then((data)=>{
//     console.log(data);
// })
Promise.resolve = function (value) {
    return new Promise((resolve,reject)=> {
        resolve(value);
    })
}

Promise.reject = function (err) {
    return new Promise((resolve,reject)=>{
        reject(err);
    })
}
// Promise.resolve(100).then(data=>{
//     console.log(data);
// })

// Promise.resolve(new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('1000');
//     },1000)
// })).then(data=>{
//     console.log(data);
// })

Promise.reject(new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('aaa');
    },1000)
})).catch(data=>{
    console.log(data);
})

// Promise.resolve(new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('aaa');
//     },1000)
// })).then(data=>{
//     console.log(data);
// })
//  Promise.resolve Promise.reject区别
// Promise.resolve可以接收一个promise
// Promise.reject接受promise不会有等待的效果，因为源码里面reject的回调是直接执行

// Promise.finally实现原理

// Promise.finally = (callback)=>{
//     // 面向切面编程
//     return this.then((value)=>{
//         Promise.resolve(callback()).then((value)=>{})
//     },reason=>{
//         Promise.resolve(callback()).then(reason=>{
//             throw reason
//         })
//     })
// }


Promise.done = (resolve,reject)=>{
    this.then(resolve,reject).catch(reason=>{
        setTimeout(()=>{
            throw reason;
        },0)
    })
}
