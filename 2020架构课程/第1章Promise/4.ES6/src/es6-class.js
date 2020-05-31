class Animal{
    constructor(){
        this.name = '熊猫'
    }
    static get a(){//属性访问器 静态属性
        console.log(this);//当前类
        return this.flag;
        // return 123;
    }
    static set a(newVal){
        this.flag = newVal;
    }
    get a(){//原型上的属性
        return 456;
    }
    // set a(newVal){

    // }
    say(){

    }
    eat(){

    }
}
Animal.flag = 'zzz';
console.log(Animal.a);
Animal.a = 'hello';
console.log(Animal.a);