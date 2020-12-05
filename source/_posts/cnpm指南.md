---
title: cnpm指南
date: 2020-09-15 14:30:39
categories: 编程
tags: 
- cnpm
- npm
---

使用淘宝npm镜像
<!--More-->

# 安装cnpm
通过npm安装：
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
安装完成后运行cnpm -v，出现问题：
```
cnpm : 无法加载文件 C:\Program Files\nodejs\cnpm.ps1，因为在此系统上禁止运行脚本。有关详细信息， 
请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ cnpm -v
+ ~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
解决方法参考：[cnpm : 无法加载文件 ...\npm\cnpm.ps1，因为在此系统上禁止运行脚本](https://blog.csdn.net/yuxielea/article/details/103080547)
之后再运行就可以了。
```
cnpm@6.1.1 (D:\nvm\v14.0.0\node_modules\cnpm\lib\parse_argv.js)
npm@6.14.8 (D:\nvm\v14.0.0\node_modules\cnpm\node_modules\npm\lib\npm.js)
node@14.0.0 (C:\Program Files\nodejs\node.exe)
npminstall@3.27.0 (D:\nvm\v14.0.0\node_modules\cnpm\node_modules\npminstall\lib\index.js)        
prefix=C:\Program Files\nodejs
win32 x64 10.0.19041
registry=https://r.npm.taobao.org
```
