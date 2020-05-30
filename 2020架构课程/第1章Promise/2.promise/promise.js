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
        if(this.status === RESOLVED){
            onfulfilled(this.value)
        }
        if(this.status === REJECTED){
            onrejected(this.reason)
        }
        if(this.status === PENDING){
            //这时候executor是肯定有异步逻辑,那就用2个数组分别把成功和失败的回调放入数组里面，形成一个队列回调
            this.onResolvedCallbacks.push(()=>{
                // TODO...切片编程
                onfulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => {
                onrejected(this.reason);
            });
        }
    }

}

module.exports = Promise;