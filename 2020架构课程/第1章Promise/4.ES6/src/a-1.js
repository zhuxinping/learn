// export let a = 1;
// export let b = 2;
// export let c = 3;

// export {
//     a:1,
//     b:2,
//     c:3
// }
let a = 1;
let b = 2;
let c = 2;

// setInterval(() => {
//     a++;
// }, 1000);

export {//导出的是变量 不是具体的值
    a,
    b,
    c
}

// 默认导出 直接导出某个变量 外层引入的时候 可以直接获取到
// export default {a:1,b:2}

// let obj = {a:1,b:2}
// export {
//     obj as default
// }
// export 导出是接口 变量
// export default 导出是一个具体的内容
// let q = 100;
// export default q;//只是导出变量对应的值 不能多次 默认导出

// setInterval(() => {
//     a++;
//     q++;
// }, 1000);



