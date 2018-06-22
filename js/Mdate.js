(function () {
    var d = document;
    var includeCss = function (url) {
        var link = d.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        d.getElementsByTagName("head")[0].appendChild(link)
    };
    includeCss("css/Mdate.css");
    var dateopts = {
        beginYear: 2000,
        beginMonth: 1,
        endYear: new Date().getFullYear(),
        endMonth: new Date().getMonth() + 1,
        format: "YMD"
    };
    var MdSelectId = "";
    var MdAcceptId = "";
    var dateContentBox = "";
    var datePlugs = "";
    var yearTag = "";
    var monthTag = "";
    var indexY = 1;
    var indexM = 1;
    var initM = null;
    var yearScroll = null;
    var monthScroll = null;
    var Mdate = function (el, opts) {
        if (!opts) {
            opts = {}
        }
        this.id = el;
        this.selectorId = d.getElementById(this.id);
        this.acceptId = d.getElementById(opts.acceptId) || d.getElementById(this.id);
        this.beginYear = opts.beginYear || dateopts.beginYear;
        this.beginMonth = opts.beginMonth || dateopts.beginMonth;
    
        this.endYear = opts.endYear || dateopts.endYear;
        this.endMonth = opts.endMonth || dateopts.endMonth;
        this.format = opts.format || dateopts.format;
        this.dateBoxShow()
    };
    Mdate.prototype = {
        constructor: Mdate,
        dateBoxShow: function () {
            var that = this;
            that.selectorId.onclick = function () {
                that.createDateBox();
                that.dateSure()
            }
        },
        createDateBox: function () {
            var that = this;
            MdatePlugin = d.getElementById("MdatePlugin");
            if (!MdatePlugin) {
                dateContentBox = d.createElement("div");
                dateContentBox.id = "MdatePlugin";
                d.body.appendChild(dateContentBox);
                MdatePlugin = d.getElementById("MdatePlugin")
            }
            MdatePlugin.setAttribute("class", "slideIn");
            that.createDateUi();
            var yearUl = d.getElementById("yearUl");
            var monthUl = d.getElementById("monthUl");
    
            yearUl.innerHTML = that.createDateYMD("year");
            that.initScroll();
            that.refreshScroll()
        },
        createDateUi: function () {
            var str = "" + '<section class="getDateBg"></section>' + '<section class="getDateBox" id="getDateBox">' + '<div class="choiceDateTitle">' + '<button id="dateCancel">取消</button>' + '<button id="dateSure" class="fr">确定</button>' + "</div>" + '<div class="dateContent">' + '<div class="checkeDate"></div>' + '<div id="yearwrapper">' + '<ul id="yearUl"></ul>' + "</div>" + '<div id="monthwrapper">' + '<ul id="monthUl"></ul>' + "</div>" +  "</div>" + "</section>";
            MdatePlugin.innerHTML = str
        },
        createDateYMD: function (type) {
            var that = this;
            var str = "<li>&nbsp;</li>";
            var beginNum = null,
                endNum = null,
                unitName = "年",
                dataStyle = "data-year";
            if (type == "year") {
                beginNum = that.beginYear;
                endNum = that.endYear
            }
            if (type == "month") {
                unitName = "月";
                dataStyle = "data-month";
                beginNum = that.beginMonth;
                endNum = 12;
                if (yearTag != that.beginYear) {
                    beginNum = 1
                }
                if (yearTag == dateopts.endYear) {
                    endNum = that.endMonth
                }
            }
           
            for (var i = beginNum; i <= endNum; i++) {
                str += "<li " + dataStyle + "=" + i + ">" + that.dateForTen(i) + unitName + "</li>"
            }
            return str + "<li>&nbsp;</li>"
        },
        initScroll: function () {
            var that = this;
            yearScroll = new iScroll("yearwrapper", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    indexY = Math.ceil(this.y / 40 * -1 + 1);
                    yearTag = yearUl.getElementsByTagName("li")[indexY].getAttribute("data-year");
                    monthUl.innerHTML = that.createDateYMD("month");
                    monthScroll.refresh();
                    try {
                        monthTag = monthUl.getElementsByTagName("li")[indexM].getAttribute("data-month")
                    } catch (err) {
                        return true
                    }
                   
                   
                }
            });
            monthScroll = new iScroll("monthwrapper", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    indexM = Math.ceil(this.y / 40 * -1 + 1);
                    if (indexM == 1 && yearTag != that.beginYear) {
                        monthTag = 1
                    } else {
                        monthTag = monthUl.getElementsByTagName("li")[indexM].getAttribute("data-month")
                    }
                 
                }
            });
            
        },
        refreshScroll: function () {
            var that = this;
            var inputYear = that.acceptId.getAttribute("data-year");
            var inputMonth = that.acceptId.getAttribute("data-month");
            inputYear = inputYear || that.beginYear;
            inputMonth = inputMonth || that.beginMonth;
            initM = that.beginMonth;
            if (inputYear != that.beginYear && initM != 1) {
                initM = 1
            }
            
            inputYear -= that.beginYear;
            inputMonth -= initM;
            yearScroll.refresh();
            yearScroll.scrollTo(0, inputYear * 40, 300, true);
            monthScroll.scrollTo(0, inputMonth * 40, 300, true);
        },
        dateSure: function () {
            var that = this;
            var sureBtn = d.getElementById("dateSure");
            var cancelBtn = d.getElementById("dateCancel");
            sureBtn.onclick = function () {
            	var chnNumChar = ["","一","二","三","四","五","六","七","八","九","十","十一","十二"];
            	var yue = document.getElementById("yue");
            	yue.innerHTML=monthTag + "月";
            	var yue1 = document.getElementsByClassName("yue");
            	for(var i =0;i<yue1.length;i++){
            		yue1[i].innerHTML= chnNumChar[monthTag]+"月";
            	}
                if (that.format == "YMD") {
                    that.acceptId.value = yearTag + "年" + monthTag + "月"
                } else {
                    that.acceptId.value = yearTag + that.format + that.dateForTen(monthTag)
                }
                that.acceptId.setAttribute("data-year", yearTag);
                that.acceptId.setAttribute("data-month", monthTag);
                that.dateCancel()
            };
            cancelBtn.onclick = function () {
                that.dateCancel()
            }
        },
        dateForTen: function (n) {
            if (n < 10) {
                return "0" + n
            } else {
                return n
            }
        },
        dateCancel: function () {
            MdatePlugin.setAttribute("class", "slideOut");
            setTimeout(function () {
                MdatePlugin.innerHTML = ""
            }, 400)
        }
    };
    if (typeof exports !== "undefined") {
        exports.Mdate = Mdate
    } else {
        window.Mdate = Mdate
    }
})();