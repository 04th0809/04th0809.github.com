//  tab�л�
var zClick = 'ontouchstart' in document ? 'tap' : 'click';
$('[data-tab-href]').bind(zClick,function(){
    var id = $(this).data('tab-href').slice(1);
    $('[data-tab-href],[data-tab-id]').removeClass('cur');
    $(this).addClass('cur');
    $('[data-tab-id='+ id +']').addClass('cur');
    typeof tabChange=='function' &&  tabChange(id);
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


// suggestion
$('#search').bind('keyup',function(e){
    var v = $.trim($(this).val());
    if(v){
        $('#suggestion').show();
    }else{
        $('#suggestion').hide();
    }
})


// ·������
require.config({
    paths: {
        echarts: './assets/js'
    }
});

// ʹ��
require(
    [
        'echarts',
        'echarts/chart/line', // ʹ����״ͼ�ͼ���barģ�飬�������
        'echarts/chart/bar'
    ],
    function (ec) {
        trend(ec)
    }
);

// 7������
function trend(ec){
    // ����׼���õ�dom����ʼ��echartsͼ��
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
    // Ϊecharts�����������
    myChart.setOption(option);

    // �Ա�
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
                    // �Ѿ����
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

// �����ֲ�
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
                        {type : 'max', name: '���ֵ'}
                    ]
                }
            }
        ]
    };

    var myChartBar= require('echarts').init(document.getElementById('main2')).setOption(option1);
    myChartBar.setOption(option1);

    // �Ա�
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
                    // �Ѿ����
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
                            {type : 'max', name: '���ֵ'}
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

// tab�л���ʼ��charts
var flagInit = false;
function tabChange(id){
    if(id=='list2'){
        if(!flagInit){
            // Ϊecharts�����������
            channel();
            flagInit = true;
        }
    }
}
