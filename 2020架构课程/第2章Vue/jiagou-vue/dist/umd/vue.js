(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  //重写数组的 7个方法  push shift unshift pop reverse sort splice 会导致数组本身发生变化

  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      console.log('用户调用了数组的方法');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); //调用原生的数组方法
      // push unshift  添加的元素 可能还是一个对象

      var inserted; //当前用户插入的元素

      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      }

      if (inserted) ob.observerArray(inserted); //新增属性继续观测

      return result;
    };
  });

  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //    value.__ob__ = this;
      def(value, '__ob__', this); //vue如果数据层次过多 需要递归的去解析对象中的属性，依次增加set get方法
      // proxy不用递归解析就可以

      if (Array.isArray(value)) {
        // 如果是数组的话 并不会对索引进行观测  因为会导致性能问题
        //前端开发中 很少 很少操作索引 push shift unshift重新这些方法
        //如果数组放的是对象 我再监控
        value.__proto__ = arrayMethods;
        this.observerArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        }); // let keys = Object.keys(data);//[name,age];
        // for(let i = 0;i<keys.length;i++){
        //     let key = keys[i];
        //     let value = data[key];
        //     defineReactive(data,key,value);//定义响应式
        // }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    //传入value递归判断是否是对象 进行数据劫持
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        //获取值的时候做一些操作
        return value;
      },
      set: function set(newValue) {
        //设置值的时候做一些操作
        if (newValue === value) return; //设置的值可能也是一个对象 要继续劫持

        observe(newValue); //值放生变化了

        value = newValue;
      }
    });
  }

  function observe(data) {
    // console.log(data,'observe');
    var isObj = isObject(data); // console.log(isObj);

    if (!isObj) {
      return;
    }

    return new Observer(data); //用来观测数据    
  }

  function initState(vm) {
    var opts = vm.$options; //vue的数据来源 属性 方法  数据 计算属性 watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // 数据初始化工作
    // console.log('初始化数据',vm.$options);
    //data可能是对象 也可能是函数(方法) 是方法就执行返回一个对象
    var data = vm.$options.data; //用户传递的数据

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; //对象劫持   用户改变数据 我希望可以得到通知
    // MVVM模式  数据变化 可以驱动界面的更新
    // console.log(data); 

    observe(data); //响应式原理 增加get set方法
  }

  // ast语法树  用对象来描述原生语法的 虚拟dmo 用对象来描述dom节点的
  function compileToFunction(template) {
    return function render() {};
  } // let root = {
  //     tag:'div',
  //     attrs:[{name:'id',value:'app'}],
  //     parent:null,
  //     children:[
  //         {
  //             tag:'p',
  //             attrs:[],
  //             parent:root,
  //             type:1,
  //             children:[
  //                 {
  //                     text:'hello',
  //                     type:3
  //                 }
  //             ]
  //         }
  //     ]
  // }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // console.log(options);
      // 数据的劫持
      var vm = this; // vue中使用this.$options指代的是用户传递的属性

      vm.$options = options; //初始化状态

      initState(vm); //分割代码
      // 如果用户传入了el属性 需要将页面渲染出来
      // 如果用户传入了el就要实现挂载的功能

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 默认先会查找render方法，没有就会采用template，没有
      //就采用el中的模板

      if (!options.render) {
        //对模板进行编译
        var template = options.template; //取出模板

        if (!template && el) {
          template = el.outerHTML;
        }

        console.log(template); // 我们需要将template转化render方法 

        var render = compileToFunction();
        options.render = render;
      }
    };
  }

  // Vue核心代码  是Vue的一个声明

  function Vue(options) {
    // Vue初始化操作
    // console.log(options);
    this._init(options);
  } // 通过引入文件的方式 给Vue原型上添加方法


  initMixin(Vue); //给Vue原型上添加一个_init方法

  return Vue;

})));
//# sourceMappingURL=vue.js.map
