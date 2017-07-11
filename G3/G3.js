/**
 * Created by admin on 2017/6/14.
 */
//L吃的多，M喝的多，W笑点低三大特性
var G3 = function (e) {
    return new G3.fn.init(e);
};
G3.fn = G3.prototype = {
    constructor: G3,
    init: function (e) {
        this.e = e;
        this[0] = document.getElementById(e);
        if (!this[0]) {
            console.log("你可能访问了一个假的DOM对象:" + this.e);
            return;
        }
        this.myChart = echarts.init(this[0]);
        this.length = 0;
        return this;
    },
    length: 0,
    push: [].push,
    splice: [].splice
};
G3.fn.init.prototype = G3.fn;
G3.extend = G3.fn.extend = function () {
    var i = 1, len = arguments.length, target = arguments[0], j;
    //如果是一个参数，则为当前对象拓展方法
    if (i == len) {
        target = this;
        i--;
    }
    //遍历拓展对象
    for (; i < len; i++) {
        for (j in arguments[i]) {
            target[j] = arguments[i][j]
        }
    }
    return target;
};
G3.fn.extend({
    clear: function () {
        //清除所有事件
        if (!this.event) {
            this.myChart.off(this.event, this.callback);
        }
        this.myChart.clear();
        return this;
    },
    loginMap: function (url, type, data) {
        if (typeof url === "string") {
            this.mapData = this.urlData(url);
        } else {
            this.mapData = url;
        }
        this.mapType = type;

        this.echarts = echarts.registerMap(this.mapType, this.mapData);
        return this;
    }, formatChart: function (opt, dataOpt) {
        this.opt = opt;
        this.dataOpt = dataOpt;
        for (let i in this.opt) {
            //进行键值判断如果不存在直接添加
            if (this.opt[i] == null || this.opt[i] == 'null') {
                delete this.dataOpt[i];
            }
            //当模板不存在该属性时
            if (typeof this.dataOpt[i] === 'undefined') {
                this.dataOpt[i] = this.opt[i];
                //} else if (this.opt[i].length >= 0 && this.dataOpt[i].length >= 0) {
            } else if (this.opt[i] instanceof Array === true) {
                //当是两者都是数组的时候，对数组索引进行遍历
                for (let k = 0; k < this.opt[i].length; k++) {
                    //当数组第一位为数组时候
                    if (this.opt[i][k] instanceof Array) {
                        this.opt[i][k] = JSON.stringify(this.opt[i][k]);
                        console.log(this.opt[i][k]);
                        console.log(this.opt[i][k].length);
                        this.opt[i][k] = this.opt[i][k].slice(1,this.opt[i][k].length-1);
                        this.opt[i][k] = JSON.parse(this.opt[i][k]);
                        console.log(this.opt[i][k]);

                    }
                    //对数组中每个键值
                    //当获取到数组制空时，将制空后的模型数组删除
                    if (this.opt[i][k] == 'null' || this.opt[i][k] === null) {
                        this.dataOpt[i].splice(this.opt[i].indexOf(this.opt[i][k]));
                    }
                    for (let o in this.opt[i][k]) {
                        if (typeof this.dataOpt[i][k] === 'undefined') {
                            this.dataOpt[i][k] = this.opt[i][k];
                        } else {
                            if (typeof this.dataOpt[i][k] === "string" && typeof this.opt[i][k] === "string") {
                                this.dataOpt[i] = this.opt[i];
                            } else {
                                this.dataOpt[i][k][o] = this.opt[i][k][o];
                            }
                        }
                    }
                }
            } else if (typeof this.opt[i].length === 'undefined' && this.dataOpt[i].length >= 0) {
                //自身是对象属性，模板是数组时
                this.dataOpt[i].splice(1);
                for (let j in this.opt[i]) {
                    this.dataOpt[i][0][j] = this.opt[i][j];
                }
            } else {
                //替换已经存在的
                for (let j in this.opt[i]) {
                    this.dataOpt[i][j] = this.opt[i][j];
                }
            }
        }
        //当地图存在的时候
        if (this.mapType) {
            //修改series geo
            for (let i in this.dataOpt) {
                switch (i) {
                    case 'series':
                        for (let k in this.dataOpt[i]) {
                            for (let o in this.dataOpt[i][k]) {
                                switch (o) {
                                    case 'mapType':
                                        this.dataOpt[i][k][o] = this.mapType;
                                        break;
                                }
                            }
                        }
                        break;
                    case 'geo':
                        for (let k in this.dataOpt[i]) {
                            switch (k) {
                                case 'map':
                                    this.dataOpt[i][k] = this.mapType;
                                    break;
                            }
                        }
                        break;

                }
            }

        }
        return dataOpt
    },
    /*
     * 绘画图表方法
     * opt为echart option
     * 如果调用getData，可免去调用
     * */
    drawChart: function (opt) {
        if (!this.xmlhttp) {
            this.opt = opt;
            this.myChart.setOption(this.opt);
        } else {
            this.myChart.setOption(this.formatChart(opt, this.xmlhttp));
        }
        return this;
    },
    on: function (event, callback) {
        this.event = event;
        this.callback = callback;
        this.myChart.on(this.event, this.callback);
        return this;
    },
    off: function (event, callback) {
        this.event = event;
        this.callback = callback;
        this.myChart.off(this.event, this.callback);
        return this;
    },
    urlData: function (url, type, async) {
        var xmlhttp, xmlhttpData;
        this.url = url;
        this.series = type;
        this.async = async;
        //没有传入参数的时，报错
        if (arguments.length < 1) {
            console.warn('getData方法需要传参且url数据的请求地址为必填');
            return;
        }
        ;

        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //判断异步传输或是同步传输true异步，false同步
        if (typeof this.async === 'string') {
            this.async = this.async.trim();
        }
        if (typeof this.async === 'undefined' || this.async === false || this.async === '' || this.async === 'false') {
            this.async = false;
            xmlhttp.open("GET", this.url, this.async);
            xmlhttp.send();
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //console.log('数据请求成功');
            } else {
                console.warn('数据请求失败');
                return;
            }
            switch (typeof this.series) {
                case'undefined':
                    xmlhttpData = JSON.parse(xmlhttp.responseText);
                    break;
                default :
                    //收尾去掉空格
                    switch (this.series.trim()) {
                        case '':
                            xmlhttpData = JSON.parse(xmlhttp.responseText);
                            break;
                        default :
                            xmlhttpData = JSON.parse(xmlhttp.responseText)[this.series];
                            break;
                    }

            }
        } else {
            this.async = true;
            xmlhttp.open("GET", this.url, this.async);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(series);
                    switch (typeof this.series) {
                        case'undefined':
                            xmlhttpData = JSON.parse(xmlhttp.responseText);
                            break;
                        default :
                            //收尾去掉空格
                            switch (this.series.trim()) {
                                case '':
                                    xmlhttpData = JSON.parse(xmlhttp.responseText);
                                    break;
                                default :
                                    xmlhttpData = JSON.parse(xmlhttp.responseText)[this.series];
                                    break;
                            }

                    }
                    ;
                } else {
                    console.warn('数据请求失败');
                    return;
                }
            };
            xmlhttp.send();

        }
        return xmlhttpData;
    },
    /*
     * 获取数据方式
     * url获取地址，type制定获取的类别
     * async为异步方式，true为异步，false为同步
     * */
    getData: function (url, type, async) {
        //当第一个变量是字符串时候，用ajax和获取数据
        if (typeof url === "string") {
            this.xmlhttp = this.urlData(url, type, async);
        } else {
            this.xmlhttp = url;
        }
        return this
    },
    testGet: function () {
        this.para = document.createElement("div");
        this.node = document.createTextNode("点击后在控制台查看option");
        this.para.style.position = "absolute";
        this.para.style.top = "0";
        this.para.style.right = "0";
        this.para.appendChild(this.node);
        this[0].appendChild(this.para);
        return this
    },
    test: function () {
        //console.clear();
        console.warn("这是对象", this.e, "自定义option");
        console.table(this.opt);
        console.log(this.opt);
        console.groupEnd();
        console.warn("这是对象", this.e, "模板");
        var testGet = this.getData(this.url, this.series);
        console.table(testGet.xmlhttp);
        console.log(testGet.xmlhttp);
        console.groupEnd();
        console.warn("这是对象", this.e, "自定义与模板合并后的");
        console.table(this.dataOpt);
        console.log(this.dataOpt);
        console.groupEnd();
        return this;
    }
});
window.G3 = G3;