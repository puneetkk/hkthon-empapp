$("#slider1").slider({
    ticks: [20, 25, 30, 35, 40,45,50,55,60,65],
    ticks_labels: ["20", "25", "30", "35", "40","45", "50", "55", "60","65"],
    ticks_snap_bounds: 0,
  	/*slide: function (evt,val) {
	
        console.log("slide");
    }*/
});
$("#slider2").slider({
    ticks: [20, 25, 30, 35, 40,45,50,55,60,65],
    ticks_labels: ["20", "25", "30", "35", "40","45", "50", "55", "60","65"],
    ticks_snap_bounds: 0
});
$("#slider3").slider({
    ticks: [1000, 2000, 3000, 4000,5000,6000],
    ticks_labels: ["1000", "2000", "3000", "4000", "5000","6000"],
    ticks_snap_bounds: 0
});

$( ".slider-example" ).each(function( index ) {

	var slider=("#slider"+(index+1));
	var input=$(this).find(".slider-input");
	$(this).find(".slider-handle").click(function() {

		input.val($(slider).slider('getValue'));
	});

});