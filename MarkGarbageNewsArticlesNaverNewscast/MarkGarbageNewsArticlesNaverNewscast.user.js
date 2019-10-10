// ==UserScript==
// @name           MarkGarbageNewsArticlesNaverNewscast
// @namespace      naver news
// @description    marks the garbage news articles in naver main newscast section 
// @include        http://*naver.com*
// ==/UserScript==

function mark() {
	var cast = document.getElementById('cast_article');
	cast.innerHTML = cast.innerHTML.replace(/"(http:\/\/.*(newdaily|dailian|joongangdaily|chosun|joinsmsn)[^"]+)"/g, "");

	var newsLazy = document.getElementById('newsLazy');
	newsLazy.innerHTML = newsLazy.innerHTML.replace(/"(http:\/\/.*(newdaily|dailian|joongangdaily|chosun|joinsmsn)[^"]+)"/g, "");
}

mark();
document.addEventListener("click", mark, true);
