/**
 * Created by Administrator on 2017/3/22/022.
 */
var townsName = '象山县';            // 移动到乡村的名字
var townsSelectedName = '象山县';    //点击选择的乡镇名字 
var mapR=[];

//画地图
//var map = L.map('mapid').setView([29.424118,121.88892300000001], 9);


var map = L.map('mapid').setView([29.274118,121.98892300000001], 9);

map._onResize();


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
}).addTo(map);


function getColor(d) {
    return d < 70 ? '#FF8800' :
        d < 75  ? '#FFCC22' :
            d < 78  ? '#FFFF33' :
                d < 81  ? '#CCFF33' :
                    d < 84   ? '#99FF33' :
                        d < 87   ? '#33FF33' :
                            d < 90   ? '#00FF00' :
                                '#00FF99';
}




function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


var geojson;


// mapR['总体'].push(
//     {
//         "classname" : k ,
//         "question" : Qdata_sort( getshowdata_linnshi ),
//         "score"   : Score( getshowdata_linnshi ),
//         "subclass": getshowdata( value[k][0], (value[k][1]+11) ),

//点击每块的函数
function zoomToFeature(e) {
//    map.fitBounds(e.target.getBounds());
    townsSelectedName = townsName ;
//    console.log(e);
    console.log('已选城市：'+ townsSelectedName);
    d3.selectAll('#munu_energy').remove();
    d3.selectAll('#satisPie').remove();
    d3.selectAll('#peopleChar').remove();
    
    if (mapR[townsSelectedName] == null){
    	
    	mapR[townsSelectedName] = [] ;
    	
    	var dtd = $.Deferred(); // 新建一个deferred对象
        var wait = function(dtd){
			var tasks = function(){
				
				d3.select("#maploadhide")
	    		.style('background','#000')
	    		.style('z-index', '80')
	    		.style('font-size','70px')
	    		.style('color','#fff')
	    		.text('正在加载中');

				
				 var obox=document.getElementById("munu_energy_big").offsetWidth;
				console.log('1111111111111111');
				console.log(d3.select("#maploadhide").style('z-index'));
				console.log(d3.select("#maploadhide").text());
				console.log(obox);
				
				dtd.resolve(); // 改变deferred对象的执行状态
				};

				
				window.setTimeout(tasks(), 10);
				
				return dtd;
        	};
    
        	
    	$.when(   
    			wait(dtd)
   			)
    	.then(
    			function(){
    				console.log('22222222222222');
    				setTimeout(function() {
//    					mapid.forEach(function(value, index, array) {
//            	    		
//            	    		  for(var k in value) {
//            	    			  var getshowdata_linnshi = getshowdataT( value[k][0], value[k][1], townsSelectedName ) ;
//            	    			  mapR[townsSelectedName].push(
//            	    				{
//            	    					"classname" : k ,
//            	    					"question" : Qdata_sort( getshowdata_linnshi ),
//            	    					"score"   : Score( getshowdata_linnshi ),
//            	    					"subclass": getshowdataT002( value[k][0], (value[k][1]+11), townsSelectedName ),
//            	    				});	 
//            	    		  	};
//            	    		  
//            	    		});
      				
	      				console.log('333333333333333333333333333333');
	      				d3.select("#maploadhide")
	      	    		.style('background','#000')
	      	    		.style('z-index', '-90')
	      	    		.text('');
    					
	      			   mapid_result = mapR[townsSelectedName] ;
	      			  
		      		    console.log(mapid_result);
		      		    
		      		    d3.select('#munu_energy').remove();
		      		    d3.select('#minidiv').remove();
		      		    d3.select('#department').remove();
		      		    
		      		    mapFLAG = 0 ;
		      		    
		      		    SHOW(townsSelectedName,EORL);
		      		    
		      		    townsTransFlag = 1;
		      		    
		      		    townsTrans();
		      		    map._onResize();
	      				
	      				
	      				
    				},0);
    		

    				
    			}
    			);
    	
    }
    else{
    	
    	mapid_result = mapR[townsSelectedName] ;
      
        console.log(mapid_result);
        
        d3.select('#munu_energy').remove();
        d3.select('#minidiv').remove();
        d3.select('#department').remove();
        
        mapFLAG = 0 ;
        
        SHOW(townsSelectedName,EORL);
        
        townsTransFlag = 1;
        
        townsTrans();
        map._onResize();
    		
    }
    

    
}
//点击每个乡镇块
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}



geojson = L.geoJson(statesData2, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    console.log(props);
	townsName = props ?  props.name : '';

    this._div.innerHTML = '<h4>象山县各街道满意度</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' +'得分：'+ props.density
            : 'Hover over a state');
};

info.addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}


function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//增加颜色图例
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 70, 75, 78, 81, 84, 87, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + ';height: 10px;display: inline-block;width: 15px;border-radius: 3px;margin-left: 3px;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



//1表示 department 存在时  map全屏   
var mapFLAG = 0 ;


