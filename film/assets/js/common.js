//  tab切换
var zClick = 'ontouchstart' in document ? 'tap' : 'click';
$('[data-tab-href]').bind(zClick,function(){
    var id = $(this).data('tab-href').slice(1);
    $('[data-tab-href],[data-tab-id]').removeClass('cur');
    $(this).addClass('cur');
    $('[data-tab-id='+ id +']').addClass('cur');
    typeof tabChange=='function' &&  tabChange(id);
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


// suggestion
$('#search').bind('keyup',function(e){
	e.stopPropagation();
    var v = $.trim($(this).val());
    if(v){
        $('#suggestion').show();
    }else{
        $('#suggestion').hide();
    }
	
})
$('#search').bind(zClick,function(e){
	e.stopPropagation();
	var v = $.trim($(this).val());
    if(v){
        $('#suggestion').show();
    }else{
        $('#suggestion').hide();
    }
})


$(document).bind(zClick,function(e){
	$('#suggestion').hide();
})

// 7天趋势
function trend(ec){
    // 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('main'));

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: (function(){
                   var arr = [];
                   //var d = {name:tit, textStyle:{color:colors[0]}}
                   arr.push(tit)
                   return arr;
            })(),
            itemWidth:13,
            itemHeight:13,
            x:'right',
            y:15
        },
        color:colors,
        grid:{
            x:80,
            y:40,
            x2:60,
            y2:40
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    lineStyle:{color:'#0091cb',width:1}
                },
                splitLine:{lineStyle:{color:['#f0f0f0']}},
                data : data_x1
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{lineStyle:{color:['#f0f0f0']}},
                axisLine:{lineStyle:{color:'#0091cb',width:1}}
            }
        ],
        series : [
            {
                "name":tit,
                "type":"line",
                symbol:'emptyCircle',
                symbolSize:4,
                "data": data_y1[0]
            }
        ]
    };
    // 为echarts对象加载数据
    myChart.setOption(option);

    // 对比
    $('#compare1').bind(zClick,function(e){
        var tar = e.target, $tar = $(tar), $li, $em, idx;
        if(!$tar.closest('li').length){return false}
        $li = $tar.closest('li');
        $em = $li.find('em');
        idx = $li.index();
        var val = $li.text();
        var legend = myChart.chart['line'].component.legend;
        if($li.hasClass('cur')){
            $li.removeClass('cur');
            $em.css({'background-color':''})
            legend.setSelected(val,false);
        }else{
            $li.addClass('cur');
            $em.css({'background-color':colors[idx+1]})

            var added = false,len;
            len = option.series.length;
            while (len--) {
                if (option.series[len].name == val) {
                    // 已经添加
                    added = true;
                    break;
                }
            }
            if(!added){
                option.series.push({
                    "name": val,
                    "type":"line",
                    'symbol':'emptyCircle',
                    'symbolSize':4,
                    "data": data_y1[idx+1]
                })
                myChart.setOption(option);
            }else{
                legend.setSelected(val,true);
            }
        }
    })
}

// 渠道分布
function channel(){
    var option1 = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: (function(){
                   var arr = [];
                   //var d = {name:tit, textStyle:{color:colors[0]}}
                   arr.push(tit)
                   return arr;
            })(),
            itemWidth:13,
            itemHeight:13,
            x:'right',
            y:15
        },
        color:colors,
        grid:{
            x:40,
            y:40,
            x2:40,
            y2:40
        },
        xAxis : [
            {
                type : 'category',
                axisLine:{
                    lineStyle:{color:'#0091cb',width:1}
                },
                splitLine:{lineStyle:{color:['#f0f0f0']}},
                data : data_x2
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{lineStyle:{color:['#f0f0f0']}},
                axisLine:{lineStyle:{color:'#0091cb',width:1}}
            }
        ],
        series : [
            {
                name:tit,
                type:'bar',
                data:[42.0, 14.9, 7.0, 23.2, 25.6, 1.7],
                barGap:'4',
                barCategoryGap:'30%',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                }
            }
        ]
    };

    var myChartBar= require('echarts').init(document.getElementById('main2')).setOption(option1);
    myChartBar.setOption(option1);

    // 对比
    $('#compare2').bind(zClick,function(e){
        var tar = e.target, $tar = $(tar), $li, $em, idx;
        if(!$tar.closest('li').length){return false}
        $li = $tar.closest('li');
        $em = $li.find('em');
        idx = $li.index();
        var val = $li.text();
        var legend = myChartBar.chart['bar'].component.legend;
        if($li.hasClass('cur')){
            $li.removeClass('cur');
            $em.css({'background-color':''})
            legend.setSelected(val,false);
        }else{
            $li.addClass('cur');
            $em.css({'background-color':colors[idx+1]})

            var added = false,len;
            len = option1.series.length;
            while (len--) {
                if (option1.series[len].name == val) {
                    // 已经添加
                    added = true;
                    break;
                }
            }
            if(!added){
                option1.series.push({
                    "name": val,
                    "type":"bar",
                    'symbol':'emptyCircle',
                    'symbolSize':4,
                    "data": data_y2[idx+1],
                    'markPoint' : {
                        data : [
                            {type : 'max', name: '最大值'}
                        ]
                    }
                })
                myChartBar.setOption(option1);
            }else{
                legend.setSelected(val,true);
            }
        }
    })
}

// tab切换初始化charts
var flagInit = false;
function tabChange(id){
    if(id=='list2'){
        if(!flagInit){
            // 为echarts对象加载数据
            channel();
            flagInit = true;
        }
    }
}
