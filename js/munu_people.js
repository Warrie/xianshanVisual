/**
 * Created by Administrator on 2017/3/8/008.
 */


// var data = [
//     {name:'公共教育',	value:  82.40, '2016':86.77},
//     {name:'就业与社会保险',	value:	80.67, '2016':70},
//     {name:'医疗卫生', value:  78.85, '2016':81.40},
//     {name:'民政服务',	     value:	80.28, '2016':84.68},
//     {name:'住房保障'	,	 value:  76.45, '2016':79.51},
//     {name:'文化惠民',	value:	78.13, '2016':83.76},
//     {name:'平安象山',	value:	81.93, '2016':87.20},
//     {name:'法律服务',	value:	76.08, '2016':80.34},
//     {name:'便民审批',	value:	79.68, '2016':70},
//     {name:'生态环保',	value:	79.43, '2016':70},
//     {name:'城市管理与基础设施',	value:	78.16, '2016':70},
//     {name:'美丽乡村建设',	value:	82.16, '2016':70},
// //    {name:'总体评价',	value:	77.69, '2016':83.06}
//     ]
var data=[];//towns_index['象山县']
console.log()
for(var i=0;i<server_one_name[1].length;i++){
    var data2016;
    if(total_data[towns_index['象山县']]['2016_server_one_score'][1][i]==0){
        data2016=70;
    }else{
        data2016=total_data[towns_index['象山县']]['2016_server_one_score'][1][i];
    }
    data.push({
        name:server_one_name[1][i],
        value:total_data[towns_index['象山县']]['2017_server_one_score'][1][i],
        '2016':data2016,
    })
}
var data2016=[];
//console.log("data[k]['2016']="+data[2]['2016']);
//从对象数组data中得到指定的name值的数组

//从对象数组data中得到指定的name值的数组
function getarr(data,name){
    var len = data.length;
    var f_legend = [];
    for (var i=0;i<len;i++){
        f_legend.push(data[i][name]);
    }
    return f_legend;
}

//传入关联数组的属性property，k表示降序升序，1为降序
function compare(property,k){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return k?value1 - value2:value2 - value1;
    }
}

// var arrow_down='path://M719.36 575.36h-77.44c0-0.64 0-0.64 0-1.28v-318.080c0-35.2-28.8-64-64-64h-129.92c-35.2 0-64 28.8-64 64v318.080c0 0.64 0 0.64 0 1.28h-78.080c-44.16 0-65.92 44.8-35.2 70.4l206.72 173.44c19.2 16 50.56 16 69.76 0l206.72-173.44c31.36-25.6 9.6-70.4-34.56-70.4z';

// data2016=getarr(data,'2016');
//console.log(data2016);

//传入关联数组的属性property，k表示降序升序，1为降序
function compare(property,k){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return k?value1 - value2:value2 - value1;
    }
}

var myChart = echarts.init(document.getElementById('munu_economy'));

myChart.showLoading({
    text : '正在努力的读取数据中...'
});

var score_change =['↑','↓'];

//markpoint文字下降多少批量写入
var markPoint_data=[];
//写颜色
markPoint_data.push({
                    itemStyle:{
                        normal:{
                            color:'#7fb80e',
                        }
                    }});

console.log(((data[1].value-data[1]['2016'])/data[1]['2016']).toFixed(1).toString());
for(var k in data){
    if(data[k]['2016']!=70){
        if(data[k].value>data[k]['2016']){
            markPoint_data.push(
                {
                    name:"上升\n"+((data[k].value-data[k]['2016'])/data[k]['2016']*100).toFixed(1).toString()+"%",
                    coord:[data[k].name,data[k].value],
                }
            );
        }
        else if(data[k].value<data[k]['2016']){
            markPoint_data.push(
                {
                    name:"下降\n"+((data[k]['2016']-data[k].value)/data[k]['2016']*100).toFixed(1).toString()+"%",
                    coord:[data[k].name,data[k].value],
                }
            );
        }
        else{
            markPoint_data.push(
                {
                    name:"持平",
                    coord:[data[k].name,data[k].value],
                }
            );
        }
        
    }
}


var option = {
     title:{
         text:'一类服务评分',
         left:'center',
         	textStyle: {
			color: '#73879C',
			fontStyle: 'normal',
			fontFamily: '微软雅黑',
			fontSize: 16,
		}
     },
    backgroundColor: '#f7f7f7',
	tooltip: { //提示框组件
		trigger: 'axis',
		formatter: '{b}<br />{a0}: {c0}',//<br />{a1}: {c1}
		axisPointer: {
			type: 'shadow',
			label: {
				backgroundColor: '#6a7985'
			}
		},
	
	},
	grid: {
		left: '1%',
		right: '5%',
		bottom: '6%',
		top:30,
		padding:'0 0 10 0',
		containLabel: true,
	},
    legend: {//图例组件，颜色和名字
        right:10,
		top:0,
		itemGap: 16,
		itemWidth: 18,
		itemHeight: 10,
        data:[{
            name:'2017',
            //icon:'image://../wwwroot/js/url2.png', //路径
        },
        {
            name:'2016',
        }
        ],
        textStyle: {
			color: '#73879C',
			fontStyle: 'normal',
			fontFamily: '微软雅黑',
			fontSize: 12,            
        }
        
    },
	xAxis: [
		{
			type: 'category',
			boundaryGap: true,//坐标轴两边留白
			data: getarr(data.sort(compare('value',0)),'name'),
			axisLabel: { //坐标轴刻度标签的相关设置。
				interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
				margin:15,
				textStyle: {
					color: '#73879C',
					fontStyle: 'normal',
					fontFamily: '微软雅黑',
					fontSize: 12,
					
				}
			},
			axisTick:{//坐标轴刻度相关设置。
				show: true,
			},
			axisLine:{//坐标轴轴线相关设置
				lineStyle:{
					color:'#000',
					opacity:1
				}
			},
			splitLine: { //坐标轴在 grid 区域中的分隔线。
				show: false,
			}
		}
	],
	yAxis: [
		{
			type: 'value',
            min: 70,
            max: 88,
			splitNumber: 5,
			axisLabel: {
				textStyle: {
					color: '#73879C',
					fontStyle: 'normal',
					fontFamily: '微软雅黑',
					fontSize: 12,
				}
			},
			axisLine:{
				show: true
			},
			axisTick:{
				show: true
			},
            axisLabel:{
                show: true
            },
			splitLine: {
				show: true,
				lineStyle: {
					color: ['#fff'],
					opacity:0.06
				}
			}

		}
	],

    series : [
        {
            name:'2017',
            type:'bar',
            data:data.sort(compare('value',0)) ,
            barWidth: 15,
            barGap:1.8,//柱间距离
            label: {//图形上的文本标签
                normal: {
                    show:true,
                //    show: function(obj){
                //        var obj2016=(function(){
                //             for (k in data)
                //             {
                //                 if(data[k].name==obj.name){
                //                     return data[k]['2016'];
                //                 }
                //             }
                //         })();
                //        if(obj2016==70) return false;
                //        else return true;
                //    },
                   position: 'top',
                //   formatter: function(obj) {
                //       obj.seriesName
                //        if (obj.value === 0) {
                //            return '';
                //        } else {
                //            return unitname+'\n'+obj.value ;
                //        }
                //    },
                //    formatter: function(obj) {
                //        //获取了obj2017的parma，先获取‘工业’这种seriesName,再找到对应data[]中的对象，中的2016值
                //       var obj2016=(function(){
                          
                //            for (k in data)
                //            {
                //                if(data[k].name==obj.name){
                //                    return data[k]['2016'];
                //                }
                //            }
                //        })();
                      
                       
                //        if(obj2016==70||obj.value==obj2016){
                //            return obj.value;
                //        }
                //        else if(obj.value>obj2016){
                //            return score_change[0]+(obj.value-obj2016).toFixed(2)+'\n'+obj.value ;
                //        }
                //        else {
                //            return score_change[1]+(obj2016-obj.value).toFixed(2)+'\n'+obj.value ;
                //        }
                       
                //        return obj.value;
                       
                //    },
                   textStyle: {
                       color: '#73879C',
                       fontStyle: 'normal',
                       fontFamily: '微软雅黑',
                       fontSize: 12,   
                   },
                },
            },
            itemStyle: {//图形样式
                normal: {
//					barBorderRadius: [5, 5, 0, 0],
					color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(14,125,218,0.8)' 
                        }, {
                            offset: 1, color: 'rgba(14,125,218,0.3)' 
                        }],
                        globalCoord: false 
                    }
                }
            },
            markPoint : {
                symbol: 'pin',
                symbolSize: 70,
                symbolOffset: [0,'-15%'],
                label:{
                    normal:{
                        show:true,
                        position:'inside',
                        offset:[0,0],
                        formatter:'{b}',
                    }
                },
                itemStyle:{
                    normal:{
                        color:'#7fb80e',
                        // color:'#fff',
                    }
                },
                data : markPoint_data,
//                [
//                    {
////                    type:'min',name:'下降3%',
//////                    symbolOffset:['200%',0],
//                    itemStyle:{
//                        normal:{
//                            color:'#7fb80e',
//                        }
//                    }},
//                    {
//                        name:'下降2%',
//                        coord:['现代服务业',78],
//                        
//                    },
//                        
//                ],
            },
            
            markLine : {
                label:{
                    normal:{
                        formatter:'{b}\n{c}'
                    },
                },
                data : [
                    {type : 'average', name : '平均值'}
                ],
                
            }
        },
        {
            name:'2016',
            type:'bar',
            data:getarr(data.sort(compare('value',0)),'2016'),
            barWidth: 15,
            barGap:1.8,//柱间距离
            label: {//图形上的文本标签
                normal: {
                   show:true,
                   formatter:function(obj) {
                       //获取了obj2017的parma，先获取‘工业’这种seriesName,再找到对应data[]中的对象，中的2016值
                      var obj2016=(function(){
                          
                           for (k in data)
                           {
                               if(data[k].name==obj.name){
                                   return data[k]['2016'];
                               }
                           }
                       })();
                       
                       
                        if(obj.value==70){
                            return '';
                        }
                        else {
                            return obj.value ;
                        }
                    //    else {
                    //        return score_change[1]+(obj2016-obj.value).toFixed(2)+'\n'+obj.value ;
                    //    }
                    },
                   
                   position: 'top',
                   textStyle: {
                       color: '#73879C',
                       fontStyle: 'normal',
                       fontFamily: '微软雅黑',
                       fontSize: 12,   
                   },
                },
            },
            itemStyle: {//图形样式
                normal: {
//					barBorderRadius: [5, 5, 0, 0],
					color: 
                    {
					    type: 'linear',
					    x: 0,
					    y: 0,
					    x2: 0,
					    y2: 1,
					    colorStops: [{
					        offset: 0, color: 'rgba(253, 200, 106,0.8)' 
					    }, {
					        offset: 1, color: 'rgba(253, 200, 106,0.3)' 
					    }],
					    globalCoord: false 
					},
//                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                        offset: 1, color: 'rgba(127, 128, 225, 0.7)'
//                    },{
//                        offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
//                    },{
//                        offset: 0.25, color: 'rgba(226, 99, 74, 0.7)'
//                    }, {
//                        offset: 0, color: 'rgba(253, 200, 106, 0.7)'
//                    }], false),
                },
            },
        },
        
        
    ]
};


myChart.hideLoading();

myChart.setOption(option);