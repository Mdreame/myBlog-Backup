---
title: Express实践之LocalLibrary项目(MDN)
date: 2020-09-23 8:56:12
categories: 编程
tags: 
- Express
- Nodejs
---

LocalLibrary项目使用Express来处理Http请求和路由，对MongoDB数据库进行一些基本的增删改查操作。

<!--more-->

<!-- TOC -->

- [工作环境配置](#工作环境配置)
    - [初始化图书馆项目](#初始化图书馆项目)
    - [使用nodemon自动重启](#使用nodemon自动重启)

<!-- /TOC -->

# 工作环境配置
## 初始化图书馆项目
安装好express和express引用生成器后，选择pug模板引擎，生成应用框架：
```
express --view=pug
```
安装依赖项（install 命令将获取项目的 package.json 文件中列出的所有依赖项包）。
```
npm install
```
运行应用：
```
DEBUG=express-locallibrary-tutorial:* npm start
```

## 使用nodemon自动重启
[nodemon](https://github.com/remy/nodemon) 是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于node.js的应用程序。
```
npm install --save-dev nodemon
```
如果没有全局安装该工具，就无法从命令行启动它（除非我们将其添加到路径中），但是可以在 NPM 脚本中调用它，因为 NPM 掌握所有已安装包的信息。找到 package.json 的 scripts 部分。在 "start" 一行的末尾添加逗号，并在新的一行中添加 "devstart"，如下所示：
```
 "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
```
生成的文件目录如下：
```
/express-locallibrary-tutorial
    app.js
    /bin
        www
    package.json
    /node_modules
        [约 4,500 个子文件夹和文件]
    /public
        /images
        /javascripts
        /stylesheets
            style.css
    /routes
        index.js
        users.js
    /views
        error.pug
        index.pug
        layout.pug
```

遇到问题：

在用moment.js插件转换日期格式时，发现读取到的日期全部一样。，如下图

![authorlist](/images/authorlist.png)

代码如下：

```javascript
// 虚拟属性'lifespan'：作者寿命
AuthorSchema
  .virtual('lifespan_formatted')
  .get(function () {
    if (this.date_of_birth) {
      return this.date_of_death ?
      moment(this.date_of_birth.getYear()).format('YYYY-MM-DD').toString() + '-' + moment(this.date_of_death.getYear()).format('YYYY-MM-DD').toString() : 
      moment(this.date_of_birth.getYear()).format('YYYY-MM-DD'); 
    }else {
      return this.date_of_death ? 
      moment(this.date_of_death.getYear()).format('YYYY-MM-DD') :
      '-';
    }
  });
```

暂时不知道哪里错了，修改如下：

```javascript
AuthorSchema
  .virtual('lifespan_formatted')
  .get(function () {
    let birthDate = this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
    let deadDate = this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
    return birthDate + ' ~ ' + deadDate;
  });
```

