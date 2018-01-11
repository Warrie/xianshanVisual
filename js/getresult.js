//questionaireID 3 民生性问卷 qID 50-61 +13
//questionaireID 4 经济性问卷 qID 78-89 +13
//opID                    321- 326((i-50)*6+321-(i-50)*6+326) 
//                        495- 500((i-78))
//interviewwID sex age education company_town untiProperty

//getAnswer 第一次加载的
// function getshowdata(qnaierID, qID){
// 	var getshowdata_data = [];
// 	$.ajax({
// 		url : "/IntelligentDecision-web/answer/getAnswer.do",
// 		data : {
// 			questionnaireID : qnaierID,
// 			questionID : qID
// 		},
// 		type : 'POST',
// 		dataType : 'json',
// 		async : false,
// 		success : function(rs) {
//             console.log("rs=="+rs);
//             //category:[null, "一般", "不清楚", "不满意", "比较不满意", "比较满意", "满意"]
//             //series:[{name: "数量", type: "line", data: [0, 282, 11, 11, 17, 654, 376]}]
// 			var len = rs.category.length;
//             console.log("len===="+len);
// 			for (var i = 0; i < len; ++i) {
// 				var names = rs.category[i];
// 				var values = rs.series[0].data[i];
// 				if (names){
// 					getshowdata_data.push({
// 						'name' : names,
// 						'value' : values,
// 					});
//
// 				}
// 			}
//
// 		},
// 		error : function() {
// 			alert('数据加载失败...');
// 		}
// 	});
// 	var p =getshowdata_data;
//     console.log("getshowdata_data=="+getshowdata_data);
// 	return p;
// }

// getshowdata(4,78);
//
// getshowdataT(4,78,"东陈乡");

//得到点击城镇后的大类数据
function getshowdataT(qnaierID, qID, townsname){
	var getshowdata_data = [];
	$.ajax({
//		beforeSend:function(){
//			d3.select("#maploadhide").style('background','#000').style('z-index', '100');
//			$("#maploadhide").html('loading...');
//			},
		url : "/IntelligentDecision-web/answer/getTownsAnswer01.do",
		data : {
			questionnaireID : qnaierID,
			questionID : qID,
			towns : townsname
		},
		type : 'POST',
		dataType : 'json',
		async : false,
		success : function(rs) {
//			category:["不满意", "比较不满意", "一般", "不清楚", "比较满意", "满意"]
//			series:[{name: "数量", type: "line", data: [0, 0, 10, 2, 61, 10]}]
			var len = rs.category.length;
			for (var i = 0; i < len; ++i) {
				var names = rs.category[i];
				var values = rs.series[0].data[i];
				if (names){
					getshowdata_data.push({
						'name' : names,
						'value' : values,
					});
					
				}
			}

		},
		error : function() {
			alert('数据加载失败...');
		}
	});
	var p =getshowdata_data;
	return p;
}


//得到点击城镇后的大类数据
// function getshowdataT(qnaierID, qID, townsname, p){
// 	var getshowdata_data = [];
//
// 	function ajax(){
// 		var def = $.Deferred();
// 		$.ajax({
// 			url : "/IntelligentDecision-web/answer/getTownsAnswer01.do",
// 			data : {
// 				questionnaireID : qnaierID,
// 				questionID : qID,
// 				towns : townsname
// 			},
// 			type : 'POST',
// 			dataType : 'json',
// 			success : function(rs) {
// 				var len = rs.category.length;
// 				for (var i = 0; i < len; ++i) {
// 					var names = rs.category[i];
// 					var values = rs.series[0].data[i];
// 					if (names){
// 						getshowdata_data.push({
// 							'name' : names,
//
// 							'value' : values,
// 						});
// 					}
// 				}
// 				def.resolve();
// 			},
// 			error : function() {
// 				alert('数据加载失败...');
// 			}
// 		});
// 		return def;
// 	}
//
//
// 	$.when(ajax()).done(function(){
// 		 p = getshowdata_data;
// 	});
//
// }

//满意这个选项
// getshowdataT2(4,78,496,"东陈乡");
//
// function getshowdataT2(qnaierID, qID, opID, townsname){
// 	var getshowdata_data = [];
// 	$.ajax({
// 		url : "/IntelligentDecision-web/answer/getTownsAnswer2.do",
// 		data : {
// 			questionnaireID : qnaierID,
// 			questionID : qID,
// 			optionID : opID,
// 			towns : townsname
// 		},
// 		type : 'POST',
// 		dataType : 'json',
// 		async : false,
// 		success : function(rs) {
// //			category:["一般", "不清楚", "不满意", "比较不满意", "比较满意", "满意"]
// //			series:[{name: "数量", type: "line", data: [0, 0, 0, 0, 0, 0]}]
// 			var len = rs.category.length;
// 			for (var i = 0; i < len; ++i) {
// 				var names = rs.category[i];
// 				var values = rs.series[0].data[i];
// 				if (names){
// 					getshowdata_data.push({
// 						'name' : names,
// 						'value' : values,
// 					});
//
// 				}
// 			}
//
// 		},
// 		error : function() {
// 			alert('数据加载失败...');
// 		}
// 	});
// 	var p =getshowdata_data;
// 	return p;
// }


// getshowdataT002(4,78,"东陈乡");
// function getshowdataT002(qnaierID, qID, townsname){
// 	var getshowdata_data = [];
// 	$.ajax({
// 		url : "/IntelligentDecision-web/answer/getTownsAnswer002.do",
// 		data : {
// 			questionnaireID : qnaierID,
// 			questionID : qID,
// 			towns : townsname
// 		},
// 		type : 'POST',
// 		dataType : 'json',
// 		async : false,
// 		success : function(rs) {
// 			var len = rs.category.length;
// 			for (var i = 0; i < len; ++i) {
// 				var names = rs.category[i];
// 				var values = rs.series[0].data[i];
// 				if (names){
// 					getshowdata_data.push({
// 						'name' : names,
// 						'value' : values,
// 					});
//
// 				}
// 			}
//
// 		},
// 		error : function() {
// 			alert('数据加载失败...');
// 		}
// 	});
// 	var p =getshowdata_data;
// 	return p;
// }


// function getshowdataT002(qnaierID, qID, townsname, p){
// 	var getshowdata_data = [];
//
// 	function ajax(){
// 		var def = $.Deferred();
// 		$.ajax({
// 			url : "/IntelligentDecision-web/answer/getTownsAnswer002.do",
// 			data : {
// 				questionnaireID : qnaierID,
// 				questionID : qID,
// 				towns : townsname
// 			},
// 			type : 'POST',
// 			dataType : 'json',
// 			success : function(rs) {
// 				var len = rs.category.length;
// 				for (var i = 0; i < len; ++i) {
// 					var names = rs.category[i];
// 					var values = rs.series[0].data[i];
// 					if (names){
// 						getshowdata_data.push({
// 							'name' : names,
// 							'value' : values,
// 						});
//
// 					}
// 				}
//
// 			},
// 			error : function() {
// 				alert('数据加载失败...');
// 			}
// 		});
// 		return def;
// 	}
//
//
// 	$.when(ajax()).done(function(){
// 		p = getshowdata_data;
// 	});
//
// }

// getshowdata2(4,78,495);

//getAnswer2 点击满意块出来对二类的选择

// function getshowdata2(qnaierID, qID, opID){
// 	var getshowdata_data = [];
// 	$.ajax({
// 		url : "/IntelligentDecision-web/answer/getAnswer2.do",
// 		data : {
// 			questionnaireID : qnaierID,
// 			questionID : qID,
// 			optionID : opID,
// 		},
// 		type : 'POST',
// 		dataType : 'json',
// 		async : false,
// 		success : function(rs) {
// //			category
// //			:
// //			["一般", "不清楚", "不满意", "比较不满意", "比较满意", "满意"]
// //			legend
// //			:
// //			[]
// //			series
// //			:
// //			[{name: "数量", type: "line", data: [0, 0, 0, 0, 0, 0]}]
// 			var len = rs.category.length;
// 			for (var i = 0; i < len; ++i) {
// 				var names = rs.category[i];
// 				var values = rs.series[0].data[i];
// 				if (names){
// 					getshowdata_data.push({
// 						'name' : names,
// 						'value' : values,
// 					});
//
// 				}
// 			}
//
// 		},
// 		error : function() {
// 			alert('数据加载失败...');
// 		}
// 	});
// 	var p =getshowdata_data;
// 	return p;
// }


// getdep2(4,78,"age");

//getdep2(4,78,"sex");
//年龄等选项
//attimePART===0 $(this).val()===incomeOfyear
function getdep2(qnaierID, qID, ageoption){
	var getshowdata_data = [];
	$.ajax({
		url : "/IntelligentDecision-web/answer/getAnswer3.do",
		data : {
			questionnaireID : qnaierID,
			questionID : qID,
			option : ageoption,
		},
		type : 'POST',
		dataType : 'json',
		async : false,
		success : function(rs) {
            console.log(111111111111);
            console.log(rs);
			var len = rs.category.length;
//            console.log(len);
			for (var i = 0; i < len; ++i) {
				var names = rs.category[i];
				var option = rs.legend[i];
				var values = rs.series[0].data[i];
				if (names){
					getshowdata_data.push({
						'name' : names,
						'ageoption' : option,
						'value' : values,
					});
					
				}
			}

		},
		error : function() {
			alert('数据加载失败...');
		}
	});
	var p =getshowdata_data;
	return p;
}


// getdep2T(4,78,'age','东陈乡');
function getdep2T(qnaierID, qID, ageoption, townsname){
	var getshowdata_data = [];
	$.ajax({
		url : "/IntelligentDecision-web/answer/getTownsAnswer3.do",
		data : {
			questionnaireID : qnaierID,
			questionID : qID,
			option : ageoption,
			towns : townsname
		},
		type : 'POST',
		dataType : 'json',
		async : false,
		success : function(rs) {
			console.log(222222222222222);
			console.log(rs);
			var len = rs.category.length;
			for (var i = 0; i < len; ++i) {
				var names = rs.category[i];
				var option = rs.legend[i];
				var values = rs.series[0].data[i];
				if (names){
					getshowdata_data.push({
						'name' : names,
						'ageoption' : option,
						'value' : values,
					});
					
				}
			}

		},
		error : function() {
			alert('数据加载失败...');
		}
	});
	var p =getshowdata_data;
	return p;
}

