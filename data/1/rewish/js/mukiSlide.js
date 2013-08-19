/**
@prefix : <http://purl.org/net/ns/doas#> .
<http://factory.yusukenakanishi.com/javascript/jquery/plugin/mukiSlide/js/mukiSlide.js> a :JavaScript;
 :shortdesc "mukiSlide.js";
 :created "2010-03-18";
 :release [:revision "beta"; :created "2010-03-18"];
 :author [:name "Yusuke. Nakanishi"; :homepage <http://yusukenakanishi.com/> ];
 :license <http://creativecommons.org/licenses/GPL/2.0/>;
 :dependencies "none" .
*/

(function() {

    jQuery.mukiSlide = function(config) {
    
        config = $.extend({
            motion: 'show'
        }, config);
        
        var sectionArea = $('div#content div.section');
        
        // 画面に合わせて高さを指定
        var h = window.innerHeight - 165;
        var w = window.innerWidth;
        sectionArea.css('height', h + 'px');
        
        // 最初のページを表示
        sectionArea.hide();
        $('div#content div.section:first').show().addClass('select');
        
        // メニューボタンの追加
        var menu = "<ul id=\"menu\">";
        menu += "<li id=\"first\"><img src=\"img/first.gif\" alt=\"最初のページへ\" title=\"最初のページへ\" /></li>";
        menu += "<li id=\"prev\"><img src=\"img/prev.gif\" alt=\"前のぺーじへ\" title=\"前のぺーじへ\" /></li>";
        menu += "<li id=\"next\"><img src=\"img/next.gif\" alt=\"次のページへ\" title=\"次のページへ\" /></li>";
        menu += "<li id=\"last\"><img src=\"img/last.gif\" alt=\"最後のページへ\" title=\"最後のページへ\" /></li>";
        menu += "<li id=\"list\"><img src=\"img/list.gif\" alt=\"各ページをリスト表示\" title alt=\"各ページをリスト表示\" /></li>";
        menu += "</ul>";
        $('div#title').append(menu);
        
        // リストメニューの作成と追加
        var listmenu = "<ol id=\"listmenu\">";
        var i = 1;
        $('div#content h2').each(function() {
            listmenu += "<li>" + i + ".<span>" + $(this).text() + "</span></li>";
            i++;
        });
        listmenu += "</ol>";
        $('div#title ul li:last').append(listmenu);
        $('ol#listmenu').hide();
        
        // 初期設定
        $('div.separate').children(':not(h2)').hide();
        $('div.separate').children('h2').next().addClass('here');
        $('div.separate').children('ul,ol,dl').children().hide();
        $('div.separate').children('ul,ol,dl').each(function() {
            $(this).children('first').addClass('here');
        });
        $('div.separate strong').css({opacity: 0});
        pageNumber();
        
        // 次のページへ移った際のコンテンツのリセットと初期設定
        function nextReset() {
            $('div.separate').removeClass('start, end');
            $('div.separate').children(':not(h2)').hide();
            $('div.separate').children('h2').nextAll().removeClass('here');
            $('div.separate').children('h2').next().addClass('here');
            $('div.separate').children('ul,ol,dl').children().hide();
            $('div.separate').children('ul,ol,dl').children().removeClass('here');
            $('div.separate').children('ul,ol,dl').each(function() {
                $(this).children(':first').addClass('here');
            });
            $('div.separate strong').css({opacity: 0});
            pageNumber();
        }
        
        // ページ数の追加
        function pageNumber() {
            var allPage = $('div#content div').length;
            var i = 1;
            $('div#content div').each(function() {
                if($(this).is(':hidden')) {
                    i++;
                } else {
                    return false;
                }
            });
            var page = "<p id=\"pageNumber\">" + i + ' / ' + allPage + "</p>";        
            $('p#pageNumber').remove();
            $('address').before(page);
        };
        
        // addressを右下に設置(OFF環境のためにJSで指定)
        $('address').css({
            'position': 'absolute',
            'bottom': '20px',
            'right': '30px'
        });
        
        // 次のページへ移ったときの要素がseparateだった時の処理
        function nextSeparate() {
            // classにseparateがあるかどうか判定
            if($('div.select').is('.separate')) {
                if($('div.select').is('.end')) {
                    next();
                    nextReset();
                } else {
                    var judgeHere = $('div.select').children('.here');
                    // ul、ol、dlかどうか判定
                    if(judgeHere.is('ul') || judgeHere.is('ol') || judgeHere.is('dl')) {
                        if(judgeHere.is(':hidden')) {
                            judgeHere.show();
                        }
                        var judgeListHere = $('div.separate:visible').children('.here').children('.here');
                        var judgeChildListHere = judgeListHere.children().children();
                        if(judgeListHere.is(':hidden')) {
                            judgeListHere.show();
                            if(judgeListHere.children().is('strong') || judgeChildListHere.children().is('strong')) {
                                return false;
                            } else {
                                judgeListHereNext();
                            }
                        } else {
                            judgeListHere.children('strong').animate({ opacity: 1 }, 500);
                            judgeListHere.find('strong').animate({ opacity: 1 }, 500);
                            judgeListHereNext();
                        }
                    } else {
                        if(judgeHere.is(':hidden')) {
                            judgeHere.show();
                            if(!judgeHere.children().is('strong')) {
                                judgeHereNext();
                            }
                        } else {
                            judgeHere.children('strong').animate({ opacity: 1 }, 500);
                            judgeHereNext();
                        }
                    }
                }
            } else {
                next();
                nextReset();
            };
            
            // ul、ol、dlの子要素の次があるかどうかの判定
            function judgeListHereNext() {
                var nextListHere = judgeListHere.next();
                if(nextListHere.is('*')) {
                    judgeListHere.removeClass('here');
                    nextListHere.addClass('here');
                } else {
                    judgeHereNext();
                }
            };
        
            // 次の要素があるかどうかの判定
            function judgeHereNext() {
                var nextHere = judgeHere.next();
                if(nextHere.is('*')) {
                    judgeHere.removeClass('here');
                    nextHere.addClass('here');
                } else {
                    $('div.section:visible').addClass('end');
                    $('p#pageNumber')
                    .animate({ opacity: "0" }, 50)
                    .animate({ opacity: "1" }, 50)
                    .animate({ opacity: "0" }, 100)
                    .animate({ opacity: "1" }, 100);
                }
            };
            
        };
        
        // 次のページへ
        function next() {
            if($('div.select').next().is('div.section')) {
                var nextContent = $('div.select').next();
                $('div.select').removeClass('select');
                nextContent.addClass('select');
                $('div.section:visible').hide();
                $('div.select')[config.motion]();
            } else {
                $('div.select').removeClass('select');
                $('div.section:visible').hide();
                $('div.section:first').addClass('select')[config.motion]();
            }
        };
        
        // 前のページへ
        function prev() {
            if($('div.select').prev().is('div.section')) {
                var prevContent = $('div.select').prev();
                $('div.select').removeClass('select');
                prevContent.addClass('select');
                $('div.section:visible').hide();
                $('div.select')[config.motion]();
            } else {
                $('div.select').removeClass('select');
                $('div.section:visible').hide();
                $('div.section:last').addClass('select')[config.motion]();
            }
        };
        
        // 一番最初のページへ
        function home() {
            $('div.select').removeClass('select');
            $('div.section:visible').hide();
            $('div.section:first').addClass('select')[config.motion]();
        };
        
        // 一番最後のページへ
        function last() {
            $('div.select').removeClass('select');
            $('div.section:visible').hide();
            $('div.section:last').addClass('select')[config.motion]();
        };
        
        // キーバインドの設定
        $(window).keyup(function(e){
            if(e.keyCode==32 || e.keyCode==39) {
                nextSeparate();
            } else if(e.keyCode==37) {
                prev();
                nextReset();
            } else if(e.keyCode==38) {
                home();
                nextReset();
            } else if(e.keyCode==40) {
                last();
                nextReset();
            }
        });
        
        // メニューボタンをクリックした時の挙動
        $('ul#menu li#next').click(function() {
            nextSeparate();
        });
        $('ul#menu li#prev').click(function() {
            prev();
            nextReset();
        });
        $('ul#menu li#first').click(function() {
            home();
            nextReset();
        });
        $('ul#menu li#last').click(function() {
            last();
            nextReset();
        });
        $('ul#menu li#list').click(function() {
            if($('ol#listmenu').is(':hidden')) {
                $('ol#listmenu').show();
            } else {
                $('ol#listmenu').hide();
            }
        });
        $('ol#listmenu li').click(function() {
            var judgeList = $(this).children('span').text();
            $('h2').each(function() {
                if(judgeList == $(this).text()) {
                    var fitArea = $(this).parent('div.section');
                    $('div.select').removeClass('select');
                    $('div.section:visible').hide();
                    fitArea.addClass('select')[config.motion]();
                }
            });
        });
    
    };
    
})(jQuery);
