exports.timeline_controller=     function($scope, $http, $q, $routeParams, $location,
         $location, $rootScope, trello, get_trello_board, date_calc, Todos, Timeline, Team, kiosk_activity,timeline_functions,timeline_leave_functions,timeline_holidays_functions,timeline_learning_functions,timeline_loans_functions,timeline_events_functions,timeline_arts_functions,emu_stats_functions,timeline_shopify_functions
    ) {
		
		

	
	$scope.average_install_length = 0
	$scope.locked=[]
	$scope.unlock=false
	$scope.password=false
	$scope.lockstatus=true
	$scope.locked['true']={status:" locked",value:false}
	$scope.locked['false']={status:" unlocked",value:true}
	$scope.average_derig_length = 0
 $rootScope.addednames=[]
	
	$rootScope.track_groups=[]
	
	
	 $rootScope.added_track_groups=[]	
	
	
	$rootScope.datePicker=[];
	$rootScope.datePicker.date = {startDate:null, endDate: null};
	
$scope.dateRangeOptions = {
        locale : {
            format : 'DD/MM/YYYY'
        },
        eventHandlers : {
            'apply.daterangepicker' : function() {  
               date=$rootScope.datePicker.date
			   	days=timeline_functions.days(moment(date.startDate),moment(date.endDate))
				
				
			   if(date){
			//if($rootScope.selected_t_id==event.items[0]){	
					html=timeline_functions.event_html($scope.selected_item,"","",moment(date.startDate).format("MMM Do YYYY") , moment(date.endDate).format("MMM Do YYYY")|| "",$rootScope.selected_notes + "(" +days+" days)" )
					var options={id:$scope.selected_timeline_id,content:html,start:moment(date.startDate)._d,end:moment(date.endDate)._d,start_date:moment(date.startDate)._d,end_date:moment(date.endDate)._d}
					Timeline.update({
					id: $scope.selected_id,				
					}, options);				
					timeline_functions.updateItem(options)
	
		
			}}				
            }
        }
    
				$scope.$watch('selected_notes', function(selected_note) {

					date=$rootScope.datePicker.date
					days=timeline_functions.days(moment(date.startDate),moment(date.endDate))
			
					html=timeline_functions.event_html($scope.selected_item,"","",moment(date.startDate).format("MMM Do YYYY") , moment(date.endDate).format("MMM Do YYYY")|| "",selected_note,days)
					var options={id:$scope.selected_timeline_id,content:html,notes:selected_note}
					Timeline.update({
					id: $scope.selected_id,				
					}, options);				
					timeline_functions.updateItem(options)
	
			})
			
		
			
			$scope.$watch('selected_item', function(selected_item) {

			date=$rootScope.datePicker.date
			days=timeline_functions.days(moment(date.startDate),moment(date.endDate))
			//if($rootScope.selected_t_id==event.items[0]){	
					html=timeline_functions.event_html(selected_item,"","",moment(date.startDate).format("MMM Do YYYY") , moment(date.endDate).format("MMM Do YYYY")|| "",$rootScope.selected_notes ,days)
					var options={id:$scope.selected_timeline_id,content:html,name:selected_item}
					Timeline.update({
					id: $scope.selected_id,				
					}, options);				
					timeline_functions.updateItem(options)
	
			})
	 
	$scope.$watch('stack', function(stack) {
		
		
		 if(typeof(stack)!="undefined"){
			 
			   options={stack:stack}
		timeline_functions.updateOptions(options)
		  }
        })

        $scope.editing = [];
        $scope.timeline = Timeline.query();


		
		
        $scope.removeTimeline = function(id) {
            Timeline.remove({
                id: id
            })
        }
        Timeline.query({}, function(team) {
            _.each(team, function(row,index) {
		
		 
		 var timeline = $scope.timeline[index];
		 if(timeline.group=="Bristol Archives"){
            Timeline.remove({
                id: timeline._id
            }, function() {
               // $scope.timeline.splice(index, 1);
            });
			}
			
            })
        })
		
	
        $scope.save = function() {
		
            if (!$scope.newTimeline || $scope.newTimeline.length < 1) return;
            var timeline = new Timeline({
                name: $scope.newTimeline,
                completed: false
            });

            timeline.$save(function() {
		
                $scope.timeline.push(timeline);
                $scope.newTimeline = ''; // clear textbox
            });
        }

        $scope.update = function(index) {
            var timeline = $scope.timeline[index];
            Timeline.update({
                id: timeline._id
            }, timeline);
            $scope.editing[index] = false;
        }

        $scope.edit = function(index) {
            $scope.editing[index] = angular.copy($scope.timeline[index]);
        }

        $scope.cancel = function(index) {
            $scope.timeline[index] = angular.copy($scope.editing[index]);
            $scope.editing[index] = false;
        }

        $scope.remove = function(index) {
            var timeline = $scope.timeline[index];
            Timeline.remove({
                id: timeline._id
            }, function() {
                $scope.timeline.splice(index, 1);
            });
        }

        $scope.datePicker = "";
        $scope.datePicker.date = {
            startDate: null,
            endDate: null
        };
        $scope.machine_types = [];
        $scope.type = "all";
        $scope.changedValue = function(type) {
            $scope.data = []
            $scope.series = []
            $scope.category = []
            $scope.type = type
            plot_graph()
        }


        $scope.machinesx = ["all"]
        $scope.filterCondition = {
            machine: 'neq'
        }
        $scope.$watch('type', function(type) {
            $scope.machinesx = ["all"]


        })

  

        $scope.$watch('machine', function() {



            })
            // selected fruits
        $scope.machine_types_selection = [];



        $scope.categories = [];

        // selected fruits
        $scope.category_selection = [];




        var _data = [];
        $scope.data = []
        $scope.day_data = []
        $scope.team = [];
        $scope.labels = $scope.team
        $scope.chart_title = "Machine activity"

        var timeline

     

            var groups = new vis.DataSet();
            var dates = new vis.DataSet();
			var dates = new vis.DataSet();
			var second_dates = new vis.DataSet();
            var all_groups = []
            var i = 0

      

      install_days_tally = 0
	  install_instance_tally=0 
	  derig_tally = 0
	 derig_days_tally=0
            Timeline.query({}, function(team) {
			 
                _.each(team, function(data) {
				
				
				data.days=timeline_functions.days(data.start_date,data.end_date)
					var end_date
                    if ( data.group != "") {
						if( data.start_date!=""){
					if(typeof(data.end_date)!="undefined"){
						end_date=(moment(data.end_date).format("MMM Do YY"))
						}
						if(data._type=="INSTALL"){
						install_instance_tally++
						 install_days_tally +=data.days
						}
						else if(data._type=="DERIG"){
						derig_tally++						
						  derig_days_tally +=data.days
						  }
						if( 	$rootScope.added_track_groups.indexOf(data._type)==-1){	
						
						 $rootScope.added_track_groups.push(data._type)
						  //	$rootScope.track_groups.push({"track":data._type})
						}
							
							
						   second_dates.add({
								_id: data._id,
								className:data.className,
								select_group :false,
								name:data.name,
								_type:data._type,
								track:data._type,
								content: timeline_functions.event_html(data.name,"","",moment(data.start_date).format("MMM Do YY") , end_date ||"",data.notes ,data.days),
								group: data.group||"NA",
								order:data._type,
								notes: data.notes,
								title:data.notes,
								start: data.start_date,
								days:data.days,
								end: data.end_date 
							})
						}
                    }
                })
			  timeline_functions.get_events().then(function(data) {
			  			
			var checked_event_types=[]
			
			if($("#add_emu_exhibitions").is(':checked')){
				
				checked_event_types.push('Exhibition')
				checked_event_types.push('Gallery')
				
			}
		
			
			//if($("#whats_on").is(':checked')){
				checked_event_types.push('Family')
				checked_event_types.push('Tour')
				checked_event_types.push('Walk')
				checked_event_types.push('Rides')
				checked_event_types.push('Tours')
				checked_event_types.push('Talk')
				checked_event_types.push('Lecture')
				checked_event_types.push('Special Event')
				checked_event_types.push('Event')
				
			//}
			
			   _.each(data.data, function(events) {
			   _.each(events, function(event) {
												
											//if( event.startDate!=""){
												
											//if( checked_event_types.indexOf(event.type)>=0){	
											if( event.type=="Exhibition"||event.type=="Gallery"){
											var end_date=new Date(event.endDate)
											
											if(event.endDate==""||event.endDate==event.startDate){
										
											var end_date=new Date(event.startDate)
											//end_date.setDate(end_date.getDate() + 1)
										
											}
											var group =	"NA"
											if( event.type=="Exhibition"||event.type=="Gallery"){
											 group =	event.event_space||"NA" 
											}
											else{
												 group =	event.type ||"NA"
											}
													
												var eventimages = false
												if(event.images[0]){
												eventimages=event.images[0].irn
												}
												var htmlContent =  timeline_functions.event_html(event.name,true&&event.images[0],eventimages,event.startDate,event.endDate)
													if( 	$rootScope.added_track_groups.indexOf(event.venue)==-1){
												$rootScope.added_track_groups.push(event.venue)														
													$rootScope.track_groups.push({"track":event.venue})
													}
													select_group = true
													if($routeParams.track){
													select_group = false
													if($routeParams.track=="Arts and Events"){
													//select_group = true
													}
													}
													
													
													dates.add({
																		group		:	group, 
																		select_group :select_group,
																		title		:	event.name,
																		name:event.name,
																		type		: "background",
																		content		:	htmlContent,
																		order:event.venue+event.event_space,
																		track:event.venue,
																		start		:	new Date(event.startDate), 
																		end			:	event.endDate, 
																		className 	:	"green",
																		event_type  :   "WHATS ON"
																		})
																		
											//}
											}

			  })
			    })
			
			_.each(second_dates._data, function(date) {
			dates.add(date)
			})
			$scope.total_install_derig=install_days_tally+derig_days_tally
			$scope.average_install_length=Math.round(install_days_tally/install_instance_tally)
			$scope.average_derig_length=Math.round(derig_days_tally/derig_tally)
				  timeline_functions.setup(Timeline,groups,dates)
				  
				

	$scope.team_leave()
	$scope.public_events()
	$scope.learning_bookings()
	$scope.loans()
	$scope.whatson()
	$scope.arts()
	$scope.emu_stats_functions()
	$scope.timeline_shopify_functions()
	
		$scope.$watch('lockstatus', function (status) {
		
  timeline_functions.prettyPrompt('say the magic word', '',"", function(value) {
	
                            if (value!="" && md5(value)=="f1a81d782dea6a19bdca383bffe68452") {
								$scope.unlock=true
	timeline_functions.unlock(true)
							}
							else
							{
							//$scope.lockstatus=true	
								$scope.unlock=false
							timeline_functions.unlock(false)
								
							}
  })
		
  }, true);
	
	$scope.$watch('track_groups|filter:{selected:true}', function (nv) {
    var selection = nv.map(function (track_groups) {
      return track_groups.track;
    });
	timeline_functions.changeTracks(selection)
	$( ".draggable,.iconbar" ).css({ 'top':'0px' });
  }, true);
	
		 $scope.$watch('groups|filter:{selected:true}', function (nv) {
    var selection = nv.map(function (group) {
      return group.content;
    });
	timeline_functions.changeGroups(selection)
	$( ".draggable,.iconbar" ).css({ 'top':'0px' });
  }, true);
			
            })
			
		$scope.exportCSV= function(){
		data_to_export=$rootScope.timeline.itemsData.getDataSet()
		
		visibles=$rootScope.timeline.getVisibleItems()
		events=[]
		
		  _.each(data_to_export._data, function(event,index) {
		
		  if(visibles.indexOf(event.id)!=-1){
		  console.log("in")
		  var _event ={  
						 id			:event.id,
						 name		:event.name,
						 start_date	:moment(event.start).format("DD/MM/YYYY"),
						 end_date	:moment(event.end).format("DD/MM/YYYY"),
					     event_type	:event.track
					   
						}
			 events.push(_event)
				}
		  
		   
		  
		  })
				
		timeline_functions.export_JSON_to_CSV(events, "Timeline dates", true)
	}
	$scope.leaveChanged= function(leave){
				
		
	}
	

				
			$scope.team_leave= function(){
			//reset
			// $rootScope.timeline.setItems($rootScope.rawData);
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_leave_functions.get_eventss().then(function(data) {
					 
						timeline_leave_functions.add_leave(data, function(leave_dates){
							 
							 $rootScope.leave_groups = timeline_functions.loadgroups(leave_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							
							 _.each(leave_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
				$scope.loans= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_loans_functions.get_events().then(function(datax) {
					
						timeline_loans_functions.add_events(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('$rootScope.groups',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
			
				$scope.arts= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_arts_functions.get_events().then(function(datax) {
					
						timeline_arts_functions.add_events(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('arts',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
			
			
			$scope.timeline_shopify_functions= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_shopify_functions.get_events().then(function(datax) {
					
						timeline_shopify_functions.add_events(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('$rootScope.groups',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}	
			$scope.emu_stats_functions= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  emu_stats_functions.get_events().then(function(datax) {
					
						emu_stats_functions.add_events(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('$rootScope.groups',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
			
			
			$scope.learning_bookings= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_learning_functions.get_events().then(function(datax) {
					
						timeline_learning_functions.add_events(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('$rootScope.groups',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
			
					$scope.whatson= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_events_functions.get_events().then(function(datax) {
					
						timeline_events_functions.add_events(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('$rootScope.groups',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
			
			
					$scope.public_events= function(){
			
			 var groups =$rootScope.groups
			 
			  $rootScope.timeline.setGroups(groups);
			  
				  timeline_holidays_functions.get_events().then(function(datax) {
					
						timeline_holidays_functions.add_hols(datax, function(public_dates){
							
							 $rootScope.leave_groups = timeline_functions.loadgroups(public_dates)
							 
						
						
							_.each($rootScope.leave_groups, function(_group) {
								
								$rootScope.groups.push(_group)
							})
							
							 console.log('$rootScope.groups',$rootScope.groups)
							 _.each(public_dates._data, function(date) {
								$rootScope.timeline.itemsData.getDataSet().add(date)
							})
						})
					})
			
			}
  
		       
            $scope.list1 = {
                title: 'PROVISIONAL DATE'
            };
            $scope.list2 = {
                title: 'INSTALL'
            };
            $scope.list3 = {
                title: 'DERIG'
            };

            $scope.onDropComplete = function(data, evt) {
                // console.log("drop success, data:", data);
            }
			
		


        })

    };
