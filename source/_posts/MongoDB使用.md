---
title: MongoDB使用
date: 2020-09-24 8:56:12
categories: 编程
tags: 
- MongoDB
- 数据库
---

如何安装和启动MongoDB服务。
<!--more-->
<!-- TOC -->

- [Windows安装](#windows安装)
- [启动Mongodb服务](#启动mongodb服务)
    - [创建数据库目录](#创建数据库目录)
    - [启动MongoDB服务](#启动mongodb服务)
        - [命令行模式](#命令行模式)
        - [将MongoDB服务器作为Windows服务运行](#将mongodb服务器作为windows服务运行)
    - [mongodb常用启动参数](#mongodb常用启动参数)
        - [注意 mongod 和 mongo 的区别](#注意-mongod-和-mongo-的区别)

<!-- /TOC -->

# Windows安装

首先进入官网[下载](https://www.mongodb.com/try/download/community)安装文件。

![](/images/downloadmongodb1.png)

可以自定义安装路径和选择是否安装MongoDB Compass 。MongoDB Compass 是一个图形界面管理工具，可以稍后再[下载](https://www.mongodb.com/try/download/compass)安装。

# 启动Mongodb服务

我们可以通过`安装目录/bin`下的`mongod.exe`启动mongodb服务器。

## 创建数据库目录

新建一个文件夹用来存放数据库，如官网文档推荐配置：

```te
data/
	conf	-->配置文件目录
		mongod.conf		-->配置文件
	db		-->数据库目录
	log		-->日志文件目录
		mongodb.log		-->日志记录文件
```

## 启动MongoDB服务

有两种方式来启动mongodb服务：

- 命令行模式：需要打开多个命令行窗口，且运行服务的窗口不能再操作。
- 将MongoDB服务器作为Windows服务运行

### 命令行模式
进入`bin`目录中执行`mongod.exe`文件。
```
D:\mongodb\bin\mongod --dbpath E:\mongodata\db
```
执行成功则输出如下信息：
```
{"t":{"$date":"2020-09-25T09:23:57.756+08:00"},"s":"I",  "c":"CONTROL",  "id":23285,   "ctx":"main","msg":"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"}
{"t":{"$date":"2020-09-25T09:23:57.760+08:00"},"s":"W",  "c":"ASIO",     "id":22601,   "ctx":"main","msg":"No TransportLayer configured during NetworkInterface startup"}
{"t":{"$date":"2020-09-25T09:23:57.760+08:00"},"s":"I",  "c":"NETWORK",  "id":4648602, "ctx":"main","msg":"Implicit TCP FastOpen in use."}
...
{"t":{"$date":"2020-09-25T09:24:01.456+08:00"},"s":"I",  "c":"NETWORK",  "id":23016,   "ctx":"listener","msg":"Waiting for connections","attr":{"port":27017,"ssl":"off"
```
另打开一个命令行窗口运行mongo.exe即可连接上Mongodb
```
D:\mongodb\bin\mongo.exe
```
### 将MongoDB服务器作为Windows服务运行

创建配置文件目录和记录日志目录以及对应的文件：

```shell
mkdir e:\mongodata\conf
E:\mongodata\conf\>type nul>mongod.conf
mkdir e:\mongodata\log
E:\mongodata\log\>type nul>mongodb.log
```

进入配置文件目录，如`E:\mongodata\conf`,找到`mongo.cfg`配置文件，在其中填入以下内容：
```
systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db
```

然后通过mongod.exe，使用`--install`选项来安装服务，使用`--config`选项来指定之前创建的配置文件。

```
D:\mongodb\bin\mongod.exe --config "E:\mongodata\conf\mongod.conf" --install
```

启动MongoDB服务：

```
net start MongoDB
```

运行成功会有提示：

```
C:\Windows\system32>net start MongoDB
MongoDB Server (MongoDB) 服务正在启动 ..
MongoDB Server (MongoDB) 服务已经启动成功。
```

关闭MongoDB：

```
net stop MongoDB
```

移除MongoDB：

```
D:\mongodb\bin\mongod.exe --remove
```

## mongodb常用启动参数

`mongod.exe`常用参数如下:

| 参数                 | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| --bind_ip            | 绑定服务IP，若绑定127.0.0.1，则只能本机访问，不指定默认本地所有IP |
| --logpath            | 定MongoDB日志文件，注意是指定文件不是目录                    |
| --logappend          | 使用追加的方式写日志                                         |
| --dbpath             | 指定数据库路径                                               |
| --port               | 指定服务端口号，默认端口27017                                |
| --serviceName        | 指定服务名称                                                 |
| --serviceDisplayName | 指定服务名称，有多个mongodb服务时执行。                      |
| --install            | 指定作为一个Windows服务安装。                                |

### 注意 mongod 和 mongo 的区别

mongod是MongoDB系统的主要进程，你可以理解为部署MongoDB服务器，它可以处理数据请求，管理数据存储和执行后台管理操作。mongo是用于链接mongod实例的命令行工具。当我们没有带参数运行mongo命令它将使用默认的端口号和localhost连接

参考：[MongoDB的安装，mongod和mongo的区别](https://www.cnblogs.com/nangezi/p/11279401.html)