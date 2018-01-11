/**
 * Created by Administrator on 2017/3/22/022.
 */
/**
 * Created by Administrator on 2017/3/22/022.
 */
var Width = document.getElementById("munu_energy_big").offsetWidth - 2 ;
var Height = document.getElementById("munu_energy_big").offsetHeight - 4 ;
console.log('Width:'+Width);

var leafmain = d3.select('#munu_energy_big');

leafmain.append('div')
.attr('id','maploadhide')
.style('position', 'absolute')
.style('left',  0 + 'px')
.style('top', '0px')
.style('line-height', Height -1 + 'px')
.style('width',   Width -1 + 'px')
.style('height', Height -1 + 'px')
.style('opacity', '0.4')
.style('z-index', '-100')
.style( 'text-align','center')
//.style('background','#fff')
//.style('display','none');


leafmain.append('div')
    .attr('id','mapid')
    .style('position', 'absolute')
    .style('left', 0.35 * Width + 'px')
    .style('top', '0px')
    .style('width',  0.3 * Width + 'px')
    .style('height', Height + 'px')
    .style('z-index', '3')

leafmain.append('div')
    .attr('id','towns')
    .style('position', 'absolute')
    .style('border-radius', '8px')
    .style('left', 0.5 * Width - 100 + 'px')
    .style('top', '35px')
    .style('width',  '100px')
    .style('height',  '30px')
    .style('background-color', 'white')
    .style('text-align','center')
    .style('z-index', '20')
    .text('乡镇选择')
    .style('line-height','30px')
    .style('font-size','110%')
    .style('font-weight','bold')
    .style('cursor','pointer')
    .style('-webkit-box-shadow', '0px 10px 10px rgba(0,0,0,0.5)')
    .on("click",function(){
    	
        townsTrans();
        map._onResize();
        
    });


leafmain.append('div')
.attr('id','selectall')
.style('position', 'absolute')
.style('border-radius', '8px')
.style('left', 0.5 * Width + 2 + 'px')
.style('top', '35px')
.style('width',  '100px')
.style('height',  '30px')
.style('background-color', 'white')
.style('text-align','center')
.style('z-index', '20')
.text('选择总体')
.style('line-height','30px')
.style('font-size','110%')
.style('font-weight','bold')
.style('cursor','pointer')
.style('-webkit-box-shadow', '0px 10px 10px rgba(0,0,0,0.5)')
.on("click",function(){
	townsSelectedName='象山县';
// mapid_result = mapR['总体'] ;
//
//     console.log(mapid_result);

    d3.selectAll('#munu_energy').remove();
    d3.selectAll('#satisPie').remove();
    d3.selectAll('#peopleChar').remove();
    
    mapFLAG = 0 ;
    console.log("townsSelectedName=="+townsSelectedName);
    SHOW(townsSelectedName,EORL);
    
    townsTransFlag = 1;
    
    townsTrans();
    map._onResize();
    
});


var townsTransFlag = 0;
//地图变换
function townsTrans(){

    if (townsTransFlag === 0){
        d3.select('#mapid')
        	.style('z-index', '13')
            .style('left', 0.1 * Width + 'px')
            .style('width',  0.8 * Width + 'px');

        map.setView(new L.LatLng(29.324118,121.88892300000001), 10);

        townsTransFlag = 1;

        d3.select('#leftblank')
        	.style('z-index', '15')
            .transition().duration(500)
            .style('left', 0 + 'px')
            .style('width',  0.1 * Width + 'px');

        d3.select('#rightblank')
            .style('z-index', '15')
            .transition().duration(500)
            .style('left',  0.9 * Width + 'px')
            .style('width',  0.09 * Width + 'px');
        
        d3.select('#towns')
        .text('返回');
            

    }
    else{
    	townsTransFlag = 0;
    	
	    if (mapFLAG == 0 ){
	    	d3.select('#mapid')
	    	.style('z-index', '3')
	        .style('left', 0.35 * Width + 'px')
	        .style('width',  0.3 * Width + 'px');
	
	    map.setView(new L.LatLng(29.274118,121.98892300000001), 9);
		
	    d3.select('#towns')
        .text('乡镇选择');
	    
	    d3.select('#leftblank')
	    	.style('z-index', '5')
	        .style('left', 0  + 'px')
	        .style('width',  0.35 * Width + 'px');
	
	    d3.select('#rightblank')
	    	.style('z-index', '5')
	        .style('left',  0.65 * Width + 'px')
	        .style('width',  0.34 * Width + 'px');
	    }
	    else {
		    d3.select('#mapid')
	    		.style('z-index', '3')
	    		.style('left', 0)
	    		.style('width', Width + 'px');
		    
		    map.setView(new L.LatLng(29.274118,121.98892300000001), 9);
	        
	        d3.select('#leftblank')
	    		.style('z-index', '-1')
	
	
	        d3.select('#rightblank')
	        	.style('z-index', '-1')
    	
	    } 
    }

}

leafmain.append('div')
    .attr('id','leftblank')
    .style('position', 'absolute')
    .style('left', 0  + 'px')
    .style('top', '0px')
    .style('width',  0.35 * Width + 'px')
    .style('height', Height + 'px')
    .style('background-color', 'white')
    .style('z-index', '5')

    
leafmain.append('div')
    .attr('id','rightblank')
    .style('position', 'absolute')
    .style('left', 0.65 * Width + 'px')
    .style('top', '0px')
    .style('width',  0.34 * Width + 'px')
    .style('height', Height + 'px')
    .style('background-color', 'white')
    .style('z-index', '5')