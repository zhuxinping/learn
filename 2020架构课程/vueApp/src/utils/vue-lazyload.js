//Vue.use方法会调用插件的install方法把Vue传入
const getScrollParent = (el)=>{
    let parent = el.parentNode;
    while(parent){
        // debugger
        let reg = /(scroll)|(auto)/;
        if(reg.test(getComputedStyle(parent)['overflow'])){
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
}
const loadImageAsync = (src,resolve,reject)=>{
    let image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
}
const Lazy = (Vue)=>{
    class ReactiveListener{//每个图片元素都构造成一个类的实例
        constructor(el,src,options,elRender){
            this.el = el;
            this.src = src;
            this.options = options;
            this.elRender = elRender;
            this.state = {loading:false}//没有加载
        }
        chekInView(){
           
            let {top} = this.el.getBoundingClientRect();
            return top < window.innerHeight * (this.options.preLoad || 1.3);
            
        }

        load(){
            //先加载loading
            this.el.elRender(this,'loading');
            loadImageAsync(this.src,()=>{
                this.state.loading = true;
                this.elRender(this,'finish');
            },()=>{
                this.elRender(this,'error');
            })
        }

    }
    return class LazyClass{
        constructor(options){
            this.options = options;
            this.bindHandler = false;
            this.listenerQueue = [];
        }
        handleLazyLoad(){
            console.log('ok');
            //检测是否需要加载
            this.listenerQueue.forEach(listener=>{
                if(!listener.state.loading){
                    let catIn = listener.chekInView();
                    catIn && listener.load();
                }
            })
        }
        add(el,bindings,vnode){
            //找到父亲
            // console.log(el.parentNode);
            //带有滚动的盒子 infinteScroll
            Vue.nextTick(()=>{
                // console.log(el.parentNode);
                let scrollParent = getScrollParent(el);
                // console.log(scrollParent);
                if(scrollParent && !this.bindHandler){
                    this.bindHandler = true;
                    // console.log(scrollParent);
                    scrollParent.addEventListener('scroll',this.handleLazyLoad.bind(this));
                }
                const listener = new ReactiveListener({
                    el,
                    src:bindings.value,
                    options:this.options,
                    elRender:this.elRender.bind(this)
                });
                this.listenerQueue.push(listener);
                this.handleLazyLoad();
            })
            //需要判断当前这个元素是否在容器可视区

            // console.log(el,bindings,vnode);
        }
        elRender(listener,state){
            let el = listener.el;
            let src = '';
            switch(state){
                case 'loading':
                    src = listener.options.loading || ''
                    break;
                    case 'error':
                        src = listener.options.error || ''
                        break;
            }
            el.setAttribute('src',src);
        }

    }
}

export const VueLazyload = {
    install(Vue,options){
        // console.log(Vue);
        //把所有逻辑进行封装 把类封装到函数中

        const LazyClass =  Lazy(Vue);
        const lazy = new LazyClass(options);
        Vue.directive('lazy',{
            bind:lazy.add.bind(lazy)
        })
    }
}