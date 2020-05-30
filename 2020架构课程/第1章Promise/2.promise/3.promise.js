// promise可以解决链式调用问题

let promise = new Promise((resolve,reject)=>{
    resolve('hello');//普通值 意味着 不是一个promise
})

promise.then(data=>{
    return data; // then方法中可以返回一个值，会把这个结果放到下一次then的成功的回调中
}).then(data=>{
    console.log(data);
}).then(data=>{
    return new Promise((resolve,reject)=>{//返回的是一个promise，那么会采用这个promise的结果
        setTimeout(()=>{
            resolve('hello1');
        },1000)
    })
}).then(data=>{
    return new Promise((resolve,reject)=>{//返回的是一个promise，那么会采用这个promise的结果
        setTimeout(()=>{
            reject('world');
        },1000)
    })
}).then(()=>{},(err)=>{
    console.log(err);//如果在失败的函数中返回的是普通的值或是成功的promise也会走到外层的promise成功的回调里
}).then(()=>{
    console.log('成功')
    throw new Error('失败了');
},()=>{

}).then(()=>{},err=>{
    console.log(err);
}).catch(err=>{// 捕获错误，先找距离自己最近的如果没有错误的捕获，会找到最终的catch方法

}).then(()=>{
    console.log('then');
})
// catch特点 如果都没有错误处理(一层层找)没有找到错误处理 会找最近的
// catch,catch也是then遵循then规范
// .then.then并不是和jqery一样返回this 每次都是返回一个新的promise

// 什么时候走成功 then返回的是一个普通值 或者一个promise (成功的promise)
// 失败的情况 返回的是一个失败的promise 或者抛出异常也会走失败 回调

let p = new Promise((resolve,reject)=>{
    resolve(1)
})

let p1 = p.then(()=>{});
let p2 = p1.then(()=>{});
console.log(p1 === p2);