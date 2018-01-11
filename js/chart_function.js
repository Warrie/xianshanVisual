/*
@liqx
自动绘制图表的各类辅助功能
*/

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