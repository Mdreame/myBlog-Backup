---
title: webpack教程
date: 2020-10-01 17:27:44
categories: 编程
tags:
- 工具
---

## Webpack是什么？

Webpack是一个开源的前端打包工具。当Webpack处理应用程序时，它会构建一个依赖关系图，其中包含应用程序所需要的各个模块，然后将所有这些模块打包成一个或多个模组。

Webpack可以通过终端或更改Webpack.config.js文件来设定各项功能。

## Webpack的优点

Webpack的优点如下：

- Webpack是以CommonJS的形式来书写脚本，对AMD/CMD的支持也很全面，方便旧项目进行代码迁移；

- 能被模块化的不仅仅是JavaScript，其他的静态资源同样也可以进行模块化；
- 开发便捷，能替代部分Grunt/Gulp的工作，如打包、压缩混淆、图片转Base64等；
- 扩展性强，插件机制完善，特别是支持React热插拔（react-hot-loader）的功能让人眼前一亮。