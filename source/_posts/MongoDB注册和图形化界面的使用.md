---
title: MongoDB注册和图形化界面的使用
date: 2020-09-22 20:56:12
categories: 编程
tags: 
- 数据库
- Nodejs
---


学习Express的过程中接触到了Mongdb，就试用Mlab，记录如何配置对接本地。

<!--more-->

<!-- TOC -->

- [创建数据库](#创建数据库)
- [查看和操作数据库](#查看和操作数据库)
- [MongoDB Compass图形化操作界面](#mongodb-compass图形化操作界面)

<!-- /TOC -->

# 创建数据库

mongodb的主页经过改版了，首先还是注册好账户，进入首页。如下图所示：

![](/images/mongodb1.png)
第一步就是要为刚刚创建的数据库添加用户，点击左侧边栏 `Database Access` ，然后点击添加用户按钮：
![](/images/mongodb2.png)
在弹出来的窗口内填写用户名和密码，即代码中将会请求的数据库的用户名和密码。其他保持默认设置不变。
![](/images/mongodb3.png)
接着点击左侧边栏 `Network Access` 添加许可访问的IP地址，也就是本机的地址。
![](/images/mongodb4.png)
之后返回主页，进入数据库详情页。
![](/images/mongodb5.png)
点击数据库导航栏的 `Command Line Tool` ,查看数据库地址。
![](/images/mongodb6.png)
将 `mongostat --uri` 字段后的内容复制下来，放到需要请求的代码中去。
![](/images/mongodb7.png)

例如：其中 `<username>` 和 `<password>` 需要替换成刚刚填的内容，接着就可以访问了。
```
const mongoose = require('mongodb+srv://<username>:<password>@locallibrary.uctjx.mongodb.net ');
```

如果请求不成功，可能会报错，检查代码和数据库地址是否有误。

```
MongoDB connection error: MongoNetworkError: failed to connect to server [locallibrary-shard-00-02.uctjx.mongodb.net:27017] on first connect  [MongoNetworkError: connection 5 to locallibrary-shard-00 -02.uctjx.mongodb.net:27017 closed
```

如上错误就可能是数据库配置不正确。

参考：

- [Mongodb: failed to connect to server on first connect](https://stackoverflow.com/questions/41318354/mongodb-failed-to-connect-to-server-on-first-connect)

# 查看和操作数据库

回到数据库的首页，点击Collections即可查看数据库内容以及进行查找操作。

![](/images/mongodb8.png)

# MongoDB Compass图形化操作界面

与网页操作大同小异，可以查看[官方文档](https://docs.mongodb.com/compass/master/connect/)。