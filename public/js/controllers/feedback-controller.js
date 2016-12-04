angular.module('app').controller('feedbackCtrl', ['$scope',
    '$http',
    '$q',
    '$routeParams',
    '$location',
    'screen_saver_loop',
    '$location',
    '$rootScope',
    'detect_dragging', 'trello', 'get_trello_board', 'date_calc', 'Todos', 'Tallys','Team','feedback',
    function($scope, $http, $q, $routeParams, $location,
        screen_saver_loop, $location, $rootScope, detect_dragging, trello, get_trello_board, date_calc, Todos, Tallys,Team,feedback
    ) {

var REFERENCE = moment(); // fixed just for testing, use moment();
$scope.TODAY = REFERENCE.clone().startOf('day');
$scope.YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
$scope.A_WEEK_OLD = REFERENCE.clone().subtract(2, 'days').startOf('day');
$scope.datePicker=[];
$scope.datePicker.date = {startDate: $scope.A_WEEK_OLD._d, endDate: $scope.TODAY._d};
$scope.machine_types = [];
$scope.type="INTERPRETATION-KIOSK";
$scope.feedback=[];
$scope.changedValue = function(type) {
			$scope.data=[]
			$scope.series=[]
			$scope.category=[]
			$scope.type=type
			plot_graph()			 
 }   

$scope.selected="all";
$scope.changeMachine = function(machine) {
			
			$scope.feedback=[];
			$scope.data=[];
			$scope.series=[];
			$scope.category=[];
			$scope.selected=machine;
			plot_graph(machine)	;		 
 }   




$scope.machinesx=["all"]
$scope.filterCondition = {
        machine: 'neq'
}
$scope.$watch('type', function(type) {
$scope.machinesx=["all"]
	//plot_graph('type')

})	
	  
$scope.$watch('datePicker', function() {
plot_graph();
})
	  


  // selected fruits
  $scope.machine_types_selection = [];



  $scope.categories = [];
  $scope.category_selection = [];

 

 
var _data=[];
    $scope.data = []
	$scope.day_data=[]
    $scope.team = [];
	$scope.labels= $scope.team
  $scope.chart_title="KIOSK FEEDBACK"

    var series_a = []
	
	var firstTime=true
	
	
	
	
	
	var plot_graph = function(mode) {
	$scope.data=[];
	$scope.series=[];
	$scope.day_series=[];
	$scope._series=[];
	$scope.week_day_series=[];
	
	if(!mode){
	$scope.machinesx=[]	
}	


$scope.categories=[]

		 feedback.feedback($scope.categories,$scope.datePicker.date).then(function(data) { //2. so you 
		 		
				  		
				_.each(data.data['kiosk_list'], function(data) {
					if($scope.type=="INTERPRETATION-KIOSK" && firstTime==true){
						$scope.machinesx.push(data.kiosk)
					}
												 
				})	
				firstTime=false
			
				
				_.each(data.data['all'], function(data) {
					if(data.description !="" && data.kiosk==$scope.selected){
					$scope.feedback.push(data)
					console.log(data.description)
					}
								 
				})
				console.log($scope.feedback)
			satisfact_pie(data) 

			})				
	}

		
$scope.day_onClick = function(points, evt) {
       // console.log(points, evt);
    };
    $scope.day_datasetOverride = [{
        yAxisID: 'y-axis-1'
    }];
   
	

  
  
  

    $scope.onClick = function(points, evt) {
       // console.log(points, evt);
    };
    $scope.datasetOverride = [{
        yAxisID: 'y-axis-1'
    }];
    $scope.options = {
	tension:0,
	 bezierCurve: false,
        scales: {
            xAxes: [{
                type: 'time',
                unit: 'hour',
				
                unitStepSize: 0.05,
                  time: {
        displayFormats: {
           'day': 'MMM DD'
        }
                }
            }],
            yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ]
        }
    };
	
	var count = 0


        //  $scope.kiosk = app_settings.kiosk || "null"
        // $scope.call_to_action = app_settings.call_to_action
        kiosk_path = $routeParams.kiosk
            //  screensaver = app_settings.screensaver //services
        screensaver = ""
        $scope.start_screen_saver = function() {
           // screen_saver_loop.start_screen_saver()

        };
        $scope.functionThatReturnsStyle = function() {
            // return app_functons.functionThatReturnsStyle($routeParams.kiosk)

        };
        $scope.changeheadingcolor = function() {
            // return app_functons.changeheadingcolor($routeParams.kiosk)

        };
        if ($rootScope.screensaver_on != true) {
          
        }

     
		$scope.lists = []
		
	$scope.listscores = function(list) {	
	
		 
				_.each(list, function(row) {
					
					
								list=[]
								list.title = row.kiosk
								list.average = row.penalty
								list.age = (10-1/(row.penalty)*10 ).toFixed(0)
								list.tint = row.penalty / 100
								list.card_count = row.card_count
								list.points = row.score  //(row.card_count / (row.penalty + 1)).toFixed(1)	
							$scope.lists.push(list)
				})
		
		
	}


		
	  function satisfact_pie(comments) {
     
               
				
				
				 $scope.kiosks=[]
				var series_a=[]
				var labels=[]
			
				$scope.pie_labels=[]
				$scope.pie_data=[]
				$scope.pie_options=[]
				$scope.datax=[]
				
			_.each(comments.data['satisfaction_tally'] , function( row) {
				
		

			
			if($scope.kiosks.indexOf(row.kiosk)==-1){
			if($scope.selected.indexOf(row.kiosk)!=-1){
				$scope.kiosks.push(row.kiosk)
				console.log('cats')
				series_a[row.kiosk]=[]
				$scope[row.kiosk]=[]
				labels[row.kiosk]=[]
			}
			}
				
if($scope.selected.indexOf(row.kiosk)!=-1){
				series_a[row.kiosk].push( Math.round(row.count ))
				labels[row.kiosk].push( row.satisfaction )
				}

				})
			
				_.each($scope.kiosks , function( kiosk, i) {
				
		
					$scope.machine = kiosk
					$scope.pie_labels[i] = labels[kiosk];
					$scope.pie_data[i] = series_a[kiosk];
					$scope.pie_options[i] = { legend: { display: true },
										tooltips: {
													enabled: true,
													mode: 'single',
													callbacks: {
														
														label: function(tooltipItems, data) { 
														
														var label =data.labels[tooltipItems.index]
															return label+ " " + data.datasets[0].data[tooltipItems.index] + '';
															
														}	
												
													}
										}
					}
		})

				
				
				
		}		
	
}])