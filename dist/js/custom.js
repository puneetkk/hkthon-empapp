	(function () {

		$("#slider1").slider({
			ticks: [20, 25, 30, 35, 40,45,50,55,60,65],
			ticks_labels: ["20", "25", "30", "35", "40","45", "50", "55", "60","65"],
			ticks_snap_bounds: 0
		});
		$("#slider2").slider({
			ticks: [20, 25, 30, 35, 40,45,50,55,60,65],
			ticks_labels: ["20", "25", "30", "35", "40","45", "50", "55", "60","65"],
			ticks_snap_bounds: 0
		});
		$("#slider3").slider({
			ticks: [1000, 3000, 5000, 7000,9000,11000,13000,15000,17000,19000,21000,23000,25000],
			ticks_labels: ["1000", "3000", "5000", "7000", "9000","11000", "13000", "15000", "17000","19000","21000","23000","25000"],
			ticks_snap_bounds: 0
		});

/* 		$( ".slider-example" ).each(function( index ) {

			var slider=("#slider"+(index+1));
			var input=$(this).find(".slider-input");
			$(this).find(".slider-handle").click(function() {

				input.val($(slider).slider('getValue'));
			});

		}); */
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

		$(".btn-cal").click(function(){
			
			//Reset input values first
			//$('.current-age').val("");
			//$('.pension-age').val("");
			//$('.month-sal').val("");
			//console.log("CHANDRA: "+$("#slider3").slider('getValue'));
			
			
			
			currentAge=parseFloat($("#slider1").slider('getValue'));
			pensionAge=parseFloat($("#slider2").slider('getValue'));
			monthSal=parseFloat($('.month-sal').val());
			annuityYrs=parseInt(pensionAge-currentAge);
			console.log("current Age: "+currentAge);
			console.log("current age monthly Salary: "+monthSal);
			console.log("pension  Age: "+pensionAge);
			console.log("Calculate Annuity for next: "+annuityYrs+" Years");
			for (i = 0; i <=annuityYrs; i++) {
				
				if(i==0){
					console.log(i+" current age monthly Salary: "+monthSal);
					prevYrMonthlySal=monthSal;
					console.log(i+" current age employee Contribution:"+empContri+'%= '+(monthSal*empContri/100));
					console.log(i+" current age employer Contribution:"+emplyrContri+'%= '+(monthSal*emplyrContri/100));
					console.log(i+" current age state contribution:"+stateContri+'%= '+(monthSal*stateContri/100));
					
					//currentTotalContri= parseFloat((monthSal*empContri/100)+(monthSal*emplyrContri/100)+(monthSal*stateContri/100));
					currentTotalContri= parseFloat((monthSal*empContri/100)+(monthSal*emplyrContri/100)+(monthSal*stateContri/100));
					
					console.log(i+" current age Year Total Contribution: "+currentTotalContri);
					console.log(i+" previous Total Cummulative Contribution: "+prevTotalCumContri);
					currentTotalCumContri=prevTotalCumContri+currentTotalContri;
					console.log(i+" current age Year TotalCumulative Contribution: "+currentTotalCumContri);
				}else{
					

					console.log(i+" previous Total Contribution : "+currentTotalContri);
					prevTotalCumContri=currentTotalCumContri;
					prevYrMonthlySal=monthSal;
					console.log(i+" previous Total Cum Contribution : "+currentTotalCumContri);
					console.log(i+" previous year monthly salary: "+prevYrMonthlySal);
					console.log(i+" next year hike: "+salHike+'%= '+monthSal*(salHike/100));
					
					monthSal=prevYrMonthlySal+parseFloat(monthSal*(salHike/100));
					
					console.log(i+" next year monthly salary: "+monthSal);
					//monthSal+=parseFloat(monthSal)*(salHike/100);
					console.log(i+" next year employee Contribution:"+empContri+'%= '+(monthSal*empContri/100));
					console.log(i+" next year employer Contribution:"+emplyrContri+'%= '+(monthSal*emplyrContri/100));
					console.log(i+" next year state contribution:"+stateContri+'%= '+(monthSal*stateContri/100));
					currentTotalContri= parseFloat((monthSal*empContri/100)+(monthSal*emplyrContri/100)+(monthSal*stateContri/100));
					
					console.log(i+" Prev Total Cumm Contribution: "+prevTotalCumContri);
					console.log(i+" next Year Total Contribution: "+currentTotalContri);
					console.log(i+" that Year TotalCumulative Contribution: "+(prevTotalCumContri+currentTotalContri));					
					currentTotalCumContri=prevTotalCumContri+currentTotalContri;
				
					console.log(i+" next year Total cumulative Contribution: (current+ previous)  "+currentTotalCumContri);
					console.log("*****************************");
				}
			prevTotalCumContri=currentTotalContri;
			prevYrMonthlySal=monthSal;
		}
		console.log("Pension Age calculations as below:");
		console.log("pension age monthly Salary: "+monthSal+" pension age Total Contribution: "+currentTotalContri+" pension age Total Cumulative Contribution: "+currentTotalCumContri);
		console.log("*****************************");
		
		Factor=currentTotalCumContri/100000;
		monthlyAnnuity=Math.round(Factor*annuityConstant);
		console.log("monthlyAnnuity::::: "+monthlyAnnuity)
		$("#slider3").slider('setValue', monthlyAnnuity);
		annualAnnuity=Math.round(monthlyAnnuity*12);
		$(".pension-pot").text(monthlyAnnuity);
		//$(".pension-pot-yearly").text(annualAnnuity);
		
		console.log("Factor: "+Factor);
		console.log("monthlyAnnuity: "+monthlyAnnuity);
		console.log("annualAnnuity: "+annualAnnuity);
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
			 
			 $("#slider1").slider('refresh');
			 $("#slider2").slider('refresh');
			 $("#slider3").slider('refresh');
			 //
			 
/* 			$('.current-age').val("");
			$('.pension-age').val("");
			$('.month-sal').val("");
			$(".pension-pot").text("");
			$(".pension-pot-yearly").text(""); */
		
		});


}());
	
	






