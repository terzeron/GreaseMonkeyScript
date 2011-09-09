// ==UserScript==
// @name           voigtclub double click scrolling
// @namespace      voigtclub
// @description    prevention of scrolling by double click (http://terzeron.net)
// @include        http://voigtclub.com/*
// @include        http://*.voigtclub.com/*
// ==/UserScript==

var bodytag = document.getElementsByTagName('BODY');
var attrs = bodytag[0].attributes;

for (i = 0; i < attrs.length; ++i) {
    if (attrs[i].nodeName == "ondblclick" && 
        attrs[i].nodeValue == "dbl_scroll()") {
        attrs[i].nodeValue = "";
    }
}
