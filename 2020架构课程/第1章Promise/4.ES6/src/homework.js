// 浏览器和node中解析的方式不一样  在浏览器中 await 后面跟一个promise,那就直接then
// 在node中虽然你放的是一个promise， 会再进行一次包装，node中await后面的结果会被再包装一次
async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async1 end')
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(()=>{
    console.log('setTimeout');
})

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
})