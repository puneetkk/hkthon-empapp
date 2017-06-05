	(function () {
 
 		$("#age-slider").slider({
 			ticks: [20, 25, 30, 35, 40,45,50,55,60,65],
 			ticks_labels: ["20", "25", "30", "35", "40","45", "50", "55", "60","65"],
 			ticks_snap_bounds: 0
 		});
 		$("#pension-slider").slider({
 			ticks: [20, 25, 30, 35, 40,45,50,55,60,65],
 			ticks_labels: ["20", "25", "30", "35", "40","45", "50", "55", "60","65"],
 			ticks_snap_bounds: 0
 		});
 		$("#annuity-slider").slider({
 			ticks: [1000, 3000, 5000, 7000,9000,11000,13000,15000,17000,19000,21000,23000,25000],
 			ticks_labels: ["1000", "3000", "5000", "7000", "9000","11000", "13000", "15000", "17000","19000","21000","23000","25000"],
 			ticks_snap_bounds: 0
 		});
 

 		//Initialize variables
 		var monthSal=0;
 		var currentAge=37;
 		var salHike=7;
 		var pensionAge=65;
 		var empContri=4;
 		var emplyrContri=3;
 		var stateContri=1;
 		var currentTotalContri;
 		var prevTotalCumContri=55094;
 		var currentTotalCumContri;
 		var prevYrMonthlySal;
 		var annuityYrs;
 		var Factor;
 		var annuityConstant=3471;//For the Demo purpose, we will assume only 1 criteria to arrive at the annuity (highligted in Gree for Age 65)
 		var monthlyAnnuity;
 		var annualAnnuity;
 
		$('.month-sal').on('input', function() {
			var input=$(this);
			var is_name=input.val();
			if(is_name){input.removeClass("invalid").addClass("valid");}
			else{input.removeClass("valid").addClass("invalid");}
		});

 		$(".btn-cal").click(function(event){
				event.preventDefault();
				currentAge=parseFloat($("#age-slider").slider('getValue'));
				pensionAge=parseFloat($("#pension-slider").slider('getValue'));
				monthSal=parseFloat($('.month-sal').val());
				annuityYrs=parseInt(pensionAge-currentAge);
				//Check for errors
			
				var form_data=$("#retirementplan").serializeArray();
				var error_free=true;
				for (var input in form_data){
					
					var element=$("#retirementplan_"+form_data[input]['name']);
					var valid=element.hasClass("valid");
					var error_element=element.parent().next();
					if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
					else{error_element.removeClass("error_show").addClass("error");}
				}
				
				if(pensionAge>currentAge){$("#pension-slider").removeClass("invalid").addClass("valid");}
				else{$("#pension-slider").removeClass("valid").addClass("invalid");}

					var element=$("#pension-slider");
					var valid=element.hasClass("valid");
					var error_element=element.next();
					if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
					else{error_element.removeClass("error_show").addClass("error");}
				
				if (!error_free){
					event.preventDefault(); 
				}
				else{
					
					for (i = 0; i <=annuityYrs; i++) {
						
						if(i==0){
							
							prevYrMonthlySal=monthSal;
							currentTotalContri= parseFloat((monthSal*empContri/100)+(monthSal*emplyrContri/100)+(monthSal*stateContri/100));
							currentTotalCumContri=prevTotalCumContri+currentTotalContri;

						}else{
							
							prevTotalCumContri=currentTotalCumContri;
							prevYrMonthlySal=monthSal;
							monthSal=prevYrMonthlySal+parseFloat(monthSal*(salHike/100));
							currentTotalContri= parseFloat((monthSal*empContri/100)+(monthSal*emplyrContri/100)+(monthSal*stateContri/100));				
							currentTotalCumContri=prevTotalCumContri+currentTotalContri;
						}
					prevTotalCumContri=currentTotalContri;
					prevYrMonthlySal=monthSal;
				}
 		
 		Factor=currentTotalCumContri/100000;
 		monthlyAnnuity=Math.round(Factor*annuityConstant);
 		$("#annuity-slider").slider('setValue', monthlyAnnuity);
 		annualAnnuity=Math.round(monthlyAnnuity*12);
 		$(".pension-pot").text(monthlyAnnuity);
 		//$(".pension-pot-yearly").text(annualAnnuity);
		}
			
 		});
 		//Reset Form
 		$(".btn-reset").click(function(){
 		
 			 monthSal=0;
 			 currentAge=37;
 			 salHike=3;
 			 pensionAge=66;
 			 empContri=4;
 			 emplyrContri=3;
 			 stateContri=1;
 			 currentTotalContri=0;
 			 prevTotalCumContri=0;
 			 currentTotalCumContri=0;
 			 prevYrMonthlySal=0;
 			 annuityYrs=0;
 			 
 			 $("#age-slider").slider('refresh');
 			 $("#pension-slider").slider('refresh');
 			 $("#annuity-slider").slider('refresh');

 		
 		});
 
 
 }());