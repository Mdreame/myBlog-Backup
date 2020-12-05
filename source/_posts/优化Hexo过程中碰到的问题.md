---
title: 优化Hexo过程中碰到的问题
date: 2020-09-15 22:37:17
categories: 编程
tags: 
- 博客
- Hexo
- Jquery
---

CSS布局和事件处理。

<!--More-->
<!-- TOC -->

- [css布局问题](#css布局问题)
    - [高度自适应和文字居中](#高度自适应和文字居中)
- [事件冲突](#事件冲突)
- [缓存问题](#缓存问题)
- [Jquery链接失效](#jquery链接失效)

<!-- /TOC -->

今天将博客侧栏优化了一下，完成效果如下。
![](/images/myblog.gif)

# css布局问题


## 高度自适应和文字居中
把遇到的问题简化一下就是，要求在父元高度固定情况下，要求子元素填充，且每个子元素宽度相同,其中文字垂直居中。
HTML为：
```
<div>
<a>我要占一半空间，且垂直居中</a>
<a>我要占一半空间，且垂直居中</a>
</div>
```
CSS代码如下：
```
div{
    position: absolute;
    height: 20%;    /*相对于窗口*/
}
a{
    height: 50%;    /*相对于div*/
    display: flex;
    align-items: center;
}
```

# 事件冲突
优化完的代码，在chrome上做移动端调试，发现点击导航栏正常收缩和展开，而`push`到码云上通过移动端测试就不行。原以为是网上说的Jquery在IOS上有bug，就拿安卓来测试，发现点击收缩按钮也没反应。
最后发现是`click`事件冲突的问题,参考[如何解决 touchstart 事件与 click 事件的冲突](https://juejin.im/post/6844903571092144136)
修改完的代码如下：
```
const toggleBtn = document.getElementById("main-nav-toggle");

const clickEvent = (function(){
    if ('ontouchstart' in document.documentElement === true) 
      return 'touchstart';
    else
      return 'click';
})();
 
toggleBtn.addEventListener(clickEvent,e => {
   e.preventDefault();

   if (isMobileNavAnim) return;
   startMobileNavAnim();
   $container.toggleClass('mobile-nav-on');
   stopMobileNavAnim();
  })
```
虽然Jquery和原生杂糅，但也暂时解决了问题，而且证明与Jquery无关。


# 缓存问题
修复相关问题后提交到`Gitee`上，用`chrome`查看发现仍然不能正常显示，重复几次，运行的结果显示的`Gitee`代码版本甚至回滚了。
然后分别用ipad、iphone、andoriod测试，各有各的毛病，最后发现是浏览器缓存的问题。清空网页缓存再重新加载页面就解决了。

# Jquery链接失效
因为没有清理浏览器缓存，所以之前下载的jq文件还被引用，所以电脑上和手机上出现点击失灵问题，换了一个CDN引用解决。
```
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.min.js"></script>
```
