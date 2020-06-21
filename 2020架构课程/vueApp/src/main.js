// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Axios from 'axios';
// import {VueLazyload} from './utils/vue-lazyload';
// import loading from '../images/1.gif';
// Vue.use(VueLazyload,{
//   preLoad:1.3,
//   loading
// });
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue({});
/* eslint-disable no-new */
/**
 * 1.渲染采用模板的顺序
 * 2.默认会先查找用户传入的Render函数
 * 3.如果没有render  查找template
 * 4.如果没有传入render 函数会采用el对应的元素进行渲染
*/
let vm = new Vue({
  el: '#app',//渲染的那个节点
  data(){
    return {
      name:{
        n:'zxp'
      },
      active:false,
      b:'zxp',
      arr:[1,2,3],
      html:'<h1>dddd</h1>',
      imgs:[
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg',
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg',
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg',
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg',
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg',
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg',
        '//img13.360buyimg.com/focus/s140x140_jfs/t11209/197/2422417970/2811/d167e855/5a17f1edN56abbe6e.jpg'
      ],
    }
  },
  created(){
    
  },
  directives:{
    clickOutside:{//函数写法
      bind(el,bindings,vnode){
         el.handler = (e)=>{
          if(!el.contains(e.target)){
            console.log(bindings);
            let method = bindings.expression;
            vnode.context[method]();
          }
        }
        document.addEventListener('click',el.handler);
      },
      unbind(el,bindings,vnode){
        document.removeEventListener('click',el.handler);
      }
      // bind(el,bindings,vnode,oldVnode){
      //   console.log(el.parentNode,bindings,vnode,oldVnode);
      // },
      // inserted(el,bindings,vnode,oldVnode){
      //   console.log(el,bindings,vnode,oldVnode);
      // },
      // update(el,bindings,vnode,oldVnode){
      //   console.log(el,bindings,vnode,oldVnode);
      // },
      // componentUpdated(el,bindings,vnode,oldVnode){
      //   console.log(el,bindings,vnode,oldVnode);
      // },
      // unbind(){
      //   //解除事件绑定
      // }
    }
  },
  methods:{//内部会绑定this永远指向当前实例
    focus(){
      // this.a.call(100);
      this.active = true;
    },
    blur(){
      this.active = false;
    },
    a(){
      console.log(this);
    }
  },
  router,
  components: { App },
  // template: '<App/>',
})
//模板语法 会在当前vue实例上进行取值 
// 表达式只能存放  有返回值的结果
// new Vue({
//   el: '#app',//渲染的那个节点
//   data(){
//     return {name:'zxp'}
//   },
//   router,
//   components: { App },
//   template: '<App/>',
//   render(h){
//     return h('h1',{id:'xxx'},this.name)
//   }
// })
// 1.不存在的属性 如果新增的话 不能渲染 内部会采用
// defineProperty 重新定义属性 getter 和setter

vm.name = {//可以触发更新
  ...vm.name,
  a:1
}
//内部也会触发更新 而且新增的a属性是可以响应式的
// vm.$set(vm.name,'a',2)
// vm.name.a = 100;
//数据尽量少嵌套  会有性能问题

// 2.数组只能通过改变数组的7个方法更新视图  不能使用 索引 长度

// vm.$set(vm.arr,0,100);//内部会使用splice
// vm.$delete
// vm.$mount 内部会判断用户是否传入el属性 如果没有不会进行挂载操作
// vm.$mount('#app');//有可能有些组件我希望不挂载在app的节点上
//这个方法可以自定义挂载点  弹框组件
// vue3.0 使用了proxy 来实现响应式  而且不用一上来就使用递归 兼容性差

// vm.$options//用户传入的所有属性
// vm.$data == vm._data;
// console.log(vm.$options);
// console.log(vm.$data == vm._data);
// vm.b = '1212';
//  console.log(vm.b);
// console.log(vm.$nextTick(()=>{}));//保证页面渲染完毕后  获取的是最新的dom元素
// console.log(vm.$el)

// 默认我们有渲染watcher  还可以用户自定义watcher
// vm.$watch('b',(newVal,oldVal)=>{
//   console.log('newVal',newVal);//watch只会执行一次  会手收集依赖放入队列 去重操作
// });
// vm.b = 1;
// vm.b = 2;
// vm.b = 3;

// 指令的目的就是dom操作

