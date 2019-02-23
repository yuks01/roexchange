var url = "./php/getData.php"
document.addEventListener('DOMContentLoaded', function() {
	var elem = document.querySelector('.modal');
	var instance = M.Modal.init(elem, {});
	var formOpener = document.querySelector(".fixed-action-btn");
	var submitBtn = document.querySelector(".submit-search");
	formOpener.addEventListener("click", function(){
		if(instance.isOpen){
			instance.close();
		} else {
			instance.open();
		}
	});

	document.addEventListener("keypress",function(e){
		console.log(e);
		if(instance.isOpen){
			if(e.which == 13){
				event.preventDefault();
				submitBtn.click();
			}
		} else {
			if(e.which == 13){
				event.preventDefault();
				instance.open();
			}
		}
	});

	submitBtn.addEventListener("click", function(){
		getExchangeData().then(function(data){
			console.log(data);
			clearGraphsRow();
			document.querySelector(".item-name").value = "";
			for(i=0; i<data.length; i++){
				var latestDate = formatDate(data[i].sea.latest_time);
				var itemName = data[i].name;
				var latestPrice = data[i].sea.latest;
				var seaWeek = data[i].sea.week;
				var change = seaWeek.change;
				var seaWeekData = data[i].sea.week.data;
				var dates = [];
				var prices = [];
				createGraphCont(i, itemName, latestPrice, change);
				for(j=0; j<seaWeekData.length; j++){
					prices.push(seaWeekData[j].price);
					dates.push(formatDate(seaWeekData[j].time));
				}
				console.log(prices);
				console.log(dates);
				createGraph(i, prices, dates);
			}

			instance.close();
		});
		// console.log(data);
	});
});

function formatDate(date){
	var dateString = date;
	dateString = new Date(dateString).toString();
	dateString = dateString.split(' ').slice(1, 3).join(' ');
	return dateString;
}

function clearGraphsRow(){
	var graphsRow = document.querySelector(".graphs-row");
	while(graphsRow.firstChild){
		graphsRow.removeChild(graphsRow.firstChild);
	}
}

function createGraphCont(graphNo, itemName, latestPrice, change){
	var graphsRow = document.querySelector(".graphs-row");
	var graphCont = document.createElement("div");
	graphCont.classList.add('graph-cont', 'col', 'xl3', 'l4', 'm6', 's12');
	var graphCanvas = document.createElement("canvas");
	graphCanvas.id = "graph-" + graphNo;
	var itemH4 = document.createElement("h4");
	itemH4.innerHTML = itemName;
	var latestPriceH5 = document.createElement("h5");
	latestPriceH5.innerHTML = "latest price: " + latestPrice;
	var changeP = document.createElement("p");
	changeP.innerHTML = "change: " + change + "%";
	graphCont.appendChild(itemH4);
	graphCont.appendChild(latestPriceH5);
	graphCont.appendChild(changeP);
	graphCont.appendChild(graphCanvas);
	graphsRow.appendChild(graphCont);
}

function getExchangeData(){
	var itemName = document.querySelector(".item-name").value;
	console.log(itemName);
	var data = {itemName: itemName};
	console.log(data);
	return fetch(url, {
	        method: 'POST',
	        cache: 'no-cache',
	        headers:{
	            'Content-type': 'application/json'
	        },
	        body: JSON.stringify(data),
	    })
	    .then(function(response){
	        // console.log(response);
	        // console.log(response.json());

	        return response.json();
	    });
}

function createGraph(graphNo, prices, dates){

	var ctx = document.getElementById('graph-' + graphNo).getContext('2d');
	console.log(graphData(prices, dates));
	var mixedChart = new Chart(ctx, {
		type: 'line',
		data: graphData(prices, dates),
		options: {
			scales: {
				xAxes: [{
					ticks: {
						autoSkip: true
					},
					gridLines: {
						display: false
					}
				}],
				yAxes:[{
					ticks: {
						autoSkip: true
					},
					gridLines: {
						display: false
					}
				}]
			},
			tooltips: {
				callbacks: {
					label: function(tooltipItems, data){
						return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel + ' Z';
					}
				}
			}
		}
	});

	return mixedChart;
}

function graphData(prices, dates){
	var 
	 data2 = {
		label: 'Price',
        data: prices,
        // type: 'line',
        borderColor: '#F11EEC',
        backgroundColor: 'transparent'
	}

	// 	var dataLabels = [];

	// for(var i=0; i<data.length; i++){
	// 	var ppm = ppmToPercent(msg[i].value8);
	// 	data2.data.push(ppm);
	// 	dataLabels.push(msg[i].delegate_datetime);
	// }

	var datasets = [];
	datasets.push(data2);

	var data = {};

	data.datasets = datasets;
	data.labels = dates;
	console.log(data);
	return data;
}




// function createChart11(msg) {
// 		var ctx = document.getElementById('vc-g11').getContext('2d');
// 	mixedChart11 = new Chart(ctx, {
// 	  type: 'line',
// 	  data: chart11loadData(msg),

// 	  options: {
// 	  	scales: {
// 	  		xAxes: [{
// 	  			ticks: {
// 	  				autoSkip:true
// 	  			}
// 	  		}],
// 	  		yAxes: [{
// 	  			// ticks: {
// 				  //   userCallback: function(value, index, values) {
// 				  //   	return value + " %";
// 				  //   }
// 			   //  }
// 	  		}]
// 	  	},
// 	  	tooltips: {
//             callbacks: {
//                 label: function(tooltipItems, data) {
//                     return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' %';
//                 }
//             }

//         }
// 	  }
// 	});

// 	return mixedChart11;
// }

// function chart11loadData(msg) {

// 	var 
// 	 data2 = {
// 		label: '煙 ppm %',
//         data: [],
//         type: 'line',
//         borderColor: '#F11EEC',
//         backgroundColor: 'transparent'
// 	}

// 		var dataLabels = [];

// 	for(var i=0; i<msg.length; i++){
// 		var ppm = ppmToPercent(msg[i].value8);
// 		data2.data.push(ppm);
// 		dataLabels.push(msg[i].delegate_datetime);
// 	}

// 	var datasets = [];
// 	datasets.push(data2);

// 	var data = {};

// 	data.datasets = datasets;
// 	data.labels = dataLabels;

// 	return data;
// }












// function createChart2() {
// 		var ctx = document.getElementById('vc-g2').getContext('2d');
// 	var mixedChart = new Chart(ctx, {
// 	  type: 'line',
// 	  data: chart2loadData(),

// 	  options: {
// 	  	scales: {
// 	  		xAxes: [{
// 	  			ticks: {
// 	  				autoSkip:false,
// 	  				maxTicksLimit:20
// 	  			}
// 	  		}]
// 	  	}
// 	  }
// 	});

// 	return mixedChart;
// }

// function chart0loadData() {

// 	var data1 = {
// 		label: '雨量 mm',
//      	data: [0],
//         borderColor: '#18af9b',
//         backgroundColor: 'rgba(24, 175, 155, 0.5)',
//         lineTension: 0
// 	}

// 	//  data2 = {
// 	// 	label: '照度 Lux',
//  //        data: [82.5],
//  //        type: 'line',
//  //        borderColor: '#f82bca',
//  //        backgroundColor: 'rgba(248, 43, 202, 0.5)',
//  //        lineTension: 0
// 	// }

// 	data3 = {
// 		label: 'UV指数 単位不明',
//         data: [0.04],
//         type: 'line',
//         borderColor: '#482369',
//         backgroundColor: 'rgba(72, 35, 105, 0.3)',
//         lineTension: 0
// 	}

// 	data4 = {
// 		label: '気温 ℃',
//         data: [17.14],
//         type: 'line',
//         borderColor: '#a5bc86',
//         backgroundColor: 'rgba(165, 188, 134, 0.3)',
//         lineTension: 0
// 	}

// 	// data5 = {
// 	// 	label: '気圧 hPa',
//  //        data: [1006.76],
//  //        type: 'line',
//  //        borderColor: '#294810',
//  //        backgroundColor: 'rgba(41, 72, 16, 0.3)',
//  //        lineTension: 0
// 	// }

// 	// data6 = {
// 	// 	label: '湿度 %',
//  //        data: [43.13],
//  //        type: 'line',
//  //        borderColor: '#591368',
//  //        backgroundColor: 'rgba(89, 19, 104, 0.3)',
//  //        lineTension: 0
// 	// }

// 	data7 = {
// 		label: '土壌湿度 単位不明',
//         data: [0],
//         type: 'line',
//         borderColor: '#5ab869',
//         backgroundColor: 'rgba(90, 184, 105, 0.3)',
//         lineTension: 0
// 	}

// 	var datasets = [];
// 	// datasets.push(data2);
// 	datasets.push(data3);
// 	datasets.push(data4);
// 	// datasets.push(data5);
// 	// datasets.push(data6);
// 	datasets.push(data7);
// 	datasets.push(data1);
// 	console.log(datasets);

// 	$('#p1').text(data1.label + " " + data1.data);
// 	// $('#p2').text(data2.label + " " + data2.data);
// 	$('#p3').text(data3.label + " " + data3.data);
// 	$('#p4').text(data4.label + " " + data4.data);
// 	// $('#p5').text(data5.label + " " + data5.data);
// 	// $('#p6').text(data6.label + " " + data6.data);
// 	$('#p7').text(data7.label + " " + data7.data);
// 	var date = new Date();
// 	var newLabel = date.getHours() + ":" + date.getMinutes() + "." + date.getSeconds();
// 	var dataLabels = [newLabel];

// 	var data = {};

// 	data.datasets = datasets;
// 	data.labels = dataLabels;

// 	return data;
// }