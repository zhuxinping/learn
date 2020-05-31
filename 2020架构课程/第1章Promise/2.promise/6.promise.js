let util = require('util');
let fs = require('fs');
// all方法 最终返回的是一个promise
// 如果全成功 才算成功 如果一个失败了就失败了
let read = util.promisify(fs.readFile);
function  isPromise(x) {
    if((typeof x === 'object' && x!==null) || typeof x === 'function'){
        if(typeof x.then === 'function'){
            return true;
        }
    }
    return false;
}
Promise.all = function (promises) {
    return new Promise((resolve,reject)=>{
        let arr = [];
        let idx = 0;//只要有异步的 计算器就要自己设置一个
        let processData = (value,index)=>{
            arr[index] = value
            if(++idx === promises.length){//计数器跟promises长度一样说明执行完毕
                //数据resolve派发出去
                resolve(arr);
            }
        }
        for(let i = 0; i<promises.length;i++){
            let currentValue = promises[i];
            if(isPromise(currentValue)){
                currentValue.then((y)=>{
                    processData(y,i);
                },reject)
            }else{
                processData(currentValue,i);
            }
        }
    })
}

Promise.all([1,read(__dirname+'/name.txt','utf8'),2,read(__dirname+'/age.txt','utf8'),3]).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})

// Promise.all特点是让所有的promise并发执行，根据执行个数判断是否完成

// Promise.race()
Promise.race = function (promises) {
    return new Promise((resolve,reject)=>{
       if(!Array.isArray(promises)) throw('参数必须为数组')
       let len = promises.length;
       for(let i=0;i<len;i++){
           Promise.resolve(promises[i]).then(val=>{
               resolve(val);
           }).catch(err=>{
               console.log(err);
           })
       } 
    })
}
