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
function resolvePromise(promise2,x,resolve,reject) {
    //此方法为了兼容所有的promise
    //1)不能引用同一个对象
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>--'))
    }
    //2)判断x类型
    //如果是对象或函数 说明有可能是一个promise
    let called;//判断是否状态改变过了
    if((typeof x === 'object' && x!=null) || typeof x === 'function'){
        try {
            let then = x.then;
            if(typeof then === 'function'){// promise
                then.call(x,(y)=>{ //then只取依次
                    // resolve(y);
                    //y解析的结果可能还是一个promise那就要递归调用解析promise直到是一个普通值为止
                   //递归解析resolve的值
                   if(called) return;
                   called = true;
                    resolvePromise(promise2,y,resolve,reject);//y可能也是一个promise继续递归
                },(r)=>{
                    if(called) return
                    called = true;
                    reject(r);
                })
            }else{
                // {a:1,then:1}
                resolve(x);
            }
        } catch (e) {
             //我取then出错了 在错误中又掉了该promise的成功，如果之前有调用过就不能再调用了直接return
             if(called) return
             called = true;
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
            //增加判断如果resolve中的value也是promise需要特殊处理
            if(value instanceof Promise){
                // value.then((val)=>{
                //     resolve(val);
                // },reject)//这边可以拿到reject 因为reject是先声明这边异步后执行的所以reject可以取到
                value.then(resolve,reject);//递归解析直到是普通值为止
                return;
            }
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
    //catch的实现
    catch(errCallback){
        return this.then(null,errCallback);
    }
    then(onfulfilled,onrejected){
        onfulfilled = typeof onfulfilled == 'function'?onfulfilled:v=>v
        onrejected = typeof onrejected == 'function'?onrejected:(err)=>{throw err}
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === RESOLVED){
                // 执行then中的方法 可能返回是一个普通值或promise
                //我们要判断x的类型，如果是promise的话，需要让这个promise执行，并且采用它的状态 作为promise的成功或者失败
                setTimeout(()=>{
                    try {
                        //成功的回调返回值可能是普通值也可能是promise ，promise就要继续解析
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
//测试用例
Promise.defer = Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise;
// npm install -g promises-aplus-tests
//reject和 resolve相当于发布 并且抛出信息出来
//then相当于订阅成功或失败的回调 
// 如果new Promise的执行器里面立即同步执行reject或resolve，则pending状态就立即回改变，那么then里面订阅的成功或失败的回调onfulfilled或onrejected会被立即执行，
//回调可能会有报错 所以需要try - catch 如果执行器是异步执行reject或resolve那么说明状态pending不会立即被改变，就需要将订阅的成功或失败的回调分别放入各自的数组队列中，等到异步成功或失败执行完毕,resolve或reject发布的时候
//状态pending发生变化，则会对应依次执行各自的数组队列里面的方法

//then方法总会返回一个新的promise，then的成功或失败的回调可能会返回一个普通值或promise，如果是普通值则直接resolve会将普通值抛出到下个then方法的回调
// 如果是promise就要继续执行这个promise，这个promise执行器的成功或失败的回调如果成功回resolve调抛出的还是一个promise，就要递归执行解析resolve，直到resolve一个普通值或reject



//总的来说相当于then同步或异步订阅成功或失败的回调 resolve或reject去发布订阅，触发订阅事件执行，同时把信息也抛出去给订阅的事件
//由于then要返回一个新的promise，所以在then方法内部如果要调用自己new promise2会出现错误，所以promise规范规定
//then中的onfulfilled和onrejected要用异步执行，延迟执行new promise2防止出错  异步可以使用setTimeout(()=>{},0) 或其他的微任务nextTick等等

// let a = ()=>{
//     console.log(b);
// }
// let b = 30;//b先声明 后执行a所以可以在a中取到b
// a();