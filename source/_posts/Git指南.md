---
title: Git指南
date: 2020-09-16 00:34:12
categories: 编程
tags:
- Git
- Github
---

提升Git使用体验的一些技巧，记录常见问题。
<!--More-->

<!-- TOC -->

- [Git加速](#git加速)
- [常遇到的一些问题](#常遇到的一些问题)
    - [fatal: refusing to merge unrelated histories](#fatal-refusing-to-merge-unrelated-histories)

<!-- /TOC -->

# Git加速
经常使用git操作，无论是`git clone`还是`git push`，时常遇到卡死的情况。于是找到一个靠谱的方法，参考知乎牛人的回答[git clone一个github上的仓库，太慢，经常连接失败，但是github官网流畅访问，为什么？](https://www.zhihu.com/question/27159393)。

具体操作就是使用github的镜像网站进行访问，<u>github.com.cnpmjs.org</u>，我们将原本的网站中的 <u>github.com</u> 进行替换。
例如：
```
git pull https://github.com.cnpmjs.org/Mdreame/mdreame.github.io.git master
```
其他操作类似即可。


# 常遇到的一些问题

## fatal: refusing to merge unrelated histories
这种情况可能会在`git pull`或者`git push`中都有可能会遇到，原因是两个分支没有取得关系。
解决方法就是在命令后加上`--allow-unrelated-histories`，例如：
```
git pull https://github.com.cnpmjs.org/Mdreame/mdreame.github.io.git master --allow-unrelated-histories
```