---
title: ES新特性
date: 2020-10-01 14:18:27
categories: 编程
tags:
- JavaScript
---

## 1.Default Parameters（默认参数）

JavaScript定义默认参数的方式和新特性的对比如下：

```javascript
// var result = function (width, height) {
//     var height =  height || 20;
//     return width * height;
// }

var result = (width, height=20) => {
    return width*height;
};

console.log(result(10));
```

ES6中可以直接把默认值放在函数声明里。

## 2.Template Literals（模板文本）

```javascript
// var result = function (width, height) {
//     return 'the square: width is ' + width + ', height is ' + height + ', size is ' + width*height;
// }

var result = (width, height=20) => {
    return `the square: width is ${width} ,height is ${height}, size is ${width*height}`;
};

console.log(result(10,20));
```

可以使用模板和插入值输出包含变量的字符串。

## 3.Multi-line Strings（多行字符串）

```javascript
var huanXiSha = '自在飞花轻似梦，\n'    
    + '无边丝雨细如愁，\n'
    + '宝帘闲挂小银钩。\n'


// var huanXiSha = `    自在飞花轻似梦，
//     无边丝雨细如愁，
//     宝帘闲挂小银钩。`

console.log(huanXiSha);
```

## 4.Destructuring Assignment（解构赋值）

```javascript
var A = {
    name: 'bill',
    age: 10
};

// var name, age;

// name = A.name;
// age = A.age;

var {name, age} = A;

console.log({name,age});
```

数组也类似：

```javascript
var B = [1,2];
var [a,b] = B;

console.log([a,b]);
```

## 5.Enhanced Object Literals（增强的对象文本）

### 1.函数类属性的省略语法

用法：`{ method() {…} }`

```javascript
const obj = {
    // Before
    foo: function() {
        return 'foo'
    },

    // After
    bar() {
        return 'bar'
    }
}
```

### 2.支持 proto 注入

开发者允许直接向一个对象字面量注入 *proto*，使其**直接成为指定类的一个实例**，而无须另外创建一个类来实现继承。

```javascript
import { EventEmitter } from 'events'

const machine = {
    __proto__: new EventEmitter(),

    method() {
        /* …*/
    }
    // …
}

console.log(machine) //EventEmitter {}
console.log(machine instanceof EventEmitter) //true

machine.on('event', msg => console.log(`Received message: ${msg}`))
machine.emit('event', 'hello world')
// Received message: hello world

machine.method(/* …. */)
```

### 3.动态的计算属性名

ES6 引入的新语法允许我们直接使用一个表达式来表达一个属性名用法：`{ [statement]: value }`

```javascript
const prefix = 'ES6'

const obj = {
    [prefix + 'enhancedObject']: 'foo'
}
```

### 4.将属性名定义省略

有时候我们需要将一些已经被定义的变量(或常量)作为其他对象字面量的属性值进行返回或传入操作，而大多数情况下这些变量名和属性名都是相同的，我们可以对属性名定义进行省略。

```javascript
const foo = 123
const bar = () => foo

const obj = {
    foo,
    bar
}

console.log(obj) //{ foo: 123, bar: [Function] }
```

## 6.箭头函数

箭头函数可以与变量解构结合使用。

```javascript
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
```

参考：[阮一峰ES6入门](https://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

## 7.Promise

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

## 8.Let命令

`for`循环设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
```

使用let可以避免变量提升的情况。

## 9.Modules（模块）

ES5中的模块和调用：

```javascript
//demo.js
module.exports = {
    name: 20,
    sayHi: function() {
        console.log(`hi ${this.name}`);
    }
}
//main.js
var demo = require('./demo.js');

console.log(demo.name);
demo.sayHi();
//20
//hi 20
```

ES6中的模块和调用：

```javascript
//demo.js

export var name = 20;
export sayHi = function() {
        console.log(`hi ${this.name}`);
    }

//main.js
import {name, sayHi} from './demo'

console.log(demo.name);
demo.sayHi();
```

node中和浏览器中遵循的分别是Commonjs和ES6标准，node不支持使用import后直接在本地运行。