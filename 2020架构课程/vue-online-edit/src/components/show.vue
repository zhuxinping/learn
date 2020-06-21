<template>
  <div class="show">
    <h1>代码运行结果</h1>
    <div class="show-box" ref="show">
    
    </div>
  </div>
</template>

<script>
export default {
  props:{
    code:{
      type:String,
      default:''
    }
  },
  data(){
    return{

    }
  },
  methods:{
    getSource(type){
      const reg = new RegExp(`<${type}[^>]*>`);
      let code = this.code;
      let matches = code.match(reg);
      // console.log(matches);
      if(matches){
        let tag = matches[0];
        return code.slice(code.indexOf(tag)+tag.length,code.lastIndexOf(`</${type}>`))
      }
      return '';
    },
    run(){
      // console.log(this.code);
      // console.log('run');
      const template = this.getSource('template');
      const script = this.getSource('script').replace(/export default/,'return');
      const style = this.getSource('style');
      // console.log(template);
      // console.log(script);
      // console.log(style);
      //动态加载一个组件  组件就是一个对象 包括data render 生命周期
      let component = {};
      if(script){
          component = new Function(script)();
      }
      if(template){
          component.template = template;
         let instance =  new (this.$options._base.extend(component));
          console.log(instance);
          this.$refs.show.appendChild(instance.$mount().$el)
          // instance.$mount().$el;//在内存中进行挂载  挂载的结果放到了$el上

      }
      if(style){
        let element =document.createElement('style');
        element.type='text/css';
        element.innerText = style;
        document.body.appendChild(element);
      }
      // $mount可以实现手动挂载组件
      //先获取组件实例  需要将对象转虚拟dom再渲染

   
    // console.log(component);



    }
  }
}
</script>

<style lang="stylus">

</style>