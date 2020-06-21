<template>
  <div class="edit">
    <div class="edit-list">
    <button @click="$emit('run')">运行</button>
    <button>情况</button>
    {{code}}
    </div>
    <div class="edit-box">
    <!--value+input 
    
     v-model 对于原生标签v-model并不等于value +input  内部会对输入法做处理，而且不同的标签解析出的结果不一样
     type checkbox =  checked+change
     -->
       <textarea @keydown.9.prevent="handleKeyDown" :value="code" @input="handleInput"></textarea>
        <!--<textarea v-model="code"></textarea>-->
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            code:''
        }
    },
    methods:{
        handleInput(e){
            this.code = e.target.value;
            //当输入的时候 将数据传递给父组件
            // 发布订阅模式实现组件的解耦合
            this.$emit('input',this.code);
        },
        handleKeyDown(e){
            console.log('用户按了tab');
        }
    }
}
</script>

<style lang="stylus">
.edit{
    .edit-list{
         padding 10px
         background #ccc
        button{
            width 80px
            height 40px
            margin 5px
        }
    }
    .edit-box{
        position absolute
        top 60px
        bottom 0
        left 0
        right 0
        textarea{
            outline none 
            width 50%
            font-size 24px
            border none
        }
    }
}
</style>