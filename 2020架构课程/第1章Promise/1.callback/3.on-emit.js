// 高阶函数  运用到 "异步"
// 什么叫异步  1)执行后的返回结果不能立马获取 ajax  等待同步代码执行后 才会获取最终结果
// setTimeout(() => {
//     console.log('1000')// 不会打印因为同步代码没执行完
// },1000)

// while(true){

// }
// 异步的解决方案 最早就是基于回调函数的   不能使用try catch来解决异步 这个只能是用来捕获同步的错误
// node中 文件操作都是异步的 
// node中回调函数的第一个参数 永远是error
let fs = require('fs');
let path = require('path')
// const {resolve} = require('path')


// console.log('__dirname : ' + __dirname)
// console.log('resolve   : ' + resolve('./'))
// console.log('cwd       : ' + process.cwd())
// console.log(__dirname+'/age.txt')

// 基于回调的方式 获取最终的结果

function after(times,callback) {
    let renderObj = {}
    // times会保存在当前执行上下文中
    return function (key,value) { // out
        renderObj[key] = value;
        if(--times == 0){//times永远取外层作用域
            callback(renderObj);
        }
    }
}

let out = after(2,function (renderObj) {
    console.log(renderObj)
})

fs.readFile(__dirname+'/age.txt','utf8',function (error,data) {
    console.log(data)
    // renderObj['age'] = data;
    out('age',data);
})

fs.readFile(__dirname+'/name.txt','utf8',function (error,data) {
    console.log(data)
    // renderObj['name'] = data;
    out('name',data);
})

// 发布订阅 所有库中都存在发布订阅

// 观察者模式

