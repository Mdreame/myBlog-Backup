---
title: 记hexo搭建博客以及途中遇到的问题
date: 2020-09-12 14:30:39
categories: 编程
tags: 
- Hexo
- 博客
---

搭建Hexo博客并部署到github和gitee平台。
<!--More-->

<!-- TOC -->

- [本地环境配置](#本地环境配置)
    - [发布文章](#发布文章)
- [Github仓库配置](#github仓库配置)
- [Gitee码云的配置](#gitee码云的配置)
    - [如何添加图片](#如何添加图片)
    - [如何生成图片相对链接](#如何生成图片相对链接)

<!-- /TOC -->

# 本地环境配置
默认已安装好node和git，然后安装hexo-cli。
```
cnpm install -g hexo-cli 
```
安装完成后，初始化博客项目。可以指定安装路径，运行命令后hexo会克隆一个博客项目到指定路径，并安装好相关依赖。

```
hexo init
```
## 发布文章
通过指令可以直接生成markdown文件，接着就可以编辑了。
```
hexo n "我的第一篇文章"  //hexo new title
```
编辑完成后需要将文章添加到框架中去。

```
hexo g  //hexo genarate
```
完成后就可以预览了，通过终端运行以下命令，在浏览器打开<u>http://localhost:4000</u> 预览。
```
hexo s  //hexo server
```
# Github仓库配置
首先在博客根目录下初始化Github仓库,然后添加远程库的地址。
```
git init
git remote add origin [url]
```
接着添加一个hexo-deployer-git库，目的是将生成好的代码部署到Github的某个具体分支上。
```
cnpm add hexo-deployer-git
```
然后打开根目录下的_config.yml配置文件，找到最下方远程库的配置。其中repo填的是库的地址。注意在冒号后必须有空格。
```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy: 
  type: 'git'
  repo: https://gitee.com/mdreame/mdreame.git
  branch: master
```
配置完成后，重新生成，在本地预览一下，确认没有问题就可以提交到Github上去。运行以下命令，Github会自动帮我们完成部署。
```
hexo d  //hexo deploy
```
# Gitee码云的配置
与Github原理基本类似，只不过代码提交到仓库后，需要自行更新Gitee pages部署。
![完成效果](images/blogview.png)

## 如何添加图片
根据Hexo官方文档，建议将图片放到source文件夹下，这样编译的时候会直接拷贝到public文件夹，也就是博客的根目录下。
如上面的示意图在md文件中添加的图片路径如下：

```
![完成效果](images/blogview.png)
```
## 如何生成图片相对链接
有两种方法：
1. 将所有图片都放在根目录下，如`images`文件夹，然后指定路径为`images/example.jpg`。
2. 为每篇文章创建一个文件夹，将相关资源放入其中，再引用，如`example.jpg`。

参考官方文档：[Embedding an image using markdown](https://hexo.io/zh-cn/docs/asset-folders.html#Embedding-an-image-using-markdown)