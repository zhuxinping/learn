<template>
  <div id="app">
  <!-- edit.$on('input',fn)-->
  <!--可以传属性和方法-->
    <Edit @input="handleInput" @run="handleRun"></Edit>
    <Show :code="code" ref="show" ></Show>
  </div>
</template>

<script>
import Edit from '@/components/edit.vue';
import Show from '@/components/show.vue';
export default {
  name: 'App',
  components: {
    Edit,
    Show
  },
  data(){
    return{
      code:''
    }
  },
  methods:{
    handleInput(v){
      this.code = v;
      console.log(v);
    },
    handleRun(){//props $emit/@  ref
      this.$refs.show.run();
    }
  }
}
</script>

<style lang="stylus">
* 
  margin 0
  padding 0
  html, body ,#app{
    width 100%
    height 100%
  }
  #app{
    display flex
    &>div{
      width 50%
      height 100%
    }
  }
</style>
