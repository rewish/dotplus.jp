$(function(){
	var winHeight = $(window).height();
	var header = "#header";
	var sideNav = "#sideNav";
	var section = ".section";
	var area_ = "area_";
	var thisNumber ="thisNumber";
	var pageNumber = "#pageNumber";
	
	$("#index").each(function(){
		$(this).css({"height":winHeight});
		var title = $("p.indexTitle" , this).text();
		
		$("ul li.indexTop a" , sideNav).append(title);
	
	});
	
	$(section).each(function(i){
		$(this).css({"height":winHeight});
		$(this).attr("id",area_+i);
		var ID = $(this).attr("id");
		var heading = $("h2" , this).text();
		
		$(this).append("<p class='" + thisNumber + "'>" + (i + 1) +"</p>");
		
		$("ul li ul" , sideNav).append("<li><a href='#"+ID+"'>"+heading+"</a></li>");
		$("." + thisNumber , this).css({
			position: "absolute",
			right: 20 + "%",
			top: $(window).height() + $(this).offset().top - $(header).height() * 6 + "px",
			fontSize: 800 + "%",
			fontWeight: "bold",
			opacity: 0.1							
		});
		
		/* page scroll */
		$("a[href^=#]").click(function(){
			var Hash = $(this.hash);
			var HashOffset = $(Hash).offset().top;
			$("html,body").stop().animate({
				scrollTop: HashOffset
			}, 1000);
			return false;
		});

	});

	var Length = $(section).length;
	$("strong" , pageNumber).append(Length);
	
});