/**
 * Created by admin on 2017/6/13.
 */
$(function () {
    var testEvent = function (e) {
        alert(e.name)
    }
    var chartDataBar = G3('Bar').getData('./DATA/chartData.json', 'Bar').xmlhttp;
    G3('Bar').getData(chartDataBar).drawChart({
        title: {
            text: '我并不存在于json中'
        },
        legend: {
            data: ['bar', 'bar2', 'bar3', 'bar4']
        }
    });
    G3('Bar').on('click', function (e) {
        //清除原图形，绘画新图形，绑定事件调用指定方法
        G3('Bar').clear().getData('./DATA/chartData.json', 'Pie').drawChart().on('click', testEvent);
        //清除原图形，绘画新图形，解绑事件调用指定方法
        /*    G3('Bar').clear().getData('./DATA/chartData.json', 'BarLine').drawChart().off('click',testEvent);
         //清除原图形，绘画新图形，解绑事件
         G3('Bar').clear().getData('./DATA/chartData.json', 'BarLine').drawChart().off('click');*/
    });
    G3('Bar2').getData('./DATA/chartData.json', 'Bar').drawChart({
        title: {
            text: '我并不存在于json中'
        },
        tooltip: {
            trigger: 'item',
            showDelay: '500',
            formatter: "我是G3：{a} <br/>{b} : {c}"
        }, xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
        , series: [{
            barWidth: '30%',
            data: [320, 332, 301, 334, 390, 330, 320]
        }, {
            name: '第二访问',
            type: 'bar',
            barWidth: '30%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }]
    });

    //线图
    var series1 = [{
        "name": "邮件营销",
        "type": "line",
        "stack": "总量",
        "areaStyle": {
            "normal": {}
        },
        "data": [
            1120,
            132,
            101,
            134,
            90,
            230,
            210
        ]
    }]
    var series2 = [{
        "name": "视频广告",
        "type": "line",
        "stack": "总量",
        "areaStyle": {
            "normal": {}
        },
        "data": [
            150,
            232,
            201,
            154,
            190,
            330,
            410
        ]
    }]
    G3('Line').getData('./DATA/chartData.json', 'Line').drawChart({
        series: [series1, series2, null]
    });
    //折柱混合
    G3('BarLine').getData('./DATA/chartData.json', 'BarLine').drawChart(
        {
            yAxis: [{
                "axisLabel": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }],
            series: [{}, {}, {
                yAxisIndex: 1
            }]
        }
    );
    //象型柱图
    G3('PictorialBar').getData('./DATA/chartData.json', 'PictorialBar').drawChart();
    //象型柱图自定义（电诈小人图）
    G3('PictorialBarCustomize').getData('./DATA/chartData.json', 'PictorialBarCustomize').drawChart();
    //散点
    G3('Scatter').getData('./DATA/chartData.json', 'Scatter').drawChart();
    //雷达图
    G3('Radar').getData('./DATA/chartData.json', 'Radar').drawChart();
    //雷达图自定义（两个雷达图）
    G3('RadarCustomize').getData('./DATA/chartData.json', 'RadarCustomize').drawChart();

    // 热力图
    var mapData = G3('Map').getData('./DATA/Mapjson/province/shanxi.json').xmlhttp
    G3('HeatMap').loginMap(mapData, 'shanxi').getData('./DATA/chartData.json', 'HeatMap').drawChart();
    // 坐标轴上的热力图
    G3('HeatMapAxis').getData('./DATA/chartData.json', 'HeatMapAxis').drawChart();


    // 最简单关系图
    G3('Graph').getData('./DATA/chartData.json', 'Graph').drawChart({
        "series": [{
            "links": [{
                "source": "节点3",
                "target": "节点4"
            }, {
                "source": "节点1",
                "target": "节点2"
            }]
        }]
    });
    //关系图-环形图(layout:circular)
    G3('GraphCircular').getData('./DATA/chartData.json', 'GraphCircular').drawChart();
    //关系图-没有定义是环形图还是力导向图(layout:none)
    G3('GraphNone').getData('./DATA/chartData.json', 'GraphNone').drawChart();
    //关系图-力导向图
    G3('GraphForce').getData('./DATA/chartData.json', 'GraphForce').drawChart();


    //地图（最简单的地图示例）

    //     G3('Map').getData('./DATA/Map_China.json').loginMap('china').getData('./DATA/chartData.json', 'Map').drawChart();
    G3('Map').loginMap('./DATA/Mapjson/province/shanxi.json', 'shanxi').getData('./DATA/chartData.json', 'Map').drawChart();

    // 飞线散点地图
    G3('MapLinesScatter').loginMap('./DATA/Mapjson/china.json', 'china').getData('./DATA/chartData.json', 'MapLinesScatter').drawChart();
    // 散点地图
    G3('MapScatter').loginMap('./DATA/Mapjson/china.json', 'china').getData('./DATA/chartData.json', 'MapScatter').drawChart();


    // 饼图
    G3('Pie').getData('./DATA/chartData.json', 'Pie').drawChart();
    // 玫瑰图
    G3('PieRose').getData('./DATA/chartData.json', 'PieRose').drawChart({
        visualMap: null
    });
    // 一部分的南丁格尔图
    G3('PieHalfRose').getData('./DATA/chartData.json', 'PieHalfRose').drawChart();

    // 极坐标系下的堆叠柱状图 径向轴为数据轴的
    G3('BarRadiusPolar').getData('./DATA/chartData.json', 'BarRadiusPolar').drawChart();
    // 极坐标系下的堆叠柱状图 角度轴为数据轴的
    G3('BarAnglePolar').getData('./DATA/chartData.json', 'BarAnglePolar').drawChart();
    // 极坐标 折线图
    G3('PolarLine').getData('./DATA/chartData.json', 'PolarLine').drawChart();

    // 水球图
    G3('LiquidFill').getData('./DATA/chartData.json', 'LiquidFill').drawChart();
    var testEvent = function (e) {
        alert(e.name)
    }
    G3('LiquidFill').on('click', function (e) {
        G3('LiquidFill').clear().getData('./DATA/chartData.json', 'Bar').drawChart().on('click', testEvent);
    });
});







