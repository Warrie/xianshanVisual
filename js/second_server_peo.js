//建立数组记录每一块的echart参数信息
var i=0;//随机选取颜色
var echartDivs=[
    //每一块是一个对象

    {'flag':0,'divID':'secEch1_1','seriesName':['义务教育','学前教育','普通高中教育','成人教育','职业教育','其他'],'data':[2223,643,295,161,107,21]},

    {'flag':0,'divID':'secEch2_1','seriesName':['保险服务','就业信息与就业指导','失业人员服务','退休人员社会化服务管理','就业困难援助','其他'],'data':[1274,804,556,491,294,31]},

    {'flag':0,'divID':'secEch3_1','seriesName':['基本公共卫生服务','健康教育','优生优育服务','医疗水平及就医环境','其他'],'data':[1451,905,657,375,62]},

    {'flag':0,'divID':'secEch4_1','seriesName':['养老服务','社区服务','救灾救济','婚姻登记','殡葬服务','双拥优抚','其他'],'data':[1455,694,482,339,259,196,25]},

    {'flag':0,'divID':'secEch5_1','seriesName':['经济适用房','棚户区改造','住房保障工作的资格审查','公租房（廉租房）','限价房','其他'],'data':[1182,726,521,477,419,125]},

    {'flag':1,'divID':'secEch6_1','seriesName':['群众文化活动开展','文化遗产传承与保护','文化设施建设与免费开放','广播电视服务','支持民间文艺人才发展','其他'],'data':[977,848,656,567,370,32]},

    {'flag':0,'divID':'secEch7_1','seriesName':['社会治安管理','社会志愿服务','重大突发事件应对','流动人口服务管理','信访服务','其他'],'data':[1633,572,507,468,210,60]},

    {'flag':0,'divID':'secEch8_1','seriesName':['普法宣传','人民调解','法律援助','法律咨询','公证','其他'],'data':[1577,708,581,329,174,81]},

    {'flag':1,'divID':'secEch9_1','seriesName':['社会保险办理','户籍出入境等证件办理','不动产权证办理','住房保障办理','车辆、船舶登记','住房公积金贷款和提取','婚育收养','其他'],'data':[1424,582,430,372,359,176,79,28]},

    {'flag':0,'divID':'secEch10_1','seriesName':['水环境保护（五水共治）','民居环境整治','海洋环境保护','大气环境保护','土壤环境保护','其他'],'data':[1656,811,450,393,104,36]},

    {'flag':0,'divID':'secEch11_1','seriesName':['公共交通','环卫','市容市貌','通信设施','照明设施改造','水电气设施','无障碍设施','其他'],'data':[988,860,633,395,285,227,44,18]},

    {'flag':1,'divID':'secEch12_1','seriesName':['农村生活污水处理','古村落保护','村村通','农村生活垃圾分类处理','无害化卫生厕所普及','规模化畜禽养殖污染治理','其他'],'data':[1483,556,411,354,303,293,50]},



//    {'flag':1,'divID':'secEch','seriesName':[''],'data':[]},
//
];

//每一块填充服务总分
$(".profile-section .content span.stat-right").each(function(index,element){
    element.append(server_one_name[1][index]+"服务总分为"+total_data[0]['2017_server_one_score'][1][index]+"分");
});


//echartDivs[0].divID可以访问，但是for p in p.divID不能访问？？？
for (var p in echartDivs){
    //数组的for in取出的是下标，对象取出的是一个key
    drawEchart(echartDivs[p]);
    if(i<2) i++;
    else i=0;
}

function drawEchart(echartDiv) {
    //获取传入对象的各个属性
 
    var flag = echartDiv['flag'];
    var divID = echartDiv['divID'];
 
    var seriesName = echartDiv['seriesName'];
    var data = echartDiv['data'];
    var sum=data.reduce(function(a,b){return a+b;});
    var datamap=data.map(function(value,index,array){return (value/sum*100).toFixed(2)});
    console.log(datamap);

    var mychart = echarts.init(document.getElementById(divID));
    var option = {};

//    var colors = [ '#675bba','#00a6ac','#fedcbd','#d93a49','#7bbfea','#deab8a','#6f60aa','#faa755','#ffd400', '#130c0e'];
var colors = [ '#00BFFF','#FFA07A','#FFD700'];

    var datas = [];
    if (flag == 0) {
        datas.push({
            type: 'category',
            data: seriesName,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate:10,
                // textStyle:{
                //     color:[colors[i]]
                // }
            }
        })
    }
    else{
        datas.push({
            type: 'category',
            data: seriesName,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate:10,

            }
        })
    }

    option={
        color: [colors[i]],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '12%',
            left: '8%',
            right: '6%',
            bottom: '10%',
            containLabel: true
        },
        xAxis : [],
        yAxis : [
            {
                type : 'value',
                // min:70,
                // max:84,
                name:'百分比(%)'
            },
            
            
        ],
        series : [
            {
                name:'占比(%)',
                type:'bar',
                barWidth: '60%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data:datamap,
            }
        ]
    };
    option.xAxis = datas;
    mychart.setOption(option);
}


