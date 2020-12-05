---
title: Express入门
date: 2020-09-25 8:56:12
categories: 编程
tags: 
- Express
- Nodejs
- 框架
---

介绍Express的基本概念，原理和简单的操作。
<!--more-->

<!-- TOC -->

- [Express是什么？](#express是什么)
    - [Express中间件](#express中间件)
    - [动态渲染](#动态渲染)
- [Express框架示例代码](#express框架示例代码)
    - [使用Node创建服务器](#使用node创建服务器)
    - [Express框架的服务器](#express框架的服务器)
- [安装 Express 应用生成器](#安装-express-应用生成器)

<!-- /TOC -->


这篇文章主要介绍Express是什么、为什么这么流行。记录常用的一些操作以及具体如何与Node和MongoDB配合使用。

# Express是什么？

Express 是一个简洁而灵活的 node.js Web应用框架，可以帮助开发者快速创建Web应用和搭建网站。

Express框架的主要特点是：

- 可以设置**中间件**来相应**HTTP请求**。
- 设置**路由**来响应HTTP请求。
- 可以通过**模板**来传递参数**动态渲染**HTML页面。

## Express中间件

> 中间件的本质就是一个函数，在收到请求和返回相应的过程中做一些我们想做的事情。

Express文档描述其作用为：

- 执行任何代码
- 修改请求和响应对象
-  终结请求-响应循环。
-  调用堆栈中的下一个中间件

按照作用可以分为五类：

- 应用级中间件
- 路由级中间件 
- 错误处理中间件 
- 内置中间件 
- 第三方中间件

## 动态渲染



# Express框架示例代码

## 使用Node创建服务器
```javascript
// 加载 HTTP 模块
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {

  // 用 HTTP 状态码和内容类型（Content-Type）设置 HTTP 响应头
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // 发送响应体
  res.end('Hello World\n');
});

// 监听 3000 端口的请求，注册一个回调函数记录监听开始
server.listen(port, hostname, () => {
  console.log(`服务器运行于 http://${hostname}:${port}/`);
});
```
上面代码的关键是http模块的createServer方法，表示生成一个HTTP服务器实例。该方法接受一个回调函数，该回调函数的参数，分别为代表HTTP请求和HTTP回应的request对象和response对象。参考：[Express框架](https://javascript.ruanyifeng.com/nodejs/express.html#toc0)
Express框架的核心是对http模块的再包装。
## Express框架的服务器
新建app.js文件，其中代码内容如下：

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('监听3000端口...')；
})
```

由上可见Express也是一个模块，导入后初始化创建了一个app，通过它可以进行进行路由 HTTP 请求、配置中间件、渲染 HTML 视图、注册模板引擎以及修改 应用程序设置 等操作，从而控制应用的行为。

# 安装 Express 应用生成器
Express 应用生成器工具可以生成一个 Express 应用的“框架”。全局安装：
```
npm install express-generator -g
```
生成一个名为“helloworld”的应用：
```
express helloworld --view=pug
```
上面的命令会在当前文件夹下生成一个 `helloworld` 文件夹（也可以先创建文件夹，再直接 `express` 生成），指定应用使用pug模板视图，其内容结构如下：
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```
在命令中运行，`DEBUG` 命令可以展示应用运行时返回的有用的日志信息:
```
ser DEBUG=myapp*
npm start
```
打开默认 `http://localhost:3000/` 就可以访问，并且命令行会输出日志信息。

# 常用API

## Application

应用主体API接口，通过app调用。

### app.get

```javascript
app.get('/', ()=>{});
```

第一个参数接收一个路径path，可用于响应get请求。

### app.listen

```javascript
app.listen(port);
```

监听端口

### app.use([path], function)

``` javascript
app.use('/', (req, res) => {
	res.send('hello');
});
```

使用中间件 function,可选参数path默认为"/"。

读取静态文件

```javascript
app.use(express.static(__dirname + '/public'));
```

通过express.static中间件从/public文件夹读取资源。

使用 app.use() “定义的”中间件的顺序非常重要，它们将会顺序执行，use的先后顺序决定了中间件的优先级。 比如说通常 express.logger() 是最先使用的一个组件，纪录每一个请求。

```javascript
app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res){
  res.send('Hello');
});
```

## Request

### req.params

这是一个数组对象，命名过的参数会以键值对的形式存放。 比如你有一个路由`/user/:name`, "name"属性会存放在`req.params.name`. 这个对象默认为 `{}`。

``` javascript
app.get('/about/:id/user/:name', (req, res) => {
    console.dir(req.params);
    res.send(`user ${req.params.id} called ${req.params.name}`);
});

//get /about/2/user/bill
//=> user 2 called bill
```

其中`console.dir()`可以输出对象的属性和方法。

当使用正则表达式定义路由的时候，`req.params[N]`会是这个应用这个正则后的捕获分组, `N` 是代表的是第N个捕获分组。这个规则同样适用于全匹配的路由，如:

```javascript
app.get('/file/(*)/(*)/', (req, res) => {
    res.send(req.params[1]);
});

// GET /file/javascripts/jquery.js
req.params[1]
// => "jquery.js"
```

### req.query

这是一个解析过的请求参数对象，默认为`{}` ，解析问号后的内容。

```javascript
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
```

### req.body

这个对应的是解析过的请求体。这个特性是`bodyParser()` 中间件提供,其它的请求体解析中间件可以放在这个中间件之后。当`bodyParser()`中间件使用后，这个对象默认为 `{}`。

```javascript
// POST user[name]=tobi&user[email]=tobi@learnboost.com
req.body.user.name
// => "tobi"
```

### req.files

这是上传的文件的对象。这个特性是`bodyParser()` 中间件提供,其它的请求体解析中间件可以放在这个中间件之后。当`bodyParser()`中间件使用后，这个对象默认为 `{}`。