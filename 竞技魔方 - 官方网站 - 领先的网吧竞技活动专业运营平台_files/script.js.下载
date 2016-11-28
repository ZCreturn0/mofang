/**
 * Created by qiyi on 2016/1/12.
 */
$(document).ready(function() {
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'anchors': ['page1', 'page2', 'page3', 'page4'],
        'loopHorizontal': false,
        controlArrows: false,
        'controlArrowColor': '#000',
        'navigation': true,
        'navigationPosition': 'left',
        'navigationColor': '#333',
        'navigationTooltips': ['首页','资讯','活动','功能'],
        'afterSlideLoad': function(anchorLink,index,slideIndex,direction){
            $('.page1_nav li').eq(slideIndex).addClass('active').siblings().removeClass('active');
        }
    });
    $('.page1_nav li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.page2_con>div.fl').on('mouseover',function(){
        $(this).stop().animate({
            'width': '428px'
        },300);
        $(this).siblings().stop().animate({
            'width': '200px'
        },300);
    });
    $('.page4-con>div.fl').on('mouseover',function(){
        $(this).stop().animate({
            'width': '614px'
        },300);
        $(this).siblings().stop().animate({
            'width': '200px'
        },300);
    });
    $('.up').on('click',function(){
        $.fn.fullpage.moveSectionUp();
    });
    $('.down').on('click',function(){
        $.fn.fullpage.moveSectionDown();
    });
    $('.openView').on('click',function(){
        window.open("/2016");
    })
});