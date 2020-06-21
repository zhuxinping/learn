import {initState} from './state'
import {compileToFunction} from './compiler/index.js'
//在原型上添加一个init方法

export function initMixin(Vue) {
    Vue.prototype._init =function (options) {
        // console.log(options);
        // 数据的劫持
        const vm = this;// vue中使用this.$options指代的是用户传递的属性
        vm.$options = options;
        //初始化状态
        initState(vm);//分割代码
        // 如果用户传入了el属性 需要将页面渲染出来
        // 如果用户传入了el就要实现挂载的功能
        if(vm.$options.el){
            vm.$mount(vm.$options.el);
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        // 默认先会查找render方法，没有就会采用template，没有
        //就采用el中的模板
        if(!options.render){
            //对模板进行编译
            let template = options.template;//取出模板
            if(!template && el){
                template = el.outerHTML;
            }
            console.log(template);
            // 我们需要将template转化render方法 
            const render = compileToFunction(template);
            options.render = render;
        }
    }
}