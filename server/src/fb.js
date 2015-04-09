var lastNotification;
var lastNotificationTime;

(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
mixpanel.init("2245181dbc803998dedc5b07d840e672");

var emoticonMapping = {
	"emoticon_smile"		:"😃",
	"emoticon_frown"		:"😦",
	"emoticon_poop"			:"💩",
	"emoticon_putnam"		:":putnam:",
	"emoticon_tongue"		:"😛",
	"emoticon_grin"			:"😀",
	"emoticon_gasp"			:"😦",
	"emoticon_wink"			:"😉",
	"emoticon_glasses"		:"8-)",
	"emoticon_sunglasses"	:"😎",
	"emoticon_grumpy"		:">:(",
	"emoticon_unsure"		:":/",
	"emoticon_cry"			:"😢",
	"emoticon_devil"		:"😈",
	"emoticon_angel"		:"😇",
	"emoticon_kiss"			:"😘",
	"emoticon_heart"		:"❤️",
	"emoticon_kiki"			:"😊",
	"emoticon_squint"		:"😑",
	"emoticon_confused"		:"😕",
	"emoticon_confused_rev"	:"😕",
	"emoticon_upset"		:">:o",
	"emoticon_pacman"		:":v",
	"emoticon_robot"		:":|]",
	"emoticon_colonthree"	:":3",
	"emoticon_penguin"		:"🐧",
	"emoticon_shark"		:"(^^^)",
	"emoticon_like"			:"👍"
};

csssetup = function() {
	head = document.head || document.getElementsByTagName( 'head' )[ 0 ];
	style = document.createElement( 'style' );
	style.type = 'text/css';
	if ( style.styleSheet ) {
			style.styleSheet.cssText = css;
	} else {
			style.appendChild( document.createTextNode( css ) );
	}
	head.appendChild( style );
};

function init() {

    csssetup();

	setInterval(function() {
		//window.dispatchEvent(new Event('resize'));
		document.querySelector('._1tqi').textContent="Goofy";
		dockCount();
	}, 200);

	setTimeout(function() {
		mixpanel.track("loaded");
		window.webkit.messageHandlers.notification.postMessage({type: 'URL_CONFIG', backgroundURLs: ["messenger.com/login","messenger.com/t"], inAppURLs: ["messenger.com/login","messenger.com/t"]});
	}, 3000);

	document.body.addEventListener("DOMNodeInserted", function (ev) {
		if (document.querySelector('._n8')) {
			window.webkit.messageHandlers.notification.postMessage({type: 'SHOW_IMAGE', url: document.querySelector('._4-od').getAttribute('src')});
			document.body.removeChild(document.querySelector('._n8'));
		}
	}, false);

}

function newConversation() {
	document.querySelector('._4bl8._4bl7 a').click();
}

function gotoConversation(tag) {
	if (tag==1) {
		document.querySelector('._1ht2').nextElementSibling.firstChild.click();
	} else {
		document.querySelector('._1ht2').previousElementSibling.firstChild.click();
	}
}

function reactivation(userid) {
	if (userid) {
		document.querySelector('[data-reactid="'+userid+'"] a').click();
	} else if (new Date().getTime() < lastNotificationTime + 1000*60) {
		document.querySelector('._1ht3 a').click();
	}
}

function dockCount() {
	if (document.querySelector('title').textContent == 'Messenger') {
		window.webkit.messageHandlers.notification.postMessage({type: 'DOCK_COUNT', content: "0"});
		return;
	}
	var c = /\(([^)]+)\)/.exec(document.querySelector('title').textContent);
	if (c.length>1) {
		c = c[1];
	} else {
		c = 0;
	}

	window.webkit.messageHandlers.notification.postMessage({type: 'DOCK_COUNT', content: c});

	if (c > 0) {
		var text = document.querySelector('._1ht3 ._1htf');
		if (text) {
			text = text.textContent;
			var subtitle = document.querySelector('._1ht3 ._1ht6').textContent;
			if (lastNotification != subtitle+text) {
				//replacing Facebook smilies with OS X emojis
				[].forEach.call(document.querySelectorAll('._1ht3 ._1htf .emoticon_text'), function(e) {e.textContent = "";});
				[].forEach.call(document.querySelectorAll('._1ht3 ._1htf .emoticon'), function(e) {
					for (a in emoticonMapping) {
						if (e.classList.contains(a)) {
							e.textContent = emoticonMapping[a];
							break;
						}
					}
				});

				text = document.querySelector('._1ht3 ._1htf').textContent;
				var id = document.querySelector('._1ht1._1ht3').getAttribute('data-reactid');
				window.webkit.messageHandlers.notification.postMessage({type: 'NOTIFICATION', title: subtitle, text: text, id: id});
				lastNotification = subtitle+text;
				lastNotificationTime = new Date().getTime();
			}
		}
	}
}

function replyToNotification(userid, answer) {
	document.querySelector('[data-reactid="'+userid+'"] a').click();
	setTimeout(function () {
		if (!document.querySelector('._209g._2vxa span span')) {
			var textEvent = document.createEvent('TextEvent');
			textEvent.initTextEvent('textInput', true, true, null, String.fromCharCode(32), 9, "en-US");
			document.querySelector('._209g._2vxa').dispatchEvent(textEvent);
		}

		setTimeout(function () {
			document.querySelector('._209g._2vxa span span').textContent = answer;

			setTimeout(function () {
				__triggerKeyboardEvent(document.querySelector('._209g._2vxa'),13)
			},50);
		},50);
	},50);
}

function __triggerKeyboardEvent(el, keyCode) {
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if(eventObj.initEvent){
      eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);

}
