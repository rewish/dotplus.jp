/**
 * jQuery - Config file
 *
 * @version       $Revision: 35 $
 * @modifiedby    $LastChangedBy: rewish $
 * @lastmodified  $Date: 2012-03-06 18:24:29 +0900 (火, 06  3月 2012) $
 */
jQuery(function($) {

	$('a[href^="http://"]').not('a[href^="http://'+ location.host +'"]').click(function() {
		window.open(this.href, null);
		return false;
	});

	$('aside.sidebar > section').tab();

	//$('#latestTweets > ol').latestTweets('dotcoder', 3);
	$('#hashTags > ol').hashTags('#dtpsjp', 3);
	$('article a[href^="//twitter.com/"]:contains("@")').twttrFloatTip();
});
