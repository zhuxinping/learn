let fs = require('fs');
let Promise = require('./promise');
// fs.readFile(__dirname+'./name.txt','utf8',(err,data)=>{

// })

// fs.readFile(__dirname+'./age.txt','utf8',(err,data)=>{
    
// })
//将异步方法转成promise

function read(...args){
    // return new Promise((resolve,reject)=>{
    //    fs.readFile(...args,function(err,data){
    //        if(err) reject(err);
    //        resolve(data);
    //    }) 
    // })
    let dfd = Promise.defer();//延迟对象 可以解决promise的嵌套问题
    fs.readFile(...args,function(err,data){
        if(err) dfd.reject(err);
        dfd.resolve(data);
    }) 
    return dfd.promise;
}


// read(__dirname+'/name.txt','utf8').then(data=>{
//     console.log(data)
// },err=>{
//     console.log(err)
// }).then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err);
// })

// read(__dirname+'/name.txt','utf8').then(data=>{
//     return read(__dirname+'/'+data,'utf8');
// },err=>{
//     console.log(err)
// }).then(data=>{
//     console.log(data)
// }).then(null,err=>{
//     console.log(err)
// })

// read(__dirname+'/name.txt','utf8').then(data=>{
//     return read(__dirname+'/'+data,'utf8');
// },err=>{
//     console.log(err)
// }).then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

//catch相当于then只是少了成功回调，只有失败回调

//直接将异步的node方法转化成promise方法

// let {promisify} = require('util');
function promisify(fn) {//高阶函数保存一个变量,可以具体化fn 比如readFile  writeFile等等
    return function (...args) {//readFile
        return new Promise((resolve,reject)=>{
            //fs.readFile(__dirname+'/'+data,'utf8',(err,data)=>{});
            fn(...args,function (err,data) {
                if(err)reject(err)
                resolve(data);
            })
        })
    }
}
let readFile = promisify(fs.readFile);//高阶函数 把它转化promise
readFile(__dirname+'/name.txt','utf8').then(data=>{
    return readFile(__dirname+'/'+data,'utf8');
},err=>{
    console.log(err)
}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})