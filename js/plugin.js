/**
 * jQuery - Plugins
 *
 * @version       $Revision: 23 $
 * @modifiedby    $LastChangedBy: rewish $
 * @lastmodified  $Date: 2010-05-21 15:25:02 +0900 (Fri, 21 May 2010) $
 */
(function($) {

/**
 * Tab
 *
 * jQuery >= 1.4
 * (c) 2010 rew <rewish.org@gmail.com>
 */
$.fn.tab = function(config) {
	var nav = {},
		config = $.extend({
			headingLevel: 'h2',
			navWrapClass: 'tabNav',
			currentClass: 'current'
		}, config);

	return this.each(function() {
		var self = $(this),
			head = self.find(config['headingLevel']),
			tabClass = self.attr('class').split(' ')[0],
			navClass = '';

		if (!tabClass) return;

		if (!(tabClass in nav)) {
			nav[tabClass] = $('<ul/>').addClass(config['navWrapClass']);
			self.siblings('.' + tabClass).hide();
			self.before(nav[tabClass]).show();
			navClass = config['currentClass'];
		}

		nav[tabClass].append(
			$('<li/>').append(
				$('<a/>', {
					text: head.text(),
					href: 'javascript:void(0)',
					'class': navClass
				}).click(function() {
					self.siblings('.' + tabClass).hide().end().show();
					$('.' + config['currentClass'], nav[tabClass])
						.removeClass(config['currentClass']);
					$(this).addClass(config['currentClass']);
				})
			)
		);

		head.hide();
	});
};

/**
 * Hash tags
 *
 * jQuery >= 1.4
 * (c) 2010 rew <rewish.org@gmail.com>
 */
$.fn.hashTags = function(hashTag, showCount) {
	var self = $(this),
		API_URL = 'http://search.twitter.com/search.json';

	$.get(API_URL, {q: encodeURI(hashTag)}, function(statuses) {
		if (statuses['results'].length === 0) return;
		self.empty();
		$(statuses['results']).slice(0, showCount).each(function() {
			var status = this;
			var STATUS_URL = 'http://twitter.com/'+ status['from_user'] +'/statuses/';
			self.append($('<li/>')
				.append($('<p/>', {
					'class': 'text',
					html: status['text']
						.replace(/(https?\:\/\/[^ 　]+)/g, '<a href="$1">$1</a>')
						.replace(/@(\w{1,15})/g, '<a href="http://twitter.com/$1">@$1</a>')
				}))
				.append($('<p/>').addClass('via').append(
					$('<a/>', {
						href: 'http://twitter.com/'+ status['from_user'] +'/statuses/' + status['id'],
						text: relative_time(status['created_at'])
					}),
					$('<span/>', {
						text: ' via '
					}),
					$('<a/>', {
						href: 'http://twitter.com/'+ status['from_user'],
						text: status['from_user']
					})
				))
			);
		});
	}, 'jsonp');
};

/**
 * Latest tweets
 *
 * jQuery >= 1.4
 * (c) 2010 rew <rewish.org@gmail.com>
 */
$.fn.latestTweets = function(userName, showCount) {
	var self = $(this),
		API_URL = 'http://twitter.com/statuses/user_timeline/',
		STATUS_URL = 'http://twitter.com/'+ userName +'/statuses/';

	$.get(API_URL + userName +'.json', {count: (showCount || 5)}, function(statuses) {
		if (!statuses) return;
		self.empty();
		$.each(statuses, function() {
			self.append($('<li/>')
				.append($('<p/>').addClass('text').text(this.text))
				.append($('<p/>').addClass('link').append(
					$('<a/>', {
						href: STATUS_URL + this.id,
						text: relative_time(this.created_at)
					}))
				)
			);
		});
	}, 'jsonp');
};

/**
 * http://twitter.com/javascripts/blogger.js
 * (c) 2010 Twitter
 */
function relative_time(time_value) {
	var values = time_value.split(" ");
	time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	var parsed_date = Date.parse(time_value);
	//if (window.console) console.debug(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	delta = delta + (relative_to.getTimezoneOffset() * 60);
	if (delta < 60) {
		return 'less than a minute ago';
	} else if(delta < 120) {
		return 'about a minute ago';
	} else if(delta < (60*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (120*60)) {
		return 'about an hour ago';
	} else if(delta < (24*60*60)) {
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	}
}

})(jQuery);

/*
 * 
 * twttrFloatTip
 * 
 * jQuery required (tested on version 1.4.2)
 * encoding UTF-8
 * 
 * Copyright (c) 2010 nori (norimania@gmail.com)
 * 5509 - http://moto-mono.net
 * Licensed under the MIT
 * 
 * Special Thanks - rew (http://rewish.org)
 *
 * $Date: 2010-03-17 08:07
 * 
 */
(function(c){c.fn.twttrFloatTip=function(){var e=new a();c(this).each(function(f){var h=c(this);var g=h.text();if(g.match(/^@/)){g=g.replace(/^@/,"")}h.hover(function(){var i=h.offset();e.mouseEnterFlg=true;e.jsonpReadQueue[g]=true;e.setPos(i,h);e.addData(g,function(){e.setPos(i,h)})},function(){e.jsonpReadQueue[g]=false;e.mouseEnterFlg=false;setTimeout(function(){if(!e.mouseEnterFlg){e.content.css({left:"-1000em"})}},e.hideDuration)})});return e};var a=function(){var e=this;this.apiURL="http://twitter.com/users/show.json";this.userObject={};this.loadingText="loading...";this.jsonpReadQueue={};this.mouseEnterFlg=null;this.hideDuration=500;this.spaceFix=5;this.moreBtn=true;this.content=c('<div class="userPreview"/>');this.content.hover(function(){e.mouseEnterFlg=true},function(){e.mouseEnterFlg=false;setTimeout(function(){if(!e.mouseEnterFlg){e.content.css({left:"-1000em"})}},e.hideDuration)}).append(this.loading()).addClass("loading");c("body").append(this.content.css({position:"absolute",left:"-1000em"}))};a.prototype={temp:function(e){return['<div class="userPreviewInner">','<div class="userData">','<div class="userImage">','<img src="'+e.profile_image_url+'" alt="'+e.name+'" width="48" height="48" id="userImage" />',"</div>",'<div class="userTexts">','<div id="userName">'+e.name+"</div>",'<div id="userScreenName"><a id="userScreenName" href="http://twitter.com/'+e.screen_name+'">@'+e.screen_name+"</a></div>",e.location?'<div id="userLocation">'+e.location+"</div>":"","</div>","</div>",'<div id="userDetail">','<div class="userSubData">',e.url?'<div class="userWebSite">Web: <span id="userWebSite"><a href="'+e.url+'">'+e.url+"</a></span></div>":"",e.description?'<div class="userBio">Bio: <span id="userBio">'+e.description+"</span></div>":"",'<div class="latest">Latest Tweet: <span id="userLatest">'+e.latest_tweet+"</span></div>","</div>",'<ul id="userStatus">','<li class="userTweets"><span id="userTweets">'+e.statuses_count+"</span>tweets</li>",'<li class="userFollowing"><span id="userFollowing">'+e.friends_count+"</span>following</li>",'<li class="userFollowers"><span id="userFollowers">'+e.followers_count+"</span>followers</li>",'<li class="userFavourites"><span id="userFavourites">'+e.favourites_count+"</span>favourites</li>","</ul>","</div>","</div>"].join("")},loading:function(){return['<div class="loadingInner">','<div class="text">'+this.loadingText+"</div>","</div>"].join("")}};a.prototype.upDate=function(e,f){this.content.empty().removeClass("loading").append(e(f))};a.prototype.addData=function(g,f){if(!g){return false}var e=this;if(e.userObject[g]){e.upDate(e.temp,e.userObject[g]);f()}else{if(c('script[src*="screen_name='+g+'"]').length>0){}else{e.content.empty().addClass("loading").append(e.loading());f();e.jsonpReadQueue[g]=true;c.ajax({url:e.apiURL,type:"GET",dataType:"jsonp",data:{screen_name:g},success:function(h){if(h.error){if(e.jsonpReadQueue[g]){e.content.empty().removeClass("loading").append('<div class="error">Rate Limit Exceed</a>');f()}}else{e.userObject[g]={profile_image_url:h.profile_image_url,name:h.name,screen_name:h.screen_name,location:h.location,url:h.url,description:h.description,latest_tweet:d(h.status["text"]),statuses_count:b(h.statuses_count),friends_count:b(h.friends_count),followers_count:b(h.followers_count),favourites_count:b(h.favourites_count)};if(e.jsonpReadQueue[g]){e.upDate(e.temp,e.userObject[g]);f()}}}})}}};a.prototype.setPos=function(l,k){var i=document,f=this,e=i.documentElement.clientHeight,h=i.body.scrollTop||i.documentElement.scrollTop,j=((l.top-h)>e/2)?true:false,g=j?"floatTipAbove":"floatTipBelow";this.content.removeClass("floatTipAbove").removeClass("floatTipBelow").addClass(g).css({left:"-1000em"});if(j){this.content.css({top:l.top-f.content.attr("offsetHeight")-f.spaceFix,left:l.left})}else{this.content.css({top:l.top+c(k).height()+f.spaceFix,left:l.left})}};function d(e){return e.replace(/(https?\:\/\/[^ 　]+)/g,'<a href="$1">$1</a>').replace(/@(\w{1,15})/g,'<a href="http://twitter.com/$1">@$1</a>')}function b(f){var e=""+ +f;var g=e.indexOf(".");return(g==-1)?e.replace(/(\d{1,3})(?=(?:\d\d\d)+$)/g,"$1,"):e.substring(0,g).replace(/(\d{1,3})(?=(?:\d\d\d)+$)/g,"$1,")+e.substring(g).replace(/(\d\d\d)(?=\d)/g,"$1,")}})(jQuery);
