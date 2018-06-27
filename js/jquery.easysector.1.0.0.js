﻿/*!
 * 饼状图
 * EasySector(jQuery Plugin)
 * version: 1.0.0
 * Copyright (c) 2016 HoverTree
 * http://hovertree.com
 * http://hovertree.com/texiao/easysector/
 */
(function($) {
	$.fn.easysector = function(options) {

		var settings = $.extend({
			h_borderColor: "transparent", //边框颜色
			h_backColor: "transparent", //背景演示
			h_width: "auto", //宽度
			h_height: "auto", //高度
			h_Radii: "120", //饼图半径
			h_poindlength: 2, //百分数小数点后长度
			h_recwidth: "15", //方框边长
			h_showamount: false,
			h_title: "EasySector Graphics",
			h_titlesize: 20, //标题大小
			h_infosize: 12, //信息文字大小
			h_items: [{
				"h_title": "easysector",
				"h_amount": 369,
				"h_color": "red"
			}, {
				"h_title": "yestop",
				"h_amount": 88,
				"h_color": "green"
			}, {
				"h_title": "hovertree",
				"h_amount": 168,
				"h_color": "yellow"
			}, {
				"h_title": "hoverclock",
				"h_amount": 126,
				"h_color": "blue"
			}]
		}, options);

		var h_easysector = $(this);
		if(h_easysector.length < 1)
			return;

		h_easysector.attr("class", "easysector");

		var h_easyWidth = settings.h_width;
		if(h_easyWidth < settings.h_Radii * 2)
			h_easyWidth = settings.h_Radii * 2;
		h_easysector.css({
			"width": h_easyWidth,
			"padding-top": "1.7rem",
			"border-top": "dashed 1px " + settings.h_borderColor,
			"background-color": settings.h_backColor,
			"text-align": "center"
		});

		$('<canvas class="easycanvas"></canvas>').appendTo(h_easysector);

		var h_easycanvas = h_easysector.find(".easycanvas");
		h_easycanvas.attr("width", settings.h_Radii * 2)
		h_easycanvas.attr("height", settings.h_Radii * 2)

		var t_easycanvas = h_easycanvas[0];

		//对象，圆心x坐标，圆心y坐标，半径，开始弧度，结束弧度，颜色
		function DrawSector(hvtcontext, x, y, radius, start_angle, end_angle, color) {
			//开始绘制路径
			hvtcontext.beginPath();
			//画出弧线
			hvtcontext.arc(x, y, radius, start_angle, end_angle, false);
			//画出结束半径
			hvtcontext.lineTo(x, y);
			hvtcontext.fillStyle = color;
			//填充
			hvtcontext.fill();
			//			hvtcontext.stroke();
			return end_angle;
		}

		var h_easyCtx = t_easycanvas.getContext("2d");
		var h_currentStartAngle = 0;
		var h_itemCount = settings.h_items.length;

		//Amount All
		var h_totalAmount = 0;
		for(var i = 0; i < h_itemCount; i++) {
			h_totalAmount = h_totalAmount + settings.h_items[i].h_amount;
		}
		//percent
		if(h_totalAmount == 0) {
			for(var i = 0; i < h_itemCount; i++) {
				$.extend(settings.h_items[i], {
					"h_percent": 0
				});
			}
			//对象，圆心x坐标，圆心y坐标，半径，开始弧度，结束弧度，颜色
			h_currentStartAngle = DrawSector(h_easyCtx, settings.h_Radii, settings.h_Radii, settings.h_Radii, 0, 2 * Math.PI, "#f2f2f2")
		} else {
			for(var i = 0; i < h_itemCount; i++) {
				$.extend(settings.h_items[i], {
					"h_percent": (settings.h_items[i].h_amount / h_totalAmount)
				});
			}
			if(h_easyCtx) {
				//Draw Sector
				for(var i = 0; i < h_itemCount; i++) {
					h_currentStartAngle = DrawSector(h_easyCtx, settings.h_Radii, settings.h_Radii, settings.h_Radii, h_currentStartAngle, settings.h_items[i].h_percent * 2 * Math.PI + h_currentStartAngle, settings.h_items[i].h_color)
				}
			} else {
				return;
			}
		}

		//h_currentStartAngle = DrawSector(h_easyCtx, settings.h_Radii, settings.h_Radii, settings.h_Radii, 0, 2 * Math.PI, "#ccc");
		//中间小圆
		h_currentStartAngle = DrawSector(h_easyCtx, settings.h_Radii, settings.h_Radii, settings.h_Radii / 3, 0, 2 * Math.PI, "white");
		//Info
		var h_infoeasysector = $('<div class="row" ><ul class="easysectorinfo" style="margin-bottom: 0px;"></ul></div>');
		h_infoeasysector.css({
			"list-style": "none",
			"padding": "0px",
			"margin-top": "1rem",
			"margin-left": "1rem",
			"margin-right": "1rem",
			"text-align": "center",
			"font-size": settings.h_infosize
		})
		h_easycanvas.after(h_infoeasysector);
		for(var i = 0; i < h_itemCount; i++) {
			var h_lihtml = '<li class="easysectorli col-xs-4"><div style="background-color:' + settings.h_items[i].h_color +
				';width:' + settings.h_recwidth + 'px;height:' + settings.h_recwidth + 'px;display:inline-block;margin:0rem auto;border-radius: .4rem;"></div>' +
				'<p style="color:' + settings.h_items[i].h_color + ';">' + settings.h_items[i].h_title + (settings.h_items[i].h_percent * 100).toFixed(settings.h_poindlength) + '%</p> '
			if(settings.h_showamount) {
				h_lihtml = h_lihtml + '<span>' + settings.h_items[i].h_amount + '</span> '
			}
			h_lihtml = h_lihtml + '</li>';
			var h_li = $(h_lihtml);
			if(i == 0) {
				h_infoeasysector.append(h_li);
			} else {
				h_infoeasysector.find(".easysectorli:last").after(h_li);
			}
		}

	}
}(jQuery));