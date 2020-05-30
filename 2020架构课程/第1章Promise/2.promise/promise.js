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
// 每个promise实例有一个then方法 放成功和失败的方法

//通过发布订阅 来实现异步逻辑

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
// Object.defineProperty(promise,'then',{
//     get(){
//         throw Error('错误')
//     }
// })
//判断x是让promise2变成功还是失败
function resolvePromise(promise2,resolve,reject) {
    //此方法为了兼容所有的promise
    //1)不能引用同一个对象
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>--'))
    }
    //2)判断x类型
    //如果是对象或函数 说明有可能是一个promise
    if((typeof x === 'object' && x!=null) || typeof x === 'function'){
        try {
            let then = x.then;
            if(typeof then === 'function'){// promise
                then.call(x,(y)=>{ //then只取依次
                    resolve(y);
                },(r)=>{
                    reject(r);
                })
            }else{
                // {a:1,then:1}
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }

    }else{//普通值直接resolve成功
        resolve(x);
    }
}
// resolve一执行 就会执行then方法里面的回调
//onfulfilled   onrejected 要用异步去执行，延迟执行 才可以拿到promise2实例
class Promise{
    constructor(executor){//宏变量
        this.status = PENDING; //默认状态 等待态
        this.value = undefined;//成功的原因
        this.reason = undefined;//失败的原因
        //专门存放成功的回调函数
        this.onResolvedCallbacks = [];
        // 专门存放失败的回调函数
        this.onRejectedCallbacks = [];
        //保证状态是等待态才可以更改状态
        let resolve = (value) => {
            if(this.status === PENDING){
                this.value = value;
                this.status = RESOLVED;
                // 需要让成功的方法依次执行
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        let reject = (reason) => {
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                //需要让失败的方法依次执行
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }
        // 执行executor 传入成功和失败
        try {
            executor(resolve,reject);
        } catch (e) {
            console.log(e)
            reject(e)//如果内部出错直接将err手动的调用reject方法向下传递
        }
        
    }
    then(onfulfilled,onrejected){
        let promise2 = new Promise((resolve,reject)=>{

            if(this.status === RESOLVED){
                // 执行then中的方法 可能返回是一个普通值或promise
                //我们要判断x的类型，如果是promise的话，需要让这个promise执行，并且采用它的状态 作为promise的成功或者失败
                setTimeout(()=>{
                    try {
                        let x =  onfulfilled(this.value)
                        // console.log(x);
                        // resolve(x);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {//一旦执行then方法报错，就走到外层then方法的错误处理中，调用promise2的reject方法
                        reject(e);
                    }
                },0)
             }
             if(this.status === REJECTED){
               setTimeout(()=>{
                try {
                    let x =  onrejected(this.reason);
                   // resolve(x);//如果then返回的是一个普通值(不管是成功或失败)就走成功，都要resolve出去
                   resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
               },0)
             }
             if(this.status === PENDING){
                 //这时候executor是肯定有异步逻辑,那就用2个数组分别把成功和失败的回调放入数组里面，形成一个队列回调
                 this.onResolvedCallbacks.push(()=>{
                     // TODO...切片编程
                     setTimeout(()=>{
                        try {
                            let x =  onfulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (e) {
                            reject(e);
                        }
                     },0)
                 });
                 this.onRejectedCallbacks.push(() => {
                   setTimeout(()=>{
                    try {
                        let x =  onrejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                   },0)
                 });
             }

        });
       
        return promise2;
    }

}

module.exports = Promise;