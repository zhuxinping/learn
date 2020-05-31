// generator 生成器 生成的是迭代器
// 普通函数执行时没有停止功能 generator函数可以暂停

// function *read() {
//     yield 1;//产出
//     yield 2;//产出
//     yield 3;//产出
//     yield 4;//产出
//     yield 5;//产出
// }

// let it = read();// iterator
// // 迭代器接口Symbol.iterator
// // console.log(it.next());// {value,done} 碰到关键字yield就停止了
// // console.log(it.next());
// let done = false;
// while(!done){
//     let obj = it.next();
//     done = obj.done;
//     console.log(obj.value);
// }
// es6特性
// function *read() {
//     let a = yield 1;//产出
//     console.log(a);
//     let b = yield 2;//产出
//     console.log(b);
//     let c = yield 3;//产出
//     console.log(c);
// }

// let it = read();// iterator
// 迭代器接口Symbol.iterator
// console.log(it.next());// {value,done} 碰到关键字yield就停止了
// console.log(it.next());
// let done = false;
// while(!done){
//     let obj = it.next();
//     done = obj.done;
//     // console.log(obj.value);
// }
// it.next('hello');//第一次next传递的参数无意义

// it.next('world');

// generator+promise
const util = require('util');
const fs = require('fs');
let read = util.promisify(fs.readFile);


function *readAge(){// 暂停的功能
  let content = yield read(__dirname+'/name.txt','utf8');
  let age = yield read(__dirname+'/'+content,'utf8');
  return age;
    // return 1;
}

// let it = readAge();

// let {value} = it.next();
// value.then(data=>{
//     // console.log(data)
//     let {value} = it.next(data);
//     value.then(data=>{
//         let {value,done} = it.next(data);
//         console.log(done,value);
//     })
// })

// tj
/**
 *
 *
 * @param {*} it 迭代器对象
 * @returns  promise
 */
function co(it) {
    return new Promise((resolve,reject)=>{
        //异步迭代
        function next(prevresult) {
            let {value,done} = it.next(prevresult);
            if(done){
                resolve(value);//如果第一次就return直接把value抛出去
            }else{
                //如果是异步
                Promise.resolve(value).then(data=>{
                //    it. next(data);
                    next(data);
                },reject)
            }
        }
        next();//第一次调用
    });
}
//依次去执行生成器 不停调用next方法 将最终结果返回


co(readAge()).then(data=>{
    console.log(data);
})

// function * gen() {
//     while(true){
//         try {
//             yield 100;
//         } catch (e) {
//             console.log('err',e);
//         }
//     }
// }
// let it = gen();
// it.next();
// it.throw(new Error('wrong'));
// 编译出来的结果就是generator+co
// async function  gen() {
//         try {
//             let r = await new Promise((resolve,reject)=>{
//                 setTimeout(()=>{
//                     resolve('hello');
//                 },1000)
//             });
//             console.log(r);
//         } catch (e) {
//             console.log('err',e);
//         }
// }

async function  gen() {
    let r = await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('hello');
        },1000)
    });
    return r;
    // console.log(r);
}
gen().then(data=>{
    console.log(data);
}).catch(e=>{
    console.log(e);
});//

//1）柯里化 反柯里化
//2) Promise.finally

