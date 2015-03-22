//  tab切换
var zClick = 'ontouchstart' in document ? 'tap' : 'click';
$('[data-tab-href]').bind(zClick,function(){
    var id = $(this).data('tab-href').slice(1);
    $('[data-tab-href],[data-tab-id]').removeClass('cur');
    $(this).addClass('cur');
    $('[data-tab-id='+ id +']').addClass('cur');
})

// 返回顶部
$('.backTop').bind(zClick,function(){
    $('html,body').animate({scrollTop:0},700)
    $(window).scrollTop(0)
})
$(window).scroll(function(){
    //获取窗口的滚动条的垂直位置
    var s = $(window).scrollTop();
    //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
    if( s > 100){
	$(".backTop").show();
    }else{
	$(".backTop").hide();
    };
});

