---
title: babel使用
date: 2020-10-01 16:55:29
categories: 编程
tags:
- 工具
---

## Bable是什么？

Babel是一个广泛使用的转码器，可以将ES 6代码转为ES 5代码，从而在现有浏览器环境下执行。因为大多数的浏览器(或者Nodejs)对JavaScript的版本支持并不是到最新的版本，为了向下兼容，需要将ES 6以上的代码进行转换。这意味着，我们可以现在就用ES 6编写程序，而不用担心现有环境是否支持。

## 安装Babel

```
npm install -g babel-cli
```

查看是否成功:

```
babel -v
```

## 使用

使用Babel首先需要配置`.babelrc`文件，该文件用来设置转码规则和插件，基本格式如下：

```
{
    "presets": [
        "es2015",
    ],
    "plugins": []
}
```

此处使用的是ES 2015作为转码规则，其是使用了ES 2015包，而ES2015其实就是ES 6。要使用某类转码器，需要在系统或项目程序中安装相应的包，比如此处用到的是ES 2015，则需要使用如下命令安装需要的包。

```
npm install --save-dev babel-preset-es2015
```

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（如`Object.assign`）都不会被转码。

如果开发者使用了ES 7中的代码，请在ES 7不同阶段语法提案的转码规则（共有4个阶段）中选择一个：

```
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-preset-stage-1
npm install --save-dev babel-preset-stage-2
npm install --save-dev babel-preset-stage-3
```

## 例子

### 1.文件目录

新建项目目录babel_test，并在此文件夹中建立3个相关的文件，分别是配置文件．babelrc、ES 6标准的index.js以及目标输出的符合ES 5的文件compiled.js。

### 2.测试内容

编辑index.js里的内容，这里的内容需要符合ES 6标准，最好还有显著的特征，使用如下代码：

```javascript
let people = ['jam', 'bob'];
let messages = people.map((value, index, list) => `people of ${index} element is ${value}`);
```

这里使用了4种不同的ES 6代码，分别是定义关键字let、循环方法内部的返回值、箭头函数“=>”、新的拼接字符串。

### 3.转换

```
babel index.js --out-file compiled.js
```

或者：

```
babel index.js
```

### 4.结果

打开`compiled.js`文件，可以看到转化后的代码:

```javascript
'use strict';

var people = ['jam', 'bob'];
var messages = people.map(function (value, index, list) {
  return 'people of ' + index + ' element is ' + value;
});
```

注意：

- vue结合webpack使用就自动转换了成兼容的ES 5了。