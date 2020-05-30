// catch特点 如果都没有错误处理(一层层找)没有找到错误处理 会找最近的
// catch,catch也是then遵循then规范
// .then.then并不是和jqery一样返回this 每次都是返回一个新的promise

// 什么时候走成功 then返回的是一个普通值(不管是成功或失败) 或者一个promise (成功的promise)
// 失败的情况 返回的是一个失败的promise 或者抛出异常也会走失败 回调

let Promise = require('./promise');

const promise = new Promise((resolve,reject)=>{
    resolve('hello')
})

// let p =promise.then(()=>{

// }).then(()=>{

// })
//这是then两次的结果

// 因为调用了resolve（‘hello'） 所以在then会拿到data数据
let promise2 = promise.then((data)=>{
    throw new Error();
    return 100; // promise.resovle(100)
    //(100)
})

promise2.then((data)=>{
    console.log(data,'data');
})


//1.step引用同一个对象

let p2 = promise.then(()=>{
    return p2;
})

p2.then(()=>{},err=>{
    console.log(err);
})