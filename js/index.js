$(document).ready(function(){

	init();

	header_turn_pages();

	logo_effect();

	prepareScroll();

	picMove();

	columnItemOnMouseOver();

	setPic();
	
	picRotate();

//	toHeader();
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

	var btn_intro = $('.column-switcher-item-btn-intro');
	for(var i=0;i<btn_intro.length;i++)
	{
		$(btn_intro[i]).css('top',i*20+(i)*8 + 'px');
	}
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
	columnSwitch(1);
}

function toCommunity()
{
	$("body").animate({scrollTop:$(".community").offset().top},500,'swing');
	columnSwitch(2);
}

function toGames()
{
	$("body").animate({scrollTop:$(".games").offset().top},500,'swing');
	columnSwitch(3);
}

function toFooter()
{
	$("body").animate({scrollTop:$(".footer").offset().top},500,'swing');
	columnSwitch(4);
}

function picMove()								
{
	/**************************          community栏图片移动逻辑start       *********************************/
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
	/**************************          community栏图片移动逻辑end       *********************************/

	/**************************          footer栏图片移动逻辑start       *********************************/
	$('.footer-pic5').mouseover(function(){
		$('.footer-pic4').stop().animate({'margin-left':'0px'},300,'swing');
		$('.footer-pic3').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic2').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic1').stop().animate({'margin-left':'-15.8%'},300,'swing');
	});
	$('.footer-pic4').mouseover(function(){
		$('.footer-pic4').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic3').stop().animate({'margin-left':'0px'},300,'swing');
		$('.footer-pic2').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic1').stop().animate({'margin-left':'-15.8%'},300,'swing');
	});
	$('.footer-pic3').mouseover(function(){
		$('.footer-pic4').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic3').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic2').stop().animate({'margin-left':'0px'},300,'swing');
		$('.footer-pic1').stop().animate({'margin-left':'-15.8%'},300,'swing');
	});
	$('.footer-pic2').mouseover(function(){
		$('.footer-pic4').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic3').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic2').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic1').stop().animate({'margin-left':'0px'},300,'swing');
	});
	$('.footer-pic1').mouseover(function(){
		$('.footer-pic4').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic3').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic2').stop().animate({'margin-left':'-15.8%'},300,'swing');
		$('.footer-pic1').stop().animate({'margin-left':'-15.8%'},300,'swing');
	});
	/**************************          footer栏图片移动逻辑end       *********************************/


}

function columnItemOnMouseOver()						
{
	var items = $('.column-switcher-item');
	for(var i=0;i<items.length;i++)
	{
		var $item = $(items[i]);
		$item.mouseover(function(){
			var index = $(this).attr('index');
			var btns = $('.column-switcher-item-btn');
			var intros = $('.column-switcher-item-btn-intro');
			for(var j=0;j<btns.length;j++)
			{
				if($(btns[j]).attr('index') == index)
				{
					$(btns[j]).stop().animate({'border-width':'7.5px'},100,'swing');
				}
			}
			for(var j=0;j<intros.length;j++)
			{
				if($(intros[j]).attr('index') == index)
				{
					$(intros[j]).css('visibility','visible');
				}
			}
		});
		$item.mouseout(function(){
			var index = $(this).attr('index');
			var btns = $('.column-switcher-item-btn');
			var intros = $('.column-switcher-item-btn-intro');
			for(var j=0;j<btns.length;j++)
			{
				if($(btns[j]).attr('index') == index)
				{
					$(btns[j]).stop().animate({'border-width':'4px'},100,'swing');
				}
			}
			for(var j=0;j<intros.length;j++)
			{
				if($(intros[j]).attr('index') == index)
				{
					$(intros[j]).css('visibility','hidden');
				}
			}
		});
		$item.on('click',function(){
			var index = $(this).attr('index');
			columnSwitch(index);
		});
	}
}

function columnSwitch(index)
{
	var btns = $('.column-switcher-item-btn');
	var current;
	var currentItem;
	for(var j=0;j<btns.length;j++)
	{
		if($(btns[j]).attr('class').indexOf('current') >= 0)
		{
			currentItem = $(btns[j]);
		}
	}
	for(var j=0;j<btns.length;j++)
	{
		if($(btns[j]).attr('index') == index)
		{
			$(btns[j]).stop().animate({'border-width':'9px'},200,'swing');
			currentItem.stop().animate({'border-width':'4px'},200,'swing');
			currentItem.removeClass('current');
			$(btns[j]).addClass('current');
		}
	}
	switch(index)
	{
		case '1':toHeader();break;
		case '2':toCommunity();break;
		case '3':toGames();break;
		case '4':toFooter();break;
		default:;
	}
}

function setPicHeight()					//为games里的图片设置高度，高度=宽度*1.6105
{
	for(var i=1;i<=21;i++)				//待修改
	{
		$('.rotate-pic'+i).css('height',$('.rotate-pic'+i).width()*1.6105);
	}
}

function setPic()						//设置games里的图片
{
	setPicHeight();
	$('.rotate-pic6').css('left',document.body.offsetWidth*0.5 - $('.rotate-pic6').width()*0.5);
	$('.rotate-pic6').css('top',$('.rotate-pic6').width()*0.4575);

	$('.rotate-pic5').css('left',parseFloat($('.rotate-pic6').css('left'))*0.7728 + 'px');
	$('.rotate-pic4').css('left',parseFloat($('.rotate-pic6').css('left'))*0.6755 + 'px');
	$('.rotate-pic3').css('left',parseFloat($('.rotate-pic6').css('left'))*0.6313 + 'px');
	$('.rotate-pic2').css('left',parseFloat($('.rotate-pic6').css('left'))*0.6071 + 'px');
	$('.rotate-pic1').css('left',parseFloat($('.rotate-pic6').css('left'))*0.5922 + 'px');

	for(var i=17;i<=21;i++)
	{
		$('.rotate-pic'+i).css('left',parseFloat($('.rotate-pic6').css('left'))*0.5922 + 'px');
		$('.rotate-pic'+i).css('top',parseFloat($('.rotate-pic6').css('top'))*2.7411);
	}

	for(var i=12;i<=16;i++)
	{
		$('.rotate-pic'+i).css('right',parseFloat($('.rotate-pic6').css('left'))*0.5922 + 'px');
		$('.rotate-pic'+i).css('top',parseFloat($('.rotate-pic6').css('top'))*2.7411);
	}

	$('.rotate-pic7').css('right',parseFloat($('.rotate-pic6').css('left'))*0.7728 + 'px');
	$('.rotate-pic8').css('right',parseFloat($('.rotate-pic6').css('left'))*0.6755 + 'px');
	$('.rotate-pic9').css('right',parseFloat($('.rotate-pic6').css('left'))*0.6313 + 'px');
	$('.rotate-pic10').css('right',parseFloat($('.rotate-pic6').css('left'))*0.6071 + 'px');
	$('.rotate-pic11').css('right',parseFloat($('.rotate-pic6').css('left'))*0.5922 + 'px');

	$('.rotate-pic5').css('top',parseFloat($('.rotate-pic6').css('top'))*1.3927);
	$('.rotate-pic4').css('top',parseFloat($('.rotate-pic6').css('top'))*1.9329);
	$('.rotate-pic3').css('top',parseFloat($('.rotate-pic6').css('top'))*2.3088);
	$('.rotate-pic2').css('top',parseFloat($('.rotate-pic6').css('top'))*2.5124);
	$('.rotate-pic1').css('top',parseFloat($('.rotate-pic6').css('top'))*2.7411);

	$('.rotate-pic7').css('top',parseFloat($('.rotate-pic6').css('top'))*1.3927);
	$('.rotate-pic8').css('top',parseFloat($('.rotate-pic6').css('top'))*1.9329);
	$('.rotate-pic9').css('top',parseFloat($('.rotate-pic6').css('top'))*2.3088);
	$('.rotate-pic10').css('top',parseFloat($('.rotate-pic6').css('top'))*2.5124);
	$('.rotate-pic11').css('top',parseFloat($('.rotate-pic6').css('top'))*2.7411);
}

function rightRotate(subIndex)						//games里图片右转,只转一格
{
	if(!$("[index=rotate6]").is(":animated"))
	{
		for(var i=1;i<=21;i++)
		{
			if(i > 6 && i<=10)
			{
				$("[index=rotate"+i+"]").animate({
					'width':$('.rotate-pic'+(i+subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i+subIndex)).height()+'px',
					'right':$('.rotate-pic'+(i+subIndex)).css('right'),
					'top':$('.rotate-pic'+(i+subIndex)).css('top')
				},300,'swing');
			}
			else if(i==6)
			{										
				$(".rotate-pic"+i).animate({
					'width':$('.rotate-pic'+(i+subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i+subIndex)).height()+'px',
					'left':$('.rotate-pic'+(i+subIndex)).css('left'),
					'right':$('.rotate-pic'+(i+subIndex)).css('right'),
					'top':$('.rotate-pic'+(i+subIndex)).css('top')
				},300,'swing');
			}
			else if(i<6)
			{
				$("[index=rotate"+i+"]").animate({
					'width':$('.rotate-pic'+(i+subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i+subIndex)).height()+'px',
					'left':$('.rotate-pic'+(i+subIndex)).css('left'),
					'top':$('.rotate-pic'+(i+subIndex)).css('top')
				},300,'swing');
			}
			else if(i>=11)
			{
				$("[index=rotate"+i+"]").animate({
					'width':$('.rotate-pic'+(i+subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i+subIndex)).height()+'px',
					'left':$('.rotate-pic'+(i+subIndex)).css('left'),
					'top':$('.rotate-pic'+(i+subIndex)).css('top')
				},300,'swing');
			}
		}
		for(var i=-1;i<=12;i++)
		{
			$("[index=rotate"+i+"]").css('z-index',$('.rotate-pic'+(i+subIndex)).css('z-index'));
		}
	}
}

function leftRotate(subIndex)						//games里图片左转,只转一格
{
	if(!$("[index=rotate6]").is(":animated"))
	{
		for(var i=12;i>=2;i--)
		{
			if(i > 6)
			{
				$("[index=rotate"+i+"]").animate({
					'width':$('.rotate-pic'+(i-subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i-subIndex)).height()+'px',
					'right':$('.rotate-pic'+(i-subIndex)).css('right'),
					'top':$('.rotate-pic'+(i-subIndex)).css('top')
				},300,'swing');
			}
			else if(i==6)
			{
				$("[index=rotate"+i+"]").animate({
					'width':$('.rotate-pic'+(i-subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i-subIndex)).height()+'px',
					'left':$('.rotate-pic'+(i-subIndex)).css('left'),
					'right':$('.rotate-pic'+(i-subIndex)).css('right'),
					'top':$('.rotate-pic'+(i-subIndex)).css('top')
				},300,'swing');
			}
			else if(i<6)
			{
				$("[index=rotate"+i+"]").animate({
					'width':$('.rotate-pic'+(i-subIndex)).width()+'px',
					'height':$('.rotate-pic'+(i-subIndex)).height()+'px',
					'left':$('.rotate-pic'+(i-subIndex)).css('left'),
					'top':$('.rotate-pic'+(i-subIndex)).css('top')
				},300,'swing');
			}
		}
		for(var i=12;i>=2;i--)
		{
			$("[index=rotate"+i+"]").css('z-index',$('.rotate-pic'+(i-subIndex)).css('z-index'));
		}
	}
}

function getRotatePosition(index)			//获取点击的图片与最中间图片的距离，大于0为左边的图片
{
	var imgs = $('.games-wrapper img');
	for(var i=0;i<imgs.length;i++)
	{
		if($(imgs[i]).css('z-index') == 60)		//获取最中间的图片
		{
			var currentMid = parseFloat($(imgs[i]).attr('index').substring(6));
			console.log(currentMid);
		}
	}
	var n = index.substring(6);
	return currentMid-n;
}

function picRotate()						//games里图片旋转逻辑
{
	for(var i=-1;i<=12;i++)
	{	
		$(".rotate-pic"+i).on('click',function(){
		//	console.log(11111111111111111);
			var subIndex = getRotatePosition($(this).attr('index'));
			if(subIndex > 0)
			{
				rightRotate(subIndex);
			}
			else if(subIndex < 0)
			{
				leftRotate(-subIndex);
			}
		});
	}
}