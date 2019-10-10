// ==UserScript==
// @name           GnuBoard vi shortcut
// @namespace      GnuBoard
// @description    add vi shortcuts for GnuBoard (http://terzeron.net)
// @include        http://*/board.php?bo_table=*
// @include        https://*/board.php?bo_table=*
// ==/UserScript==

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.A
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':true,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}
		
		var ele = opt.target
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();
		
		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;
				
				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
			
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown
			
			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
				
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
				
				'pagedown':34,
				'page_down':34,
				'pd':34,
				
				'left':37,
				'up':38,
				'right':39,
				'down':40,
				
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
			
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
            
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
            
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;
					
				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;
					
				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;
					
				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
			   modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
			   modifiers.shift.pressed == modifiers.shift.wanted &&
			   modifiers.alt.pressed == modifiers.alt.wanted &&
			   modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
				
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
					
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},
	
	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];
		
		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}

//
// modified by terzeron
//

// Clien-specific
function async_load() {
	var GetKeyStroke = null;
	var keydata = null;
	document.onkeypress = null;
}
window.onload = async_load;

// site-specific
var article_num_param = "wr_id=";
var page_num_param = "page=";
var article_file_name = "";
var page_file_name = "board.php";
var board_name_param = "bo_table=";
var board_name = null;
var current_article_num = null;
var prev_article_num = null;
var next_article_num = null;

function determine_current_article_info()
{
	var tokens = document.location.href.split("/");
	page_file_name = tokens[tokens.length - 1].split("?")[0];

	var tokens = document.location.href.split("&");
	for (var i = 0; i < tokens.length; i++) {
		if ((idx = tokens[i].indexOf(article_num_param)) >= 0) {
			current_article_num = Number(tokens[i].substr(idx + article_num_param.length));
		}
		if ((idx = tokens[i].indexOf(board_name_param)) >= 0) {
			board_name = tokens[i].substr(idx + board_name_param.length);
		}

		if (current_article_num != null && board_name != null) {
			return;
		}
	}
}

function determine_prev_and_next() 
{
	var links = document.getElementsByTagName("a");
	var idx = 0;
	var article_num_list = [];
	var html = "";
	
	for (var i = 0; i < links.length; i++) {
		if (links[i].href.indexOf(page_file_name) >= 0 &&
			links[i].href.indexOf(board_name_param) >= 0 &&
			links[i].href.indexOf(board_name) >= 0 &&
			links[i].href.indexOf(article_num_param) >= 0) {
			var tokens = links[i].href.split("&");
			for (var j = 0; j < tokens.length; j++) {
				if ((idx = tokens[j].indexOf(article_num_param)) >= 0) {
					var article_num = Number(tokens[j].substr(idx + article_num_param.length));
					article_num_list.push(article_num);
				}
			}
		}
	}

    var min = 9007199254740992;
    var max = -min;
	for (var i = 0; i < article_num_list.length; i++) {
		//html += "article_num_list[" + i + "]=" + article_num_list[i] + ", current_article_num=" + current_article_num + ", min=" + min + ", max=" + max + "\n";
		if (min > article_num_list[i] && article_num_list[i] > current_article_num) {
            min = article_num_list[i];
		}
		if (max < article_num_list[i] && article_num_list[i] < current_article_num) {
            max = article_num_list[i];
		}
	}
    prev_article_num = min;
    next_article_num = max;
	//alert(html);
}

determine_current_article_info();
if (current_article_num != null) {
	determine_prev_and_next();
}

// J: next article
shortcut.add("J", function() { 
	var href = document.location.href; 
	var tokens = href.split("&");
	var new_href = "";
	
	for (var i = 0; i < tokens.length; ++i) {
		if (tokens[i].indexOf(article_num_param) == 0) {
			tokens[i] = article_num_param + next_article_num;
		}
	}

	new_href = tokens.join("&");
	if (document.location.href != new_href) {
		document.location.href = new_href;
	}
});

shortcut.add("K", function() { 
	var href = document.location.href; 
	var tokens = href.split("&");
	var new_href = "";

	for (var i = 0; i < tokens.length; ++i) {
		if (tokens[i].indexOf(article_num_param) == 0) {
			tokens[i] = article_num_param + prev_article_num;
		}
	}

	new_href = tokens.join("&");
	if (document.location.href != new_href) {
		document.location.href = new_href;
	}
});
