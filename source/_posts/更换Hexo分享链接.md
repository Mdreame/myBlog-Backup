---
title: 更换Hexo分享链接
date: 2020-09-16 8:56:12
categories: 编程
tags: 
- Hexo
- 博客
---

将文章底部链接替换为国内平台地址。主要有关浏览器缓存和fontawesome字体的使用。
<!--More-->


<!-- TOC -->

- [替换链接](#替换链接)
- [遇到问题](#遇到问题)
    - [链接列表在Edge上不显示](#链接列表在edge上不显示)
    - [文章链接](#文章链接)

<!-- /TOC -->

# 替换链接
Landscape内置的链接是分享到国外网站的，需要改成国内社交平台。
首先找到生成分享链接的代码,在`source/js/script.js`中,可以找到:
```
var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
          '<a href="http://service.weibo.com/share/share.php?&title=' + encodedUrl + '" class="article-share-sina" target="_blank" title="微博"></a>',
          '<a href="http://share.renren.com/share/buttonshare.do?link=' + encodedUrl + '" class="article-share-renren" target="_blank" title="人人"></a>',
          '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '" class="article-share-qq" target="_blank" title="QQ 空间"></a>',
          '<a href="http://v.t.qq.com/share/share.php?url=' + encodedUrl + '" class="article-share-tencent" target="_blank" title="腾讯微博"></a>',
          '</div>',
        '</div>'
      ].join('');
```
然后将`<a>`标签中的链接和样式名称更改以下,如:
```
'<a href="http://service.weibo.com/share/share.php?&title=' + encodedUrl + '" class="article-share-sina" target="_blank" title="微博"></a>',
'<a href="http://share.renren.com/share/buttonshare.do?link=' + encodedUrl + '" class="article-share-renren" target="_blank" title="人人"></a>',
'<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '" class="article-share-qq" target="_blank" title="QQ 空间"></a>',
'<a href="http://v.t.qq.com/share/share.php?url=' + encodedUrl + '" class="article-share-tencent" target="_blank" title="腾讯微博"></a>',
```
然后更换链接对应的图标,内置的`Fontawesome`字体可能版本低,没有新增图标,可以到[Fontawesome](https://fontawesome.dashgame.com/)下载最新版本。下载的文件是以版本号命名的，先记住版本号。
然后找到主题文件夹下`source/css/_variables.styl`,将记下的`Fontawesome`版本号替换。之前是：
```
font-icon-version = "4.0.3"
```
替换成：
```
font-icon-version = "4.7.0"
```
接着找到`source/css/_partial/article.styl`文件，修改链接的样式。
将`.article-share-...`开头的四个文件修改成：
```
.article-share-sina
  @extend $article-share-link
  &:before
    content: "\f18a"
  &:hover
    background: color-sina
    text-shadow: 0 1px darken(color-sina, 20%)

.article-share-qq
  @extend $article-share-link
  &:before
    content: "\f1d6"
  &:hover
    background: color-qq
    text-shadow: 0 1px darken(color-qq, 20%)

.article-share-renren
  @extend $article-share-link
  &:before
    content: "\f18b"
  &:hover
    background: color-renren
    text-shadow: 0 1px darken(color-renren, 20%)

.article-share-tencent
  @extend $article-share-link
  &:before
    content: "\f1d5"
  &:hover
    background: color-tencent
    text-shadow: 0 1px darken(color-tencent, 20%)
```
就是替换了新增链接的`Fontawesome`的字体代码和背景颜色。接着在`source/css/_variables.styl`中的`Colors`部分修改背景色：
```
color-sina = #ea0020
color-qq = #518adb
color-renren = #406ccb
color-tencent = #33b5eb
```
完成效果：
![完成效果](images/chromelink.png)

# 遇到问题
## 链接列表在Edge上不显示
在Edge和Chrome下预览分享链接，显示不同。
![Edge下显示](images/linknotwork.png)
![Chrome](images/chromelink.png)

考虑到之前遇到的缓存问题，我将代码部署到Github上，然后分别清空了手机和电脑浏览器的缓存数据，在Safari,Chrome下显示均正常，就是电脑端的Edge有问题。

## 文章链接
如上图Edge显示没有读取链接，查了设置，发现这个链接就是博客的路径，在博客而非主题的配置文件`_comfig.yml`中找到`url`和`root`，分别设置成：
```
url: https://mdreame.github.io  #部署的站点
root: /                         #根目录
```
仓库没有二级目录，即`index.html`不是反而二级目录而是在根目录下，`root`就不用填。


---
参考：
- [Hexo 主题 Landscape 改造小记](https://blanboom.org/2015/hack-hexo-theme-landscape/)