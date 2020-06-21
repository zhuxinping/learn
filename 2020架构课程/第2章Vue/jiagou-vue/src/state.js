import {observe} from './observer';
export function initState(vm) {
    const opts = vm.$options;
    //vue的数据来源 属性 方法  数据 计算属性 watch
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethod(vm);
    }
    if(opts.data){
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }
}

function initProps() {
    
}

function initMethod() {
    
}

function initData(vm) {
    // 数据初始化工作
    // console.log('初始化数据',vm.$options);
    //data可能是对象 也可能是函数(方法) 是方法就执行返回一个对象
    let data = vm.$options.data;//用户传递的数据
    data = vm._data = typeof data === 'function'?data.call(vm):data;
    //对象劫持   用户改变数据 我希望可以得到通知
    // MVVM模式  数据变化 可以驱动界面的更新
    // console.log(data); 
    observe(data);//响应式原理 增加get set方法

}

function initComputed() {
    
}

function initWatch() {
    
}