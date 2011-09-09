// ==UserScript==
// @name           voigtclub shortcut remapping
// @namespace      voigtclub
// @description    re-maps voigtclub shortcut no. 3 to new link (http://terzeron.net)
// @include        http://voigtclub.com/*
// @include        http://*.voigtclub.com/*
// ==/UserScript==

var tags = document.getElementsByTagName('INPUT');

for (i = 0; i < tags.length; ++i) {
    if (tags[i].type == "image" &&
        tags[i].attributes[1].nodeName == "accesskey" &&
        tags[i].attributes[1].nodeValue == "3" &&
        tags[i].attributes[2].nodeName == "onclick") {
        tags[i].attributes[2].nodeValue = "window.location='/lb/lord.php?id=buynsell'";
    }
}

