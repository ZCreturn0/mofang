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

/**************************图片定位数据**********************************/
/*
						  宽% %		  高%

77.03*124.06    0.356    	1.6105		0.085		13.689
91.22*146.92    0.422   	1.6105		0.100		16.105
111.34*179.34	0.515		1.6105		0.123		19.809
141.14*227.34   0.652         	1.6105		0.155		24.963
184.11*296.53   0.851   	1.6105		0.203		32.693
216.33*348.44     1		1.6105		0.238		38.330
		
318*394

216.33/1298    16.66%

left:
321.276		0.5922
329.374		0.6071
342.455		0.6313
366.473		0.6755
419.217		0.7728
542.497


top:
271.286		2.7411
253.604		2.5624
228.502		2.3088
191.301		1.9329
137.833		1.3927
98.97		0.4575

216.33

1298
*/
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

var subIndex = 0;						

function picAnimate(pic,animateTime,index,k,dir)		//index:当前图片index
{													//k运行动画的次数
//	console.log("k="+k)
	var everyAnimateTime = parseFloat(animateTime)/subIndex;
	subIndex = Math.abs(subIndex);
	if(k==subIndex)
	{
//		console.log('over')
		return;
	}
//	console.log(pic)
//	console.log(getOffsetPos(index+1))
	if(dir>0)
	{
		pic.animate({
			'width':$('.rotate-pic'+getOffsetPos(index+1)).width()+'px',
			'height':$('.rotate-pic'+getOffsetPos(index+1)).height()+'px',
			'right':$('.rotate-pic'+getOffsetPos(index+1)).css('right'),
			'left':$('.rotate-pic'+getOffsetPos(index+1)).css('left'),
			'top':$('.rotate-pic'+getOffsetPos(index+1)).css('top')
		},everyAnimateTime,'swing',function(){picAnimate(pic,animateTime,index,k+1,dir)});
	}
	else
	{
		pic.animate({
			'width':$('.rotate-pic'+getOffsetPos(index-1)).width()+'px',
			'height':$('.rotate-pic'+getOffsetPos(index-1)).height()+'px',
			'right':$('.rotate-pic'+getOffsetPos(index-1)).css('right'),
			'left':$('.rotate-pic'+getOffsetPos(index-1)).css('left'),
			'top':$('.rotate-pic'+getOffsetPos(index-1)).css('top')
		},everyAnimateTime,'swing',function(){picAnimate(pic,animateTime,index,k+1,dir)});
	}
}

function getOffsetPos(n)
{
	if(n>=0)
	{
		return (n%21) == 0?21:(n%21);
	}
	else
	{
		return 21+n;
	}
}

function getLeftPicIndex()						//获取最左边的图片index
{
	for(var i=1;i<=21;i++)
	{
		if($(".rotate-pic"+i).css('z-index') == 5)
		{
			return i;
		}
	}
}

function getRightPicIndex()						//获取最右边的图片index
{
	for(var i=1;i<=21;i++)
	{
		if($(".rotate-pic"+i).css('z-index') == 50)
		{
			return i;
		}
	}
}

function setZIndex(dir)
{
	var leftPicIndex = getLeftPicIndex();
	var rightPicIndex = getRightPicIndex();
//	console.log(leftPicIndex)
	var left_n_PicIndex = [];
	var right_n_PicIndex = [];
	if(dir > 0)
	{
		for(var i=0;i<subIndex;i++)
		{
			left_n_PicIndex[i] = $('.rotate-pic'+getOffsetPos(leftPicIndex - subIndex + i )).css('z-index');
		}
		for(var i=0;i<21;i++)
		{
			var c = getOffsetPos(leftPicIndex + i - subIndex);
			console.log("i="+i);
			if(i >= (21 - subIndex))
			{
				$(".rotate-pic"+c).css('z-index',left_n_PicIndex[i - (21 - subIndex)]);
			}
			else
			{
				$(".rotate-pic"+c).css('z-index',$('.rotate-pic'+getOffsetPos(c + subIndex)).css('z-index'));
			}
			console.log(".rotate-pic"+c+":"+$('.rotate-pic'+c).css('z-index'));
		}
	}
	else
	{
		for(var i=0;i<subIndex;i++)
		{
			right_n_PicIndex[i] = $('.rotate-pic'+getOffsetPos(rightPicIndex + subIndex + i )).css('z-index');
		}
		for(var i=0;i<21;i++)
		{
			var c = getOffsetPos(rightPicIndex + i + subIndex);
		//	console.log("i="+i);
			if(i >= (21 - subIndex))
			{
				$(".rotate-pic"+c).css('z-index',right_n_PicIndex[i - (21 - subIndex)]);
			}
			else
			{
				$(".rotate-pic"+c).css('z-index',$('.rotate-pic'+getOffsetPos(c - subIndex)).css('z-index'));
			}
		//	console.log(".rotate-pic"+c+":"+$('.rotate-pic'+c).css('z-index'));
		}
	}
}

function rotate(subIndex,dir)
{
	if(!$("[index=rotate6]").is(":animated"))
	{
		var currentMid = getMidIndex();
		var animateTime = 300;
		for(var i=1;i<=21;i++)				
		{
			var offsetPos = getOffsetPos(i + currentMid);
			picAnimate($(".rotate-pic"+i),animateTime,i,0,dir);
		}
	}
	setZIndex(dir);
}

function rightRotate(subIndex)						
{
	if(!$("[index=rotate6]").is(":animated"))
	{
		var currentMid = getMidIndex();
		var animateTime = 300;
		for(var i=1;i<=21;i++)				
		{
			var offsetPos = getOffsetPos(i + currentMid);
			picAnimate($(".rotate-pic"+i),animateTime,i,0);
		}
	}
	setZIndex();
}

function leftRotate(subIndex)						
{
	if(!$("[index=rotate6]").is(":animated"))
	{
		var currentMid = getMidIndex();
		var animateTime = 300;
		for(var i=1;i<=21;i++)				
		{
			var offsetPos = getOffsetPos(i + currentMid);
			picAnimate($(".rotate-pic"+i),animateTime,i,0);
		}
	}
	setZIndex();
}

function getMidIndex()
{
	var imgs = $('.games-wrapper img');
	for(var i=0;i<imgs.length;i++)
	{
		if($(imgs[i]).css('z-index') == 600)		//获取最中间的图片
		{
			var currentMid = parseFloat($(imgs[i]).attr('index').substring(6));
			return currentMid;
		}
	}
}

function getRotatePosition(index)			//获取点击的图片与最中间图片的距离
{
	var imgs = $('.games-wrapper img');
	var currentMid = getMidIndex();
	var n = index.substring(6);
//	console.log(currentMid+","+n+","+getOffsetPos(currentMid-n));
	if(Math.abs(currentMid-n) < 10)
	{
		return -(currentMid-n);
	}
	else
	{
		return getOffsetPos(currentMid-n);
	}
}

function picRotate()						//games里图片旋转逻辑
{
	if(!$("[index=rotate6]").is(":animated"))
	{
		for(var i=1;i<=21;i++)
		{	
			$(".rotate-pic"+i).on('click',function(){
			//	console.log(11111111111111111);
				clickIndex = $(this).attr('index');				//点击图片的index
			//	console.log(clickIndex)
				subIndex = getRotatePosition(clickIndex);
				console.log(subIndex);
				if(subIndex > 0)
				{
					rotate(subIndex,1);
				}
				else if(subIndex < 0)
				{
					rotate(-subIndex,-1);
				}
			});
		}
	}
	else
	{
		for(var i=1;i<=21;i++)
		{	
			$(".rotate-pic"+i).unbind('click');
		}
	}
}