## 一、ES6核心应用
## 二、ES6模块的使用
##### 1)掌握类的继承使用
#### 2)模板字符串的使用 实现模板引擎
#### 3)reduce方法

#### ES6中的模块

##### ES6 模块的设计思想是尽量的静态化，使得编译时就能确定依赖关系
##### 一个文件就是一个模块，想让外部能使用这个变量就必须export变量

#### 1).模块的导出和模块的导入

#### 1).模块的导入会导致变量提升，并且import语句只能用在最顶层的作用域上
#### export 导出是接口 变量   export {a,b,c}  from './a.js 导出的是变量
#### export default 导出是一个具体的内容  export a,b,c 导出的是值

```javascript
// 导入立刻导出

export * from './x'
export {y} from './y'



```

### 简单回顾
##### 变量声明var、let、const
##### 解构赋值、展开运算符
##### map、set、weakMap、weakSet
##### defineProperty proxy reflect
##### ESModule的import export
##### es5中类的使用 用ES5模拟ES6的类
#####  es6的基本使用

### 今日任务
##### 类的继承(原型链) (装饰器)
##### 数组reduce方法 实现compose redux
##### 实现模板引擎  面试
##### 箭头函数
#### new的原理  尝试实现reduce



#### 常见数据结果  Symbol的11种原编程方法
#### Reflect用法
#### call bind apply

#### node基础  事件环commonjs

#### vue全家桶 (三周)
#### node 讲完  +webpack+react

#### node核心  模块  npm buffer （arrayBuffer）

#### 文件操作  流  文件夹的操作  http模块

##### koa用法和原理  (cookie session jwt) express

#####  node进程  集群  pm2 mongo +redis


