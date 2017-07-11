# G3  API

[1 前言](#1-前言)

[2 使用方法](#2-使用方法)

[2.1 获取元素](#21-获取元素)

[2.2 获取数据](#22-获取数据)

[2.3 绘制图表](#23-绘制图表)

[2.4 注册地图](#24-注册地图)

[2.5 查看数据](#25-查看数据)

[2.6 清空当前实例](#26-清空当前实例)

[2.7 添加事件](#27-添加事件)

[2.8 解绑事件](#28-解绑事件)








## 1 前言
#### 需要的文件

G3.js

chartData.json

echarts.js
## 2 使用方法
### 2.1 获取元素
### G3(ID) 获取DOM
##### 获取DOM:必须通过 ID来获取DOM对象
##### 示例：
```javascript
G3('Bar')
```

### 2.2 获取数据
##### 获取数据：用于获取json、接口等数据，目前同步加载适合较小的数据请求
#####  支持两种格式：

getData(object) 

getData(url, type, async) 


### getData(object) 获取数据
object 为图表模板的json对象
##### 示例：
```javascript
import chartData from '../../../Public/data/json/chartData.json'
//画图表的写法
G3('bar').getData(chartData.Bar).drawChart()
```
##### 解释：
`chartData.json`  存放图表模板的json文件，

`Bar` 为json中图表的键值名，具体文件格式见下方
### getData(url, type, async) 获取数据

url 为模板数据的路径（字符串）

type 所需要用到的json对象键值名

async 是否开启异步，默认false同步
##### 示例：
```javascript
G3('Bar').getData('./DATA/chartData.json', 'Bar')
```
##### 解释：
`Bar` 为图表模板中对应的图表名称 (可以自己修改，只要和模板中对应即可)，

`chartData.json`  存放图表模板的json文件代码格式如下：
```javascript
{
"Bar": {
    "title": {
      "text": "单柱图--Bar",
      "left": "center",
      "y": "10"
    },
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
      }
    },
    "grid": {
      "left": "3%",
      "right": "4%",
      "bottom": "3%",
      "containLabel": true
    },
    "xAxis": [
      {
        "type": "category",
        "data": [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        "axisTick": {
          "alignWithLabel": true
        }
      }
    ],
    "yAxis": [
      {
        "type": "value"
      }
    ],
    "series": [
      {
        "name": "直接访问",
        "type": "bar",
        "barWidth": "auto",
        "data": [
          10,
          52,
          200,
          334,
          390,
          330,
          220
        ]
      }
    ]
  }
}
```
##### `chartData.json` 现在已有的图表类型：
##### 柱图----------------------------------------------Bar

##### 折线图--------------------------------------------Line

##### 饼图----------------------------------------------Pie        

##### 折柱混合图----------------------------------------BarLine

##### 折柱混合图自定义---------------------------------BarLineCustomize

##### 象型柱图-----------------------------------------PictorialBar

##### 象型柱图自定义----------------------------------PictorialBarCustomize

##### 散点图-------------------------------------------Scatter

##### 雷达图-------------------------------------------Radar

##### 雷达图自定义------------------------------------RadarCustomize

##### 热力图-------------------------------------------HeatMap

##### 关系图-------------------------------------------Graph

##### 关系图环形图-------------------------------------GraphCircular

##### 地图示例----------------------------------------Map

##### 散点地图----------------------------------------MapScatter

##### 飞线散点地图------------------------------------MapLinesScatter

##### 玫瑰图-----------------------------------------PieRose

##### 南丁格尔图-------------------------------------PieHalfRose

##### 不指定类型的关系图-----------------------------GraphNone

##### 力导向关系图----------------------------------GraphForce

##### 水球图----------------------------------------LiquidFill

##### 极坐标系下的堆叠柱状图（径向轴）-----------BarRadiusPolar

##### 极坐标系下的堆叠柱状图（角度轴）----------BarRadiusPolar

##### 极坐标双数值轴折线图-----------------------PolarLine

##### 坐标轴上的热力图----------------------------HeatMapAxis

### 2.3 绘制图表
### drawChart(object) 绘制图表
#### 绘制图表：支持画图、新增属性、删除属性、修改属性
##### drawChart(object)，其中object多为json格式对象，格式参考getData()说明
##### 画图：根据getData()返回的数据直接绘制图形
##### 示例：
```javascript
//画图
G3('Bar').getData('./DATA/chartData.json', 'Bar').drawChart()
```
##### 新增属性：如果模板中不存在的直接添加
##### 示例:
```javascript
//如果模板中不存在的直接添加
G3('Bar').getData('./DATA/chartData.json', 'Bar').drawChart({
    title: {
        text: '我并不存在于json中'
    }
});
```
##### 删除属性：模板中不需要的属性用 null 置空，进行删除
##### 示例：
```javascript
//如删除 图表的  visualMap 属性
G3('PieRose').getData('./DATA/chartData.json', 'PieRose').drawChart({
    visualMap:null
});
```
##### 修改属性：将模板中已经存在的属性进行修改
##### 示例：
```javascript
//对模板中legend属性进行修改
G3('Bar').getData('./DATA/chartData.json', 'Bar').drawChart({
    legend: {
        data: ['bar', 'bar2', 'bar3', 'bar4']
    }
});
```
##### 示例：
```javascript
//多组数据，不改变模板内容，只使用模板的第一组
 G3('Line').getData('./DATA/chartData.json', 'Line').drawChart({
        series: [{},null]
 });
```
```javascript
//多组数据，改变模板内容,不使用的用null置空
G3('Line').getData('./DATA/chartData.json', 'Line').drawChart({
        series: [{
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
        }, null]
});
```

### 2.4 注册地图
### loginMap(url, type) 注册地图
url  地图的json数据  如：china.json,henan.json

type 地图的名称   如:china,henan
##### 示例：
```javascript
//中国地图
G3('Map').loginMap('./DATA/Map_China.json', 'china').getData('./DATA/chartData.json', 'Map').drawChart();
```
 
### 2.5 查看数据
### test() 在控制台查看option
##### [ 注意 ] 目前只支持在 getdata 和 drawchart 后面，调用 test() 会在控制台输出 ：
  
  `自定义option`
   
  `原始模板`
   
  `自定义option与原始模板合并后的`
  
  ##### 示例：
  ```javascript
 G3('Bar').getData('./DATA/chartData.json', 'Bar').drawChart().test();
  ```
### 2.6 清空当前实例
### clear() 清空当前实例
#### 清空当前实例，会移除实例中所有的组件和图表
##### 示例：
  ```javascript
 G3('Bar').clear()
  ```


### 2.7 添加事件
### on(event,callback) 添加事件
event 鼠标事件

callback 回调函数

##### 添加单击事件
示例：
```javascript
//清除原图形，绘画新图形，绑定单击事件调用指定方法 
var testEvent = function(e){
    alert(e.name)
}
G3('Bar').on('click', function(e){
    G3('Bar').clear().getData('./DATA/chartData.json', 'BarLine').drawChart().on('click',testEvent);
});

```

### 2.8 解绑事件
### off(event,callback) 解绑事件
event 鼠标事件

callback 回调函数

#### 解绑事件 
示例：
```javascript
//清除原图形，绘画新图形，解绑单击事件 
var testEvent = function(e){
    alert(e.name)
}
G3('Bar').on('click', function(e){
    G3('Bar').clear().getData('./DATA/chartData.json', 'BarLine').drawChart().off('click');
});
```
#### 解绑事件并调用指定方法
示例：
```javascript
//清除原图形，绘画新图形，解绑单击事件调用指定方法 
var testEvent = function(e){
    alert(e.name)
}
G3('Bar').on('click', function(e){
    G3('Bar').clear().getData('./DATA/chartData.json', 'BarLine').drawChart().off('click',testEvent);
});
```




