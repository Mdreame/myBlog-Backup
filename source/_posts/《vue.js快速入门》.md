---
title: 《vue.js快速入门》学习笔记
date: 2020-09-20 8:56:12
categories: 编程
tags: 
- Vue
- Webpack
- 框架
---


微信读书《vue.js快速入门》学习笔记记录。书中通过实例讲解如何使用webpack来使用vue构建发布应用。

<!--More-->

环境配置：

NPM: 6.14.8

Node: 6.9.1

Vue: 2.0+



全局安装Vue.js和Vue-cli

```javascript
cnpm install vue vue-cli -g
```

设置淘宝镜像

```
npm install-g cnpm --registry=https://registry.npm.taobao.org
```

通过`vue init webpack projectName`新建项目是和淘宝镜像没关系的，因为vue-cli 用的是 npm 源，所以只要设置 npm 源就行了，可以提升创建速度。


在定义v-for时检测到错误：

```javascript
<li v-for="item in items">
    {{item}}
</li>

Error: Elements in iteration expect to have 'v-bind:key'
```

原因是没有遵循规范，虽然可以显示出效果，修改方式如下：

```javascript

<li v-for="item in items" :key="item.id" >
    {{item}}
</li>
```

参考：

- [[Elements in iteration expect to have 'v-bind:key' directives]](https://stackoverflow.com/questions/47608379/vue-language-server-elements-in-iteration-expect-to-have-v-bindkey-directiv)