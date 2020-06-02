// // reduce 收敛  把一个数组 转化为一个值

// [1,2,3].reduce((prev,next,index,current)=>{

// }) //第二个参数 是指定数组的第一项
// [
//     {
//         count:3,
//         price:5
//     },{
//         count:4,
//         price:4
//     }
// ].reduce((prev,next)=>{
//     return prev+next.count*next.price;
// },0)
// // 扁平化  实现flat 这个方法
// let r = [1,[2,[3,[4,[5]]]]];

//compose  组合函数 把多个函数组合在一起

function sum(a,b) {
    return a+b;
}
function len(str) {
    return str.length
}
function addCuurrency(str) {
    return '$'+str;
}
// redux
function compose(...fns) {
    return function (...args) {
       let lastFn =  fns.pop();
     return fns.reduceRight((prev,next)=>{
           return next(prev);
       },lastFn(...args))
    }
}
let r1 =  compose(addCuurrency,len,sum)('abc','mpq');
console.log(r1);
// sum('xyz','mpq')


let compose = (...fns)=>(...args)=>{
    let lastFn = fns.pop();
    return fns.reduceRight((prev,next)=>next(prev),lastFn(...args))
}

function compose(...fns) {
    fns.reduce((prev,next)=>{
        return function (...args) {
            return prev(next(...args))
        }
    })
}

let compose = (...fns)=>fns.reduce((a,b)=>(...args)=>a(b(...args)))

// 箭头函数没有this  没有 arguments 没有prototype

let a = 100;//let声明的a不会污染全局的window的属性值

// let obj = {
//     a:1,
//     say(){
//         setTimeout(function () {
//             console.log(this.a)//undefind
//         },1000)
//     }
// }

// let obj = {
//     a:1,
//     say(){
//         // obj = this
//         setTimeout( ()=> {
//             console.log(this.a)//undefind
//         },1000)
//     }
// }
let obj = {
    a:1,
    say:()=>{
        // 最终找到的是window
        setTimeout( ()=> {
            console.log(this.a)//undefind
        },1000)
    }
}
obj.say();

