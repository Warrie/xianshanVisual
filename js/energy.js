//改写点击函数show 传入（'象山县' ,0）

//dispatch
//var dispatch = d3.dispatch("mouseenter","click");
//dispatch.on("mouseenter", debounce(pintaDesglose, 125));
//dispatch.on("click", debounce(rad_click, 125));

//页面加载时写了经济性
// SHOW();
function SHOW(townsSelectedName, EORL){
    //选择总体时会把energy删掉，再show，所以show中添加div
    d3.select("#munu_energy_big")
        .append("div")
        .attr("id","munu_energy");

console.log("townsSelectedNam==="+townsSelectedName);
	var myChart = echarts.init(document.getElementById("munu_energy"));
    myChart.showLoading({
		text : '正在努力的读取数据中...'
	});
    myChart.hideLoading();
    var myChart_title=townsSelectedName+'服务分数';
	var option = {
        color:['#3398DB']	,
        backgroundColor:'#f7f8fa',
        title: {
            text: myChart_title,
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['分数']
        },
        grid:{
            top:100,
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            axisLabel:{
                interval:0,//横轴信息全部显示
                rotate:-30,//-30度角倾斜显示
                show: true,
                textStyle: {
                    color: '#3398DB'
                }
            },
            boundaryGap: false,
            data: server1_name[EORL],
        },
        yAxis: {
            type: 'value',
            name:'分数',
            max:'dataMax',
            min: 'dataMin'
        },
        series: [
            {
                name:'分数',
                type:'line',
                itemStyle : { normal: {label : {show: true}}},
                data:map_data[map_Index[townsSelectedName]].value[EORL],
                markPoint: {
                    symbolOffset:[0,'-10%'],
                    symbolSize:75,
                    label:{
                        normal:{
                            formatter: '{b}\n{c}'
                        }
                    },
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ],
                },
                markLine: {
                    label:{
                        normal:{
                            formatter: '{b}\n{c}'
                        }
                    },
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },

        ]
    };

    myChart.setOption(option);


    myChart.on('click', function (params) {
        //第几项数据
        // console.log(params.dataIndex);
        //paIndex 第几个服务
        var paIndex=params.dataIndex;
        //得到服务名字
        var paName=server1_name[EORL][paIndex];


        //删除之前点击生成的div
        d3.selectAll("#satisPie").remove();
        d3.selectAll("#peopleChar").remove();

        //需要地区名、服务序号
        d3.select("#munu_energy").style("left","0");

        d3.select("#munu_energy_big")
            .append("div")
            .attr("id","satisPie")
            .style("z-index","10")
            .style("width","37%")
            .style("height","42%")
            .style("position","absolute")
            .style("left","59%")
            .style("top","28%")
            .style("background-color","rgb(247, 248, 250)")
            .style("border-radius","7px")
            .style("-webkit-box-shadow"," 0 5px 5px rgba(0,0,0,0.5)")
            ; 

        var satis_category=['满意','比较满意','一般','比较不满意','不满意','不清楚'];
        var satis_series=[];
        //map_data[]中satisfy0为经济的各服务满意度人数，
        var satisfyEORL='satisfy'+EORL;
        //不行，还是做一个判断,是经济的还是民生的
        if(EORL==0){
            for(var i=0;i<satis_category.length;i++){
                console.log("服务["+paIndex+"]="+map_data[map_Index[townsSelectedName]].satisfy0[paIndex][i]);
                satis_series.push(
                    {name:satis_category[i],value:map_data[map_Index[townsSelectedName]].satisfy0[paIndex][i]}
                );
            }
        }else{
            for(var i=0;i<satis_category.length;i++){
                console.log("服务["+paIndex+"]="+map_data[map_Index[townsSelectedName]].satisfy1[paIndex][i]);
                satis_series.push(
                    {name:satis_category[i],value:map_data[map_Index[townsSelectedName]].satisfy1[paIndex][i]}
                );
            }
        }

        console.log("satis_series="+satis_series[0].name) ;
        //画满意人数占比的饼图
        var satisPie=echarts.init(document.getElementById("satisPie"));
        var labelLine1 = {
    			normal: {
    				lineStyle: {
    					color: '#cfd6d9',
    					width: 1
    				},
    				smooth: 0,
    				length: 5,
    				length2:10
    			}
    		};
		var label1 = {
			normal: {
				formatter: function(params) {
					if(params.color == "transparent")return;
					var splitParams = params.seriesName.split('_');
					return splitParams[1] + "（" + params.value*100 + splitParams[2]+"）";
				},
				textStyle: {
					color: '#333',
					fontSize:13,
				}
			}
		};
        var satisPie_title=paName+'各满意度占比';
        var option_S = {
            backgroundColor: 'rgb(247, 248, 250)',
            title : {
                text:satisPie_title,
                textStyle:{
                    color:'#73879C',
                    fontSize:12,

                },
                x: 'center',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            // legend: {
            //     x : 'center',
            //     y : '8%',
            //     data:satis_category
            // },
            grid:{
                top:20,
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'paName',
                    type:'pie',
                    radius : [25, 80],
                    center : ['50%', '56%'],
                    labelLine: labelLine1,
                    label: {
                        normal: {
                            // position: 'inner',
                            formatter: '{b} ({d}%)',

                            textStyle: {
                                color: '#73879C',

                                fontSize: 13
                            }
                        }
                    },
                    roseType : 'area',
                    data:satis_series,
                    color: [
                        '#00acee',
                        '#52cdd5',
                        '#79d9f1',
                        '#a7e7ff',
                        '#c8efff',
                        '#ebf8fd'
                    ]

                }
            ]
        };
        satisPie.setOption(option_S);
                 
         //加叉叉
        d3.select("#satisPie")
            .append("div")
            .attr("id","chacha1").text("×")
            .style("font-size","27px")
            .style("line-height","20px")
            .style("color","red")
            .style("z-index","20")
            .style("position","absolute")
            .style("right","1%")
            .style("top","1%")
            .on("mouseover",function(){
            		d3.select("#chacha1").style("cursor","pointer");
            	})
            .on("click", function(){
                // 添加交互内容
            	d3.selectAll("#satisPie").remove();
            	d3.selectAll("#peopleChar").remove();
            	d3.select("#munu_energy").style("left","25%");
            })
            ;

           
        // 每个满意块加点击
        satisPie.on('click', function (params) {
            //第几项数据
            console.log("params.dataIndex=="+params.dataIndex);
            //saIndex 第几个满意度
            var saIndex = params.dataIndex;
            //得到服务名字
            var saName = satis_name[saIndex];
            //满意还是不满意选项
           console.log("saName=="+saName);

            //把satisPie移上去
            d3.select("#satisPie").style("top","-1%");

            d3.selectAll("#peopleChar").remove();

            d3.select("#munu_energy_big")
                .append("div")
                .attr("id","peopleChar")
                .style("z-index","10")
                .style("width","49%")
                .style("height","57%")
                .style("position","absolute")
                .style("left","50.5%")
                .style("top","42%")
                .style("background-color","rgb(247, 248, 250)")
                .style("border-radius","7px")
                .style("-webkit-box-shadow"," 0 5px 5px rgba(0,0,0,0.5)")
            ;

            d3.select("#peopleChar")
            	.append("div")
            	.attr("id","chacha2").text("×")
            	.style("font-size",'27px')
            	.style("line-height","20px")
            	.style("color","red")
            	.style("z-index","20")
            	.style("position","absolute")
            	.style("right","1%")
            	.style("top","1%")
            	.on("mouseover",function(){
            		d3.select("#chacha2").style("cursor","pointer");
            	})
            	.on("click", function(){
                // 添加交互内容
            		d3.selectAll("#peopleChar").remove();
            		d3.select("#satisPie").style("top","28%");
            	});
            
            //在peopleChar中分四块，年龄、性别、学历、单位
            d3.select("#peopleChar")
                .append("div")
                .attr("id","ageChar")
                .style("width","50%")
                .style("height","50%")
                .style("position","absolute")
                .style("left","0%")
                .style("top","0%")
                .style("border-radius","7px");

            //左下性别块
            d3.select("#peopleChar")
                .append("div")
                .attr("id","sexChar")
                .style("width","50%")
                .style("height","50%")
                .style("position","absolute")
                .style("left","0%")
                .style("top","51%")
                .style("border-radius","7px");

            //右上学历
            d3.select("#peopleChar")
                .append("div")
                .attr("id","educationChar")
                .style("width","50%")
                .style("height","50%")
                .style("position","absolute")
                .style("left","50%")
                .style("top","0%")
                .style("border-radius","7px");

            d3.select("#peopleChar")
                .append("div")
                .attr("id","workChar")
                .style("width","50%")
                .style("height","50%")
                .style("position","absolute")
                .style("left","50%")
                .style("top","51%")
                .style("border-radius","7px");

            //questionaireID 3 民生性问卷 qID 50-61 +13
            //questionaireID 4 经济性问卷 qID 78-89 +13
            //opID                    321- 326((i-50)*6+321-(i-50)*6+326)
            //                        495- 500((i-78))
            //interviewwID sex age education company_town untiProperty
            //服务的序号paIndex（0-11) ，满意度的序号saIndex(0-5)

//            console.log("画图111111111  "+"paIndex="+paIndex+"   saIndex="+saIndex+"  saName="+saName);
            //画年龄图
            var ageChar=echarts.init(document.getElementById("ageChar"));
            //getdep2(qnaierID, qID, ageoption)
            // getdep2T(qnaierID, qID, ageoption, townsname)
            // townsSelectedName
            //判断是民生还是经济
            var agedata;
            // 切换不同乡镇的满意度各年龄分布
            if(townsSelectedName=='象山县'){
                if(EORL==0){
                    agedata=getdep2(4,78+paIndex,'age');
                }else{
                    agedata=getdep2(3,50+paIndex,'age');
                }
            }else{
                if(EORL==0){
                    agedata=getdep2T(4,78+paIndex,'age',townsSelectedName);
                }else{
                    agedata=getdep2T(3,50+paIndex,'age',townsSelectedName);
                }
            }
            

            console.log("agedata==");
            console.log(agedata);
//            1:Object
//            ageoption:"30"
//            name:"一般"
//            value:105
            var agedata_result=[0,0,0,0,0];
            console.log("saName=="+saName);
            for(k in agedata){
            	if(agedata[k].name==saName){
            		if(agedata[k].ageoption=='18'){
//            			30以下
            			agedata_result[0]+=agedata[k].value;
            		}else if(agedata[k].ageoption=='30'){
            			agedata_result[1]+=agedata[k].value;
            		}else if(agedata[k].ageoption=='41'||agedata[k].ageoption=='46'){
            			agedata_result[2]+=agedata[k].value;
            		}else if(agedata[k].ageoption=='51'||agedata[k].ageoption=='56'){
            			agedata_result[3]+=agedata[k].value;
            		}else if(agedata[k].ageoption=='61'){
            			agedata_result[4]+=agedata[k].value;
            		}
            	}
            }
            console.log("agedata_result[1]=="+agedata_result[1]);
            var agedata_sum=agedata_result[0]+agedata_result[1]+agedata_result[2]+agedata_result[3]+agedata_result[4];
//换成饼图
            var labelLine = {
        			normal: {
        				lineStyle: {
        					color: '#cfd6d9',
        					width: 2
        				},
        				smooth: 0,
        				length: 10,
        				length2:10
        			}
        		}
        		var label = {
        			normal: {
        				formatter: function(params) {
        					if(params.color == "transparent")return;
        					var splitParams = params.seriesName.split('_');
        					return splitParams[1] + "（" + params.value*100 + splitParams[2]+"）";
        				},
        				textStyle: {
        					color: '#333',
        					fontSize:10
        				}
        			}
        		}
            var option = {
            		title:{
            			text:'年龄分布',
            			textStyle:{
            				fontSize:12,
            			}
            		},
//            		backgroundColor: '#fff',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
            	    series: [{
            	        name: '年龄组成',
            	        type: 'pie',
            	        radius: '68%',
            	        center: ['50%', '60%'],
            	        clockwise: false,
            	        data: [{
            	            value: agedata_result[0],
            	            name: '<=30岁',
            	           
            	        }, {
            	            value: agedata_result[1],
            	            name: '31-40岁'
            	        }, {
            	            value:agedata_result[2],
            	            name: '41-50岁'
            	        }, {
            	            value: agedata_result[3],
            	            name: '51-60岁'
            	        }, {
            	            value: agedata_result[4],
            	            name: '>=61岁'
            	        }],
            	        label: { normal: {
                textStyle: {
                    color: '#999',
                    fontSize: '14px',
                }
            }},
            	        labelLine: {
            	            normal: {
                 lineStyle: {
                     color: '#cfd6d9',
                     width: 2
                 },
                 smooth: 0,
                 length: 10,
                 length2:10
             }
            	        },
            	        itemStyle: {
            	            normal: {
            	                borderWidth: 4,
            	                borderColor: '#ffffff',
            	            },
            	            emphasis: {
            	                borderWidth: 0,
            	                shadowBlur: 10,
            	                shadowOffsetX: 0,
            	                shadowColor: 'rgba(0, 0, 0, 0.5)'
            	            }
            	        }
            	    }],
            	    color: [
            	        '#c8efff',
            	        '#a7e7ff',
            	        '#52cdd5',
            	        '#00acee',
            	        '#79d9f1',  
            	    ]
            	};
              
            ageChar.setOption(option);



            //画性别图
            var sexChar=echarts.init(document.getElementById("sexChar"));
            // var sexdata=getdep2(4, 78+paIndex, 'sex');
            //判断是民生还是经济
            var sexdata;
            // if(EORL==0){
            //     sexdata=getdep2(4, 78+paIndex, 'sex');
            // }else{
            //     sexdata=getdep2(3, 50+paIndex, 'sex');
            // }

            if(townsSelectedName=='象山县'){
                if(EORL==0){
                    sexdata=getdep2(4,78+paIndex, 'sex');
                }else{
                    sexdata=getdep2(3,50+paIndex, 'sex');
                }
            }else{
                if(EORL==0){
                    sexdata=getdep2T(4, 78+paIndex, 'sex',townsSelectedName);
                }else{
                    sexdata=getdep2T(3, 50+paIndex, 'sex',townsSelectedName);
                }
            }
            
            console.log("sexdataget");
            console.log(sexdata);
            var sexdata_result=[0,0];
            console.log('画性别图,saName==='+saName);
            for(k in sexdata){
                if(sexdata[k].name==saName){
                    if(sexdata[k].ageoption=='男'){
//                      30以下
                        sexdata_result[0]+=sexdata[k].value;
                    }else{
                        sexdata_result[1]+=sexdata[k].value;
                    }
                }
            }
            var sexdata_sum=sexdata_result[0]+sexdata_result[1];
            var option2={
                	title: {
    	                text: '性别比',
    	                textStyle:{
            				fontSize:12,
            			}
    	            },
//    	               legend: {
//    	                data:['男', '女']
//    	            },
    	            xAxis: {
    	                data: [],
    	                type:'value',
    	                show:false,
    	                 axisTick: {
    	                        show: false
    	                    }
    	            },
    	            yAxis: {
    	                type: 'category',
    	                show:false,
    	                 axisTick: {
    	                        show: false
    	                    }
    	            },
    	            series: [{
    	                type: 'bar',
    	                name:'男',
    	                itemStyle: {
    	                    normal: {
    	                        color: '#1FBCD2',
    	                        	barBorderRadius: 6,
    	                    }
    	                },
    	                data:[(sexdata_result[0]/sexdata_sum*100).toFixed(2)],
    	                stack: 'income',
    	                    barWidth: 30,
    	                    label: {
    	                        normal: {
    	                            show: true,
    	                            position: 'inside',
    	                            formatter: function(obj) {
    	                                return '男 '+obj.value + '%';
    	                            }
    	                        }
    	                    }
    	            },{
    	                type:'bar',
    	                 name:'女',
    	                 itemStyle: {
    	                     normal: {
    	                         color: '#FEDC6E',
    	                         barBorderRadius: 6,
    	                     }
    	                 },
    	                data:[(sexdata_result[1]/sexdata_sum*100).toFixed(2)],
    	                stack: 'income',
    	                    barWidth: 30,
    	                    label: {
    	                        normal: {
    	                            show: true,
    	                            position: 'inside',
    	                            formatter: function(obj) {
    	                                return '女 '+obj.value + '%';
    	                            }
    	                        }
    	                    }
    	            }]
	        };
            sexChar.setOption(option2);


            //画学历图
            var educationChar=echarts.init(document.getElementById("educationChar"));
            // var educationdata=getdep2(4, 78+paIndex, 'education');
            //判断是民生还是经济
            var educationdata;
            // if(EORL==0){
            //     educationdata=getdep2(4, 78+paIndex, 'education');
            // }else{
            //     educationdata=getdep2(3, 50+paIndex, 'education');
            // }
            if(townsSelectedName=='象山县'){
                if(EORL==0){
                    educationdata=getdep2(4, 78+paIndex, 'education');
                }else{
                    educationdata=getdep2(3, 50+paIndex, 'education');
                }
            }else{
                if(EORL==0){
                    educationdata=getdep2T(4, 78+paIndex, 'education',townsSelectedName);
                }else{
                    educationdata=getdep2T(3, 50+paIndex, 'education',townsSelectedName);
                }
            }
            
            console.log("educationdata===");
            console.log(educationdata);
            var educationdata_result=[0,0,0,0,0,0,0];
            console.log('画性别图,saName==='+saName);
            for(k in educationdata){
                if(educationdata[k].name==saName){
                    if(educationdata[k].ageoption=='研究生及以上'){
                    	educationdata_result[0]+=educationdata[k].value;
                    }else if(educationdata[k].ageoption=='大学本科'){
                    	educationdata_result[1]+=educationdata[k].value;
                    }else if(educationdata[k].ageoption=='大专'){
                    	educationdata_result[2]+=educationdata[k].value;
                    }else if(educationdata[k].ageoption=='高中/中专'){
                    	educationdata_result[3]+=educationdata[k].value;
                    }else if(educationdata[k].ageoption=='初中'){
                    	educationdata_result[4]+=educationdata[k].value;
                    }else if(educationdata[k].ageoption=='小学及以下'){
                    	educationdata_result[5]+=educationdata[k].value;
                    }else if(educationdata[k].ageoption==null){
                    	educationdata_result[6]+=educationdata[k].value;
                    }
                }
            }
            var educationdata_sum=0;
            for(var j=0;j<educationdata_result.length;j++){
            	educationdata_sum+=educationdata_result[j];
            }
            
            var option3={
            		 title: {
            		        text: '学历分布',
            		        textStyle:{
                				fontSize:12,
                			}
            		    },
            		    tooltip: {
            		        trigger: 'axis',
            		        axisPointer: {
            		            type: null // 默认为直线，可选为：'line' | 'shadow'
            		        },
            		        formatter: '{b} : {c}'
            		    },
            		    grid: {
            		        left: '1%',
            		        right: '5%',
            		        top: '10%',
           		        height: '90%', //设置grid高度
            		        containLabel: true
            		    },
            		    xAxis: [{
            		        type: 'value',
            		        axisLabel: {
            		            show: false
            		        },
            		        axisTick: {
            		            show: false
            		        },
            		        axisLine: {
            		            show: false
            		        },
            		        splitLine: {
            		            show: false
            		        }

            		    }],
            		    yAxis: [{
            		        type: 'category',
            		        boundaryGap: true,
            		        axisTick: {
            		            show: true
            		        },
            		        axisLabel: {
            		            interval: null
            		        },
            		        data: ['研究生及以上', '大学本科', '大专', '高中/中专', '初中', '小学及以下', '其他'],
            		        splitLine: {
            		            show: false
            		        }
            		    }],
            		    series: [{
            		        name: '流量',
            		        type: 'bar',
            		        // barWidth: 25,
            		        label: {
            		            normal: {
            		                show: true,
            		                position: 'right'
            		            }

            		        },
            		        data: educationdata_result,
            		    }]
            };
            educationChar.setOption(option3);


            //画工作单位图
            var workChar=echarts.init(document.getElementById("workChar"));
            // var unitdata=getdep2(4, 78+paIndex, 'unitProperty');
            //判断是民生还是经济
            var unitdata;
            // if(EORL==0){
            //     unitdata=getdep2(4, 78+paIndex, 'unitproperty');
            // }else{
            //     unitdata=getdep2(3, 50+paIndex, 'unitproperty');
            // }
            if(townsSelectedName=='象山县'){
                if(EORL==0){
                    unitdata=getdep2(4, 78+paIndex, 'unitProperty');
                }else{
                    unitdata=getdep2(3, 50+paIndex, 'unitProperty');
                }
            }else{
                if(EORL==0){
                    unitdata=getdep2T(4, 78+paIndex, 'unitProperty',townsSelectedName);
                }else{
                    unitdata=getdep2T(3, 50+paIndex, 'unitProperty',townsSelectedName);
                }
            }
            
            console.log("unitPropertydata===");
            console.log(unitdata);
            var unitdata_result=[0,0,0,0,0,0,0];
            console.log('画性别图,saName==='+saName);
            for(k in unitdata){
                if(unitdata[k].name==saName){
                    if(unitdata[k].ageoption==null){
                    	unitdata_result[0]+=unitdata[k].value;
                    }else if(unitdata[k].ageoption=='其他'){
                    	unitdata_result[1]+=unitdata[k].value;
                    }else if(unitdata[k].ageoption=='企业'){
                    	unitdata_result[2]+=unitdata[k].value;
                    }else if(unitdata[k].ageoption=='事业单位'){
                    	unitdata_result[3]+=unitdata[k].value;
                    }else if(unitdata[k].ageoption=='党政部门'){
                    	unitdata_result[4]+=unitdata[k].value;
                    }
                }
            }
            var unitdata_sum=0;
            for(var j=0;j<unitdata_result.length;j++){
            	unitdata_sum+=unitdata_result[j];
            }
            var option4={
            		title:{
            		      text:'单位分布', 
            		      textStyle:{
              				fontSize:12,
              			}
            		    },
            		    tooltip: {
            		        trigger: 'item',
            		        formatter: "{b}: {c} ({d}%)"
            		    },
            		    // legend: {
            		    //     orient: 'vertical',
            		    //     x: 'left',
            		    //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            		    // },
            		    series: [
            		        {
            		            name:'访问来源',
            		            type:'pie',
            		            radius: ['50%', '70%'],
            		            avoidLabelOverlap: false,
            		             label: {
            		                normal: {
            		                    formatter: '{b}\n{d}%'
            		                },
            		          
            		            },
            		            data:[
            		                {value:unitdata_result[0], name:'未知'},
            		                {value:unitdata_result[1], name:'其他'},
            		                {value:unitdata_result[2], name:'企业'},
            		                {value:unitdata_result[3], name:'事业单位'},
            		                {value:unitdata_result[4], name:'党政部门'}
            		            ]
            		        }
            		    ]
            };
            workChar.setOption(option4);
        });

    });

}



function getData(percent) {
    return [{
        value: percent,
        name: percent,
    }, {
        value: 1 - percent,
        label: {
            show: false
        },
        labelLine: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: 'transparent',
            }
        }
    }];
}

var giftImageUrl = "data:image/png;base64,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";