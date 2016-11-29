$(document).ready(function(){
	$('body,.wrapper,.header,.community,.games,.footer,.img-viewer').css('height',window.innerHeight);
	$('.img-viewer>img').css('height',window.innerHeight);
	$('.down').css('left',$('.header').width() / 2 - $('.down').width() / 2 + 'px');

	$('.section-list-item li').css('width',292.05 + 'px');
	$('.section-list-item li').css('height',window.innerHeight / 4);

	var imgs = $('.header img');
	for(var i=0 ; i<imgs.length;i++)
	{
		$(imgs[i]).css('left',i * $(window).width());
	}

	var pages = $('.section-list-item li');
	for(var i=0 ; i<pages.length;i++)
	{
		var $page = $(pages[i]);
		console.log($page);
		$page.on('click',function(){
			var currentId =  $(this).attr('id');
			var activeId = getActiveSectionId();
			console.log(activeId);
			$('#'+activeId).removeClass('active');
			$('#'+ currentId).addClass('active');			//用$(this)而不用$page是因为$page为定值(page4)

			$('.img-viewer').stop().animate({left:-(parseInt(currentId.substr(currentId.length-1,1))-1) * $(window).width()},600,'swing');
		});
	}
});

function getActiveSectionId()
{
	var pages = $('.section-list-item li');
	for(var i=0 ; i<pages.length;i++)
	{
		var $page = $(pages[i]);
		if($page.attr('class'))
		{
			return $page.attr('id');
		}
	}
}