// console.log(this);//this不是globalß
// 模块化的概念  node中为了实现模块化，给每个文件都包装了一个函数 这个行数中的this就被更改
// console.log(this === global);//false

// console.log(this === module.exports);

// console.log(Object.keys(global));
// process 进程

// console.log(process);
// console.log(process.platform);//进程运行的平台 win32 drain32
// console.log(process.argv);//当前进程执行时所带的参数 默认是数组类型 参数前2个是固定的
// 1.node当前的执行命令文件
// 2.当前执行的文件是谁 node文件执行时 可以传递参数  这些参数放在数组第三项
// 解析用户传递的参数
//'/Users/mac/learn/2020架构课程/第6章Node/global.js'
// let r = process.argv.slice(2).reduce((memo,current,index,arr) => {
//     if(current.startsWith('--')){
//         memo[current.slice(2)] = arr[index+1];
//         return memo;
//     }
// },{});
// console.log(r);
// commander  yargs(webpack)








// console.log(process.cwd());
// console.log(process.env);
// console.log(process.nextTick);
// Buffer 是node中为了实现二进制操作，提供的类
//在当前命令行窗口下设置环境变量 window set命令  export命令  => cross-env 
// cross-env  env= development && node xxxx

// clearInterval
// clearTimeout
// setImmediate
// decodeURIComponent
// global上拥有v8引擎上的方法
// const program = require('commander');
// program.name('node');
// program.usage('global.js');
// program.version('1.0.0')
// program.option('-p, --port <v>','please set your port')
// program.option('-c, --config <v>','please set your config')
// let r = program.parse(process.argv);
// console.log(r);

// program.command('create').action(()=>{
//     console.log('创建');
// })

// program.on('--help',function(){
//     console.log('\r\n run command');
//     console.log('\r\n node global -p 3000');
// })
// webpack 找配置文件  当前工作目录下找

// console.log(process.cwd());//当前目录

console.log(process.env);//区分环境

// 在当前命令行窗口下 设置环境变量 window set命令  export命令  => cross-env

// console.log(process.nextTick());
// nextTick和promise是2个队列 所以会先清空nextTick队列

process.nextTick(()=>{
    console.log(1)
        process.nextTick(()=>{
            console.log(2);
        })
})
Promise.resolve().then(()=>{
    console.log('promise');
})
// 如果 setImmediate和setTimeout在默认环境下执行会受性能影响

setImmediate(()=>{
    console.log('setImmediate');
})

setTimeout(()=>{
    console.log('setTimeout');
},0)
//node 事件环 在node10版本之后  统一执行效果和浏览器一致


//nextTick  // node中实现的微任务 优先级比promise还要高


