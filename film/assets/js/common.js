//  tab�л�
var zClick = 'ontouchstart' in document ? 'tap' : 'click';
$('[data-tab-href]').bind(zClick,function(){
    var id = $(this).data('tab-href').slice(1);
    $('[data-tab-href],[data-tab-id]').removeClass('cur');
    $(this).addClass('cur');
    $('[data-tab-id='+ id +']').addClass('cur');
})

// ���ض���
$('.backTop').bind(zClick,function(){
    $('html,body').animate({scrollTop:0},700)
    $(window).scrollTop(0)
})
$(window).scroll(function(){
    //��ȡ���ڵĹ������Ĵ�ֱλ��
    var s = $(window).scrollTop();
    //�����ڵĹ������Ĵ�ֱλ�ô���ҳ�����С�߶�ʱ���÷��ض���Ԫ�ؽ��֣�������
    if( s > 100){
	$(".backTop").show();
    }else{
	$(".backTop").hide();
    };
});

