$(document).ready(function(){

	init();

	header_turn_pages();

	logo_effect();

	prepareScroll();

	picMove();

	columnItemOnMouseOver();
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

function init()
{
	$('body,.wrapper,.header,.community,.games,.footer,.img-viewer').css('height',window.innerHeight);
	$('.img-viewer>img').css('height',window.innerHeight);
	$('.down').css('left',$('.header').width() / 2 - $('.down').width() / 2 + 'px');
	$('.up').css('left',$('.header').width() / 2 - $('.up').width() / 2 + 'px');

	$('.section-list-item li').css('width',292.05 + 'px');
	$('.section-list-item li').css('height',window.innerHeight / 4);

	var imgs = $('.header img');
	for(var i=0 ; i<imgs.length;i++)
	{
		$(imgs[i]).css('left',i * $(window).width());
	}

	$('.header .down').on('click',toCommunity);
	$('.community .up').on('click',toHeader);
	$('.community .down').on('click',toGames);
	$('.games .up').on('click',toCommunity);
	$('.games .down').on('click',toFooter);
	$('.footer .up').on('click',toGames);

	document.documentElement.style.overflow='hidden';					//禁止滚动条滚动，防止动画进行中因滚动条滚动造成$("body").scrollTop()
																		//值的改变而引起的不可预计结果
}

function header_turn_pages()
{
	var pages = $('.section-list-item li');
	for(var i=0 ; i<pages.length;i++)
	{
		var $page = $(pages[i]);
	//	console.log($page);
		$page.on('click',function(){
			var currentId =  $(this).attr('id');						//用$(this)而不用$page是因为$page为定值(page4)
			var activeId = getActiveSectionId();
		//	console.log(activeId);
			$('#'+activeId).removeClass('active');
			$('#'+ currentId).addClass('active');			

			$('.img-viewer').stop().animate({left:-(parseInt(currentId.substr(currentId.length-1,1))-1) * $(window).width()},600,'swing');
		});
	}
}

function logo_effect()
{
	$('.open-nov-img').mouseover(function(){
		$('.open-nov-img').attr('src','images/open_hov.png'); 
	});
	$('.open-nov-img').mouseout(function(){
		$('.open-nov-img').attr('src','images/open_nov.png'); 
	});
}

function prepareScroll()
{
	if (document.addEventListener)
	{	
        document.addEventListener('DOMMouseScroll', mouseScrolled, false);
    }
	document.onmousewheel = mouseScrolled;
}

function mouseScrolled()
{
	var e = window.event;
	if (e.wheelDelta) 									//判断浏览器IE，谷歌滑轮事件
    {       
        if (e.wheelDelta > 0) 							//当滑轮向上滚动时  
        {   
        	mouseScrolledUp();
        }  
        if (e.wheelDelta < 0) 							//当滑轮向下滚动时  
        {
        	mouseScrolledDown();
        }
    }  
    else if (e.detail) 									//Firefox滑轮事件 
    {    
        if (e.detail> 0) 								//当滑轮向上滚动时
        {     
            mouseScrolledUp();
        }  
        if (e.detail< 0) 								//当滑轮向下滚动时 
        {    
            mouseScrolledDown();
        }  
    }
}

function mouseScrolledUp()								//当滑轮向上滚动时  
{
//	console.log('up' + $("body").scrollTop())
	var scrollTop = $("body").scrollTop();
	if (scrollTop == 0) 
	{

	}
	else if(scrollTop <= $(".community").offset().top)
	{
		if(!$("body").is(":animated"))
		{
			toHeader();
		}
	}
	else if(scrollTop <= $(".games").offset().top)
	{
		if(!$("body").is(":animated"))
		{
			toCommunity();
		}
	}
	else if(scrollTop <= $(".footer").offset().top)
	{
		if(!$("body").is(":animated"))
		{
			toGames();
		}
	}
	else
	{

	}
}

function mouseScrolledDown()							//当滑轮向下滚动时 
{
//	console.log('down' + $("body").scrollTop())
	var scrollTop = $("body").scrollTop();
	if (scrollTop == 0) 
	{
		if(!$("body").is(":animated"))
		{
			toCommunity();
		}
	}
	else if(scrollTop <= $(".community").offset().top)
	{
		if(!$("body").is(":animated"))
		{
			toGames();
		}
	}
	else if(scrollTop <= $(".games").offset().top)
	{
		if(!$("body").is(":animated"))
		{
			toFooter();
		}
	}
	else if(scrollTop <= $(".footer").offset().top)
	{

	}
	else
	{
	//	alert("bug");
	}
}

function toHeader()
{
	$("body").animate({scrollTop:0},500,'swing');
}

function toCommunity()
{
	$("body").animate({scrollTop:$(".community").offset().top},500,'swing');
}

function toGames()
{
	$("body").animate({scrollTop:$(".games").offset().top},500,'swing');
}

function toFooter()
{
	$("body").animate({scrollTop:$(".footer").offset().top},500,'swing');
}

function picMove()								//community栏图片移动逻辑
{
	$('.pic4').mouseover(function(){
		$('.pic3').stop().animate({'margin-left':'0px'},400,'swing');
		$('.pic2').stop().animate({'margin-left':'-220px'},400,'swing');
		$('.pic1').stop().animate({'margin-left':'-220px'},400,'swing');
	});
	$('.pic3').mouseover(function(){
		$('.pic3').stop().animate({'margin-left':'-220px'},400,'swing');
		$('.pic2').stop().animate({'margin-left':'0px'},400,'swing');
		$('.pic1').stop().animate({'margin-left':'-220px'},400,'swing');
	});
	$('.pic2').mouseover(function(){
		$('.pic3').stop().animate({'margin-left':'-220px'},400,'swing');
		$('.pic2').stop().animate({'margin-left':'-220px'},400,'swing');
		$('.pic1').stop().animate({'margin-left':'0px'},400,'swing');
	});
	$('.pic1').mouseover(function(){
		$('.pic3').stop().animate({'margin-left':'-220px'},400,'swing');
		$('.pic2').stop().animate({'margin-left':'-220px'},400,'swing');
		$('.pic1').stop().animate({'margin-left':'-220px'},400,'swing');
	});
}

function columnItemOnMouseOver()
{
	var items = $('.column-switcher-item');
	for(var i=0;i<items.length;i++)
	{
		var $item = $(items[i]);
		$item.mouseover(function(){
			$(this).stop().animate({'border-width':'7.5px'},100,'swing');
		});
		$item.mouseout(function(){
			$(this).stop().animate({'border-width':'4px'},100,'linear');
		});
	}
}