// z文件需要整合 x文件和y文件  这个文件作为统一的入口

// import {x} from './x';
// import {y} from './y';

// export {
//     x,
//     y
// }

// 导入立刻导出

export * from './x'
export {y} from './y'  // 如果导出变量同名的话  是后面的会覆盖前面的
// console.log(y);没有使用import  import才会有声明的效果
// 有很多模块




