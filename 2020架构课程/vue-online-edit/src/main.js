import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
console.log(App);
new Vue({
  render: h => h(App),
  // ...App  //App里面也有render方法 展开就会渲染
}).$mount('#app')
