---
title: 使用nvm安装管理node和npm
date: 2020-09-15 14:30:39
categories: 编程
tags: 
- nvm
- node
- npm
---

学习如何用nvm管理npm
<!--More-->

<!-- TOC -->

- [安装nvm](#安装nvm)
    - [下载nvm](#下载nvm)
    - [添加环境变量](#添加环境变量)
- [安装node和npm](#安装node和npm)
    - [注意](#注意)

<!-- /TOC -->

# 安装nvm
## 下载nvm
以Windows为例，进入nvm的[Github下载页](https://github.com/coreybutler/nvm-windows/releases),选择一个版本下载，完成后安装，使用默认设置。
## 添加环境变量
`Win+R`打开运行窗口，输入`sysdm.cpl`，然后在出现的窗口选择“高级”-“环境变量”。
![环境变量窗口](images/sysdm1.png)
在系统变量中添加变量和值,如下图。
![添加变量](images/nvmsysdm2.png)
然后将两个变量添加到路径Path中，如下。
![path路径](images/nvmsysdm3.png)
以上就完成了nvm的安装。
打开命令行，运行一下nvm。
```
nvm
```
出现以下字符说明安装成功。
```

Running version 1.1.7.

Usage:

  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm install <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.
                                 Optionally specify whether to install the 32 or 64 bit version (defaults to system arch).
                                 Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm version                  : Displays the current running version of nvm for Windows. Aliased as v.

```

# 安装node和npm
查看可安装的版本：
```
nvm list available
```
在出现的版本中选择一个安装，这里以14.0.0为例：
```
nvm install 14.0.0
```
查看已安装的版本：
```
nvm ls
```
安装完成后指定用哪个版本：
```
nvm use 14.0.0
```
然后可以查看node是否安装成功：
```
$ node -v
v14.0.0
```
## 注意
如果在node下载过程中有中断可能会导致包损坏，而无法运行。
比如安装完成后查看node版本，显示错误：
```
node.exe不是有效的32位应用程序
```
如果环境变量没有配置正确可能会提示：
```
'node' 不是内部或外部命令，也不是可运行的程序的解决方法
```