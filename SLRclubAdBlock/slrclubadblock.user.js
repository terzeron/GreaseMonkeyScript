// ==UserScript==
// @name           slrclub ad block
// @namespace    slrclub
// @description    block the ads in articles of slrclub.com (from http://terzeron.net)
// @include        http://*slrclub.com/*
// ==/UserScript==


div_tag = document.getElementById('spc');
div_tag.style.visibility = "hidden";
div_tag.style.display = "none";

div_tag = document.getElementById('sponsor1');
div_tag.style.visibility = "hidden";
div_tag.style.display = "none";
