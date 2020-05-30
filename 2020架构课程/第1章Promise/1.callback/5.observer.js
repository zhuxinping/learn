// 观察者模式  观察者和被观察者是有关联的  观察者需要将攒积放到被观察者之上，当被观察者 状态发生变化，需要通知所有的观察者

//我家有个小宝宝  我要监控 我家小宝宝的状态

// 观察者  我
// 被观察者 小宝宝
// 开心 -> 不开心   把我放在小宝宝上   当小宝宝状态变化了 就通知我


class Subject{// 被观察者
    constructor(name){
        this.name = name
        this.state ='开心'
        this.observers = []
    }
    attach(o){ //需要将注册者放到自己身上
        this.observers.push(o);
    }
    setState(state){
        this.state = state; //更新被观察者
        this.observers.forEach(o=>{
            o.update(this);
        })
    }
}


class Observer{// 观察者
    constructor(name){
        this.name = name
    }
    update(s){ //等会被观察者的状态发生变化会调用这个方法
            console.log(this.name+":"+s.name+s.state)
    }
}

let baby = new Subject('小宝宝');

let parent = new Observer('爸爸');

let mother = new Observer('麻麻');
baby.attach(parent);
baby.attach(mother);
baby.setState('不开心')