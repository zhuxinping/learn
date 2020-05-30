
let fs = require('fs');
let path = require('path')
// 订阅好一件事 当这件事发生的时候 触发对应的函数
// 订阅on  发布 emit  promise内部也是基于发布订阅的
// 只要发布了  就应该让订阅的事件执行
let e = {
    _obj:{},
    _callback:[],
    on(callback){// 订阅就是将函数放到数组中
        this._callback.push(callback)
    },
    emit(key,value){
        // 让订阅中的数组方法依次执行
        //发布的时候除了 接收信息 也要执行对应的回调里面的队列方法
        this._obj[key] = value;
        this._callback.forEach(method=>{
            method(this._obj);
        })
    }
}

e.on(function (obj) { //每次发布 都会触发此函数
    console.log('获取一个')
})

e.on(function (obj) { //每次发布 都会触发此函数
    if(Object.keys(obj).length === 2){//用户根据结果 自己决定输出
        console.log(obj)
    }
})

// 多个类之间可以解除耦合关系


fs.readFile(__dirname+'/age.txt','utf8',function (error,data) {
    // console.log(data)
    e.emit('age',data)
})

fs.readFile(__dirname+'/name.txt','utf8',function (error,data) {
    // console.log(data)
    e.emit('name',data)
})

// 发布订阅 所有库中都存在发布订阅  特点是 订阅方和发布方没有任何联系
  
// 观察者模式 观察者和被观察者

console.log(Object.keys({name:'1',age:2}))
console.log(Object.values({name:'1',age:2}))
console.log(Object.entries({name:'1',age:2}))