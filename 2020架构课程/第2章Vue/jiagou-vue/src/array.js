//重写数组的 7个方法  push shift unshift pop reverse sort splice 会导致数组本身发生变化

import { observe } from "./observer";

// slice() 不会改变数组 就不用劫持
let  oldArrayMethods = Array.prototype;

export const arrayMethods = Object.create(oldArrayMethods);

const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverse'
];

methods.forEach(method=>{
    arrayMethods[method] = function (...args) {
        console.log('用户调用了数组的方法');
        const result = oldArrayMethods[method].apply(this,args);//调用原生的数组方法
       // push unshift  添加的元素 可能还是一个对象
       let inserted;//当前用户插入的元素
       let ob = this.__ob__;
       switch(method){
            case 'push':
            case 'unshift':
            inserted = args;
            break;
            case 'splice':
            inserted = args.slice(2)
            default:
                break;
       }
       if(inserted) ob.observerArray(inserted);//新增属性继续观测
        return result;
    }
})