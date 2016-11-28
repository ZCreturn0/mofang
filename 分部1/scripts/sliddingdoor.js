// JavaScript Document

var done = false;

window.onload=function(){

	var box = document.getElementById("container");
	
	var imgs = box.getElementsByTagName("img");
	
	var wid = imgs[0].offsetWidth;
	
	var expose = 200;
	
	var boxWidth = wid + (imgs.length-1)* expose;
	
	box.style.width = boxWidth + 'px';
	
	function setInitPos()
	{
		imgs[0].style.left = 0 + 'px';
		for(var i = 1;i < imgs.length;i++)
		{
			imgs[i].style.left = wid + (i-1) * expose + 'px';
		}
	}
	setInitPos();
	
	var moveDis = wid - expose;

	imgs[0].onmouseover = function()
	{
		setInitPos();			
	};
	
	for(var i = 0; i < imgs.length ; i++)
	{
		(function(i)
		{
			imgs[i].onmouseover = function()
			{
				move(imgs,moveDis,i,wid,expose);			
			};
		})(i);	
	}

	function move(imgs,moveDis,i,wid,expose)
	{
		var dis = 10;
		var curDis = 0;
		var imagesMove = [false,false,false,false,false,false,false,false,false];
		for(var j = 1; j < imgs.length; j++)
		{
		//	console.log(wid+"+"+"("+j+"-1)*"+expose);
		//	console.log(parseInt(imgs[j].style.left));
			if(j <= i)
			{
				if(parseInt(imgs[j].style.left,10) - parseInt(imgs[0].style.left,10) > expose*j)
				{
					imagesMove[j] = true;
				}
			}
			else
			{
				if(parseInt(imgs[j].style.left,10) - parseInt(imgs[0].style.left,10) == expose*j)
				{
					imagesMove[j] = true;
				}
			}
		//	console.log(imagesMove[j]);			
		}
		if(done)
		{
			setInterval(function(){
				for(var j = 1; j < imgs.length; j++)
				{	
					if(imagesMove[j])
					{
						if(j <= i)
						{
							if(curDis < moveDis)
							{
								if(moveDis - curDis > 10)
								{
									if(parseInt(imgs[j].style.left,10) - parseInt(imgs[0].style.left,10) > expose*j)			//防止前一张图片移动未完成时鼠标移动到下一张图片引起图片位移错误
									{
										imgs[j].style.left = parseInt(imgs[j].style.left,10) - dis + 'px';
										console.log(j+">"+parseInt(imgs[j].style.left,10));
									}
								}
								else
								{
									if(parseInt(imgs[j].style.left,10) - parseInt(imgs[0].style.left,10) > expose*j)
									{
										imgs[j].style.left = parseInt(imgs[j].style.left,10) - (moveDis - curDis) + 'px';
										console.log(j+"<"+parseInt(imgs[j].style.left,10));
									}
								}
							}
						}
						else
						{
							if(moveDis - curDis > 10)
							{
								if(parseInt(imgs[j].style.left,10) - parseInt(imgs[0].style.left,10) < wid + expose*(j-1))			//防止前一张图片移动未完成时鼠标移动到下一张图片引起图片位移错误
								{
									imgs[j].style.left = parseInt(imgs[j].style.left,10) + dis + 'px';
								}
								console.log(j+">>"+parseInt(imgs[j].style.left,10));
							}
							else
							{
								if(parseInt(imgs[j].style.left,10) - parseInt(imgs[0].style.left,10) < wid + expose*(j-1))
								{
									imgs[j].style.left = parseInt(imgs[j].style.left,10) + (moveDis - curDis)  + 'px';
								}
								console.log(j+"><"+parseInt(imgs[j].style.left,10));
							}
						}
					}
					if(j == imgs.length-1)
					{
						if(moveDis - curDis > 10)
						{
							curDis += dis;
						}
						else
						{
							curDis += (moveDis - curDis);
							done = true;
						}
					}			
				}			
			},10);
		}
	}
	

};