//把data中的数据 使用Object.defineProperty 重新定义ES5 
import {arrayMethods} from './array.js';
import {isObject,def} from '../util/index'
class Observer{
    constructor(value){
        //    value.__ob__ = this;
          def(value,'__ob__',this);
            //vue如果数据层次过多 需要递归的去解析对象中的属性，依次增加set get方法
            // proxy不用递归解析就可以
            if(Array.isArray(value)){
                // 如果是数组的话 并不会对索引进行观测  因为会导致性能问题
                //前端开发中 很少 很少操作索引 push shift unshift重新这些方法
                //如果数组放的是对象 我再监控
                value.__proto__ = arrayMethods;
                this.observerArray(value);
            }else{
                this.walk(value);
            }
            
    }
    observerArray(value){
        for(let i=0;i<value.length;i++){
            observe(value[i]);
        }
    }
    walk(data){

        let keys = Object.keys(data);
        keys.forEach((key)=>{
            defineReactive(data,key,data[key]);
        })

        // let keys = Object.keys(data);//[name,age];
        // for(let i = 0;i<keys.length;i++){
        //     let key = keys[i];
        //     let value = data[key];
        //     defineReactive(data,key,value);//定义响应式
        // }
    }
}

function defineReactive(data,key,value) {
    //传入value递归判断是否是对象 进行数据劫持
    observe(value);
    Object.defineProperty(data,key,{
        get(){//获取值的时候做一些操作
            return value;
        },
        set(newValue){//设置值的时候做一些操作
            if(newValue === value) return;
            //设置的值可能也是一个对象 要继续劫持
            observe(newValue);
            //值放生变化了
            value = newValue;
        }
    });
}

export function observe(data) {
    // console.log(data,'observe');
    let isObj = isObject(data);
    // console.log(isObj);
    if(!isObj){
        return;
    }
   return new Observer(data);//用来观测数据    
}