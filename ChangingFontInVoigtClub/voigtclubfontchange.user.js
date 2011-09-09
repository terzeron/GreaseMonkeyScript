// ==UserScript==
// @name           voigtclub font change
// @namespace      voigtclub
// @description    font size increasing (http://terzeron.net)
// @include        http://*.voigtclub.com/*
// @include        http://voigtclub.com/*
// ==/UserScript==

var allElements = document.getElementsByTagName('*');

for (var i = 0; i < allElements.length; i++) {
    var elementStyle = getComputedStyle(allElements[i], '');
    if (/^tahoma,굴림$/i.test(elementStyle.fontFamily)) {
        allElements[i].style.fontFamily = '맑은고딕';
        allElements[i].style.fontSize = '12px';
    }
}

