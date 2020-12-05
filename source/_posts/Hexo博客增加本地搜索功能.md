---
title: Hexo博客增加本地搜索功能
date: 2020-09-17 23:34:12
categories: 编程
tags:
- Hexo
- 博客
- Jquery
- CSS
---
为博客添加本地搜索功能，将Dom操作和CSS定位的一些问题。
<!--More-->

<!-- TOC -->

- [新增功能](#新增功能)
    - [添加本地搜索](#添加本地搜索)
    - [禁止蒙层底部页面跟随滚动](#禁止蒙层底部页面跟随滚动)
- [遇到问题](#遇到问题)
    - [链接跳转](#链接跳转)
    - [init对象](#init对象)
    - [Jquery加载动态内容](#jquery加载动态内容)
    - [Jquery与JS混用](#jquery与js混用)
    - [blur和click事件冲突](#blur和click事件冲突)
    - [CSS文本溢出省略](#css文本溢出省略)
    - [jQuery中this与$(this)的区别](#jquery中this与this的区别)
    - [jQuery中的.html(),.text()和.val()的区别](#jquery中的htmltext和val的区别)
    - [页面渲染抖动](#页面渲染抖动)
        - [默认字体大小不为16px](#默认字体大小不为16px)
        - [滚动条](#滚动条)
            - [隐藏滚动条](#隐藏滚动条)
            - [监测滚动条失效](#监测滚动条失效)
    - [fixed定位在ios下失效](#fixed定位在ios下失效)

<!-- /TOC -->

# 新增功能
## 添加本地搜索

参考：[hackfun](https://hackfun.org/)

## 禁止蒙层底部页面跟随滚动

参考：[禁止蒙层底部页面跟随滚动](https://juejin.im/post/6844903519636422664)
<!--Read More-->
# 遇到问题
## 链接跳转
获取到每篇文章的相对连接之后，点击a链接会自动加上当前页面的路径。
解决方法：将a链接改为其他标签，在js用通过点击事件调用window.open来打开当前路径。
## init对象

参考：[What the instance init in Google Chrome console mean and how I can access it?](https://stackoverflow.com/questions/55416209/what-the-instance-init-in-google-chrome-console-mean-and-how-i-can-access-it)

## Jquery加载动态内容
点击搜索结果，页面无响应。这种情况是因为，Jquery绑定的事件只能获取在load完成时已有的内容，而无法获取动态更新的内容。
可能有两种代码会出现此种情况：
```
$('##id').click( function() {
    alert('事件无相应');
})

$('##id').on('click' , function() {
    alert('事件无相应');
})
```
这两种情况都无法弹窗，只有改成事件委派：
```
$('body').on('click' , '##id' , function() {
    alert('事件相应');
})
```
## Jquery与JS混用

jq清除input的内容：

```javascript
$('##search-input').val('');
```

下列方法无效：

```javascript
$(Selector).value = '';
```

## blur和click事件冲突
搜索框失焦时无法点击关闭按钮。有两种方式可以解决，一种是给blur设延时，不过可能会出现bug而且要求内容不相互影响。另一种方式就是添加和移除事件。
使用Jquery的on()和off()来添加和移除监听:
```
//解决冲突blur和click冲突；关闭搜索窗口
  $(".reset-button")
  .on('click',closeInput)
  .on('mouseover',() => {
    $searchInput.off('blur',cancleInput);
  }).on('mouseout',() => {
    $searchInput.on('blur',cancleInput);
  })
```
参考：[解决blur与click事件的冲突](https://github.com/frontend9/fe9-library/issues/107)

## CSS文本溢出省略
单行文字实现：
```
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```
参考：[CSS多行文本溢出省略显示](https://juejin.im/entry/6844903461209767944)

## jQuery中this与$(this)的区别

参考：[jQuery中this与$(this)的区别总结](https://www.cnblogs.com/gfl123/p/8080484.html)

## jQuery中的.html(),.text()和.val()的区别

参考：[jQuery学习笔记—— .html(),.text()和.val()的使用](https://www.w3cplus.com/blog/134.html)

## 页面渲染抖动
### 默认字体大小不为16px
修改了默认字体大小之后，浏览器会以默认大小排版，再根据样式渲染，可能会发生页面抖动，盒子偏移的情况。

总结：
- em是根据当前元素的px值来计算，会受到继承的影响，除非显式指定当前元素px值。
- rem是根据html根元素来计算，除非用户改变浏览器设置和显式设置当前元素的px值。

参考：[综合指南: 何时使用 Em 与 Rem](https://webdesign.tutsplus.com/zh-hans/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984)
### 滚动条
#### 隐藏滚动条
若容器内容可以滚动，其宽度为100%的情况下，滚动条可能导致偏移。

参考：
- [一个页面有两个滚动条 如何隐藏其中一个](https://segmentfault.com/q/1010000010575519)
- [使用CSS隐藏元素滚动条](https://segmentfault.com/a/1190000019710081)
#### 监测滚动条失效
在html和body的高度为100%的情况下，可以使用body来监测。
参考：
- [$(window).scroll() 无法触发滚动条事件](https://www.seasidecrab.com/Web/746.html)
## fixed定位在ios下失效
好像更新到ios14自动修复了😀。