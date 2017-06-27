/**
 * Created by admin on 2017/6/14.
 */
//L吃的多，M喝的多，W笑点低三大特性
var G3 = function (e) {
    this.e = e;
    return new G3.fn.init(this.e);
};
G3.fn = G3.prototype = {
    constructor: G3,
    init: function (e) {
        this.e = e;
        this.queryDom(this.e);
        this.myChart = echarts.init(this.dom);
        return this;
    },
    clear: function () {
        this.myChart.clear();
        return this;
    },
    queryDom: function (e) {
        this.e = e;
        this.dom = document.getElementById(this.e);
        if (!this.dom) {
            console.log("你可能访问了一个假的DOM对象:" + this.e);
            return;
        }
    },
    loginMap: function (type, data) {
        this.type = type;
        if (!this.xmlhttp) {
            this.data = data;
        } else {
            this.data = this.xmlhttp;
        }
        this.echarts = echarts.registerMap(this.type, this.data);
        return this;
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
            // this.opt = this.xmlhttp;
            this.opt = opt;
            for (let i in this.opt) {
                //进行键值判断如果不存在直接添加
                if (typeof this.xmlhttp[i] === 'undefined') {
                    this.xmlhttp[i] = this.opt[i];
                } else if (this.opt[i].length >= 0 && this.xmlhttp[i].length >= 0) {
                    //当是两者都是数组的时候，对数组索引进行遍历
                    for (let k = 0; k < this.opt[i].length; k++) {
                        //对数组中每个键值
                        //当获取到数组制空时，将制空后的模型数组删除
                        if (this.opt[i][k] == 'null' || this.opt[i][k] === null) {
                            this.xmlhttp[i].splice(this.opt[i].indexOf(this.opt[i][k]));
                            console.log(this.xmlhttp[i])
                        }
                        for (let o in this.opt[i][k]) {
                            if (typeof this.xmlhttp[i][k] === 'undefined') {
                                this.xmlhttp[i][k] = this.opt[i][k];
                            } else {
                                this.xmlhttp[i][k][o] = this.opt[i][k][o];
                            }
                        }
                    }
                } else if (typeof this.opt[i].length === 'undefined' && this.xmlhttp[i].length >= 0) {
                    //自身是对象属性，模板是数组时
                    this.xmlhttp[i].splice(1);
                    for (let j in this.opt[i]) {
                        this.xmlhttp[i][0][j] = this.opt[i][j];
                    }

                    console.log(i, this.opt[i]);
                } else {
                    //替换已经存在的
                    for (let j in this.opt[i]) {
                        this.xmlhttp[i][j] = this.opt[i][j];
                    }
                }
                console.log('=========================')
            }
            this.myChart.setOption(this.xmlhttp);
        }
        return this;
    },
    /*
     * 获取数据方式
     * url获取地址，type制定获取的类别
     * async为异步方式，true为异步，false为同步
     * */
    getData: function (url, series, async) {
        //console.log(arguments.length);
        var xmlhttp;
        this.url = url;
        this.series = series;
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
                console.log('数据请求成功');
            } else {
                console.warn('数据请求失败');
                return;
            }
            switch (typeof this.series) {
                case'undefined':
                    this.xmlhttp = JSON.parse(xmlhttp.responseText);
                    break;
                default :
                    //收尾去掉空格
                    switch (this.series.trim()) {
                        case '':
                            this.xmlhttp = JSON.parse(xmlhttp.responseText);
                            break;
                        default :
                            this.xmlhttp = JSON.parse(xmlhttp.responseText)[this.series];
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
                            this.xmlhttp = JSON.parse(xmlhttp.responseText);
                            break;
                        default :
                            //收尾去掉空格
                            switch (this.series.trim()) {
                                case '':
                                    this.xmlhttp = JSON.parse(xmlhttp.responseText);
                                    break;
                                default :
                                    this.xmlhttp = JSON.parse(xmlhttp.responseText)[this.series];
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

        return this
    }, test: function () {
        console.log(this.xmlhttp);
    }
};
G3.fn.init.prototype = G3.fn;
