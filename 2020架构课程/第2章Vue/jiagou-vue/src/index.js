// Vue核心代码  是Vue的一个声明
import {initMixin} from './init'
function Vue(options) {
    // Vue初始化操作
    // console.log(options);
    this._init(options);
}

// 通过引入文件的方式 给Vue原型上添加方法
initMixin(Vue);//给Vue原型上添加一个_init方法

export default Vue;