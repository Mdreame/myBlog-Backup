(function($){
  //searchfunc
  var searchFunc = function (path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function (xmlResponse) {
            // get the contents from search data
            var datas = $("entry", xmlResponse).map(function () {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();

            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);

            $input.addEventListener('input', function () {
                var str = '<ul id=\"search-result-list\">';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }

                // perform local searching
                datas.forEach(function (data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var data_url = data.url;

                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if (data_title != '' && data_content != '') {
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
        
                            index_content = data_content.indexOf(keyword);
                        
                            if (index_title < 0 && index_content < 0) {
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><h1 href='"  + data_url + "' class='search-result-title' target='_blank'>" + "✔️ " + data_title + "</h1>";
                        var content = data.content.trim().replace(/<[^>]+>/g, "");
                        if (first_occur >= 0) {
                            // cut out characters
                            var start = first_occur - 6;
                            var end = first_occur + 6;
                            if (start < 0) {
                                start = 0;
                            }
                            if (start == 0) {
                                end = 10;
                            }
                            if (end > content.length) {
                                end = content.length;
                            }
                            var match_content = content.substr(start, end);
                            // highlight all keywords
                            keywords.forEach(function (keyword) {
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
                            })
                            str += "<p class=\"search-result\">" + match_content + "...</p>"
                        }
                    }
                })
                $resultContent.innerHTML = str;
            })
            //========
        }
    })
 }


  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;
  var $searchInput = $('.search-input');
  var $resultArea = $('#search-result');
  var $noResult = $(".no-result");
  // var hostName = "https://mdreame.gitee.io/";  //码云
  var hostName = "https://mdreame.github.io/"  //github

  //init
  $noResult.hide();
  $(".to-top-btn").hide();  

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };



  //点击搜索按钮，弹出搜索框，并获取焦点
  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    $resultArea.removeClass("toggleResult");
    $('body').addClass('fixbody');  //禁止背面移动
    stopSearchAnim(function(){
      $searchInput.focus();
    });
  });

  //监听输入，显示结果界面
  var inputing = () => {
    var path = '/search.xml';
    searchFunc(path,'search-input','search-result');
  };

  var cancleInput = () => {
    // stopSearchAnim();
    // startSearchAnim();
    $('body').removeClass('fixbody');
    if (!$searchInput.val()) {
      $searchWrap.removeClass('on');
      $resultArea.addClass("toggleResult");
      $noResult.hide();
    }
    // stopSearchAnim();
  };

  var closeInput = () => {
    $searchWrap.removeClass('on');
    $resultArea.html('');
    $resultArea.addClass("toggleResult");
    $noResult.hide();
    $('body').removeClass('fixbody');
  };

 

  $searchInput.on('foucus', inputing());  //inputing，执行获取焦点，提示输入
  $searchInput.on('blur',cancleInput);  //失焦取消输入

//解决冲突blur和click冲突；关闭搜索窗口
  $(".reset-button")
  .on('click',closeInput)
  .on('mouseover',() => {
    $searchInput.off('blur',cancleInput);
  }).on('mouseout',() => {
    $searchInput.on('blur',cancleInput);
  })

  $searchInput.onkeydown = e => {
    if (this.keydown == 13) {
      return false;
    }
  }

  //没有查到
  $resultArea.bind("DOMNodeRemoved DOMNodeInserted", function (e) {
    if (!$(e.target).text()) {
        $noResult.show(200);
    } else {
        $noResult.hide();
    }
});

  // Share 分享
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      
      var box = $('#' + id);
      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
          '<a href="http://servic.weibo.com/share/share.php?&title=' + encodedUrl + '" class="article-share-sina" target="_blank" title="微博"></a>',
          '<a href="http://share.renren.com/share/buttonshare.do?link=' + encodedUrl + '" class="article-share-renren" target="_blank" title="人人"></a>',
          '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '" class="article-share-qq" target="_blank" title="QQ 空间"></a>',
          '<a href="http://v.t.qq.com/share/share.php?url=' + encodedUrl + '" class="article-share-tencent" target="_blank" title="腾讯微博"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);

    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');

  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  }).on('click','#search-result li h1',function(e){
    window.open(hostName + $(this).attr('href'));
  });

  // Caption 图片注释
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;
      var width = this.width;
      var height = this.height;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');
      //生成图片样式
      $(this).wrap('<a href="' + this.src + '" width="' + this.width + '" height="'+ this.height + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }


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

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
    // this
  });

 //去往顶部
 $("body").scroll(() => {
   if ($("body").scrollTop() > 250) {
    $(".to-top-btn").show();
   }else {
    $(".to-top-btn").hide();
   }
 });
 $(".to-top-btn").click(function(e){
     $("body , html").animate({scrollTop:0},500); 
 });

})(jQuery);