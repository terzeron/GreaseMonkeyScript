 ==UserScript==
// @name           naver news font decreasing
// @namespace      naver
// @description    decreasing font size in naver news post (http://terzeron.net)

// @include        http://news.naver.com/*
// ==/UserScript==

var divtag = document.getElementById('content');
var childnodes = divtag.childNodes;

for (i = 0; i < childnodes.length; ++i) {
    if (/*childnodes[i].id == "content" && */
        childnodes[i].className == "article") {
        childnodes[i].style.fontFamily = "맑은 고딕";
        childnodes[i].style.fontSize = "13px";
    }
}

divtag = document.getElementById('naver_news_20080201_div');
divtag.style.fontFamily = "맑은 고딕";
divtag.style.fontSize = "13px";


