
exports.emu_stats_functions = function ($http,Timeline,$rootScope) {
	
	

  return {
  
     get_events: function() {

	   return $http.get('http://museums.bristol.gov.uk/sync/data/stats.JSON');  //1. this returns  this returns 
    },
  

  	add_events: function (eventss, fn){
	
							
									var visevents = new vis.DataSet();
									var self=this
										var today = new Date()
												
												tempdates=[]
											if( $rootScope.added_track_groups.indexOf("emu stats")==-1){
												$rootScope.added_track_groups.push("emu stats")	
												$rootScope.track_groups.push({"track":"emu stats"})
											}
										var scale_class = "scale_01"
										
										
									
										
										
												$.each(eventss.data.stats, function( index, event ) {	
												
												
												if(event.value>0&&event.value<=10){scale_class="scale_01"}
												if(event.value>10&&event.value<=100){scale_class="scale_02"}
												if(event.value>100&&event.value<=500){scale_class="scale_03"}
												if(event.value>500&&event.value<=1000){scale_class="scale_04"}
												if(event.value>1000&&event.value<=2000){scale_class="scale_05"}
												if(event.value>2000&&event.value<=3000){scale_class="scale_06"}
												if(event.value>3000&&event.value<=4000){scale_class="scale_07"}
												if(event.value>4000&&event.value<=5000){scale_class="scale_08"}
												if(event.value>5000&&event.value<=10000){scale_class="scale_09"}
												if(event.value>10000){scale_class="scale_10"}
												
												
																	end_date=new Date(event.date) 
																	end_date.setDate( end_date.getDate() + 1);
																						
														visevents.add( {content:" ",
														title:event.value+ " records " + event.action,
																		name:"" ,
																		group:event.module,
																		group_id:event.module,
																		event_type:"emu stats",
																		track:"emu stats",
																		order: "emu stats",
																		className:scale_class,
																		start:event.start_date,
																		end:event.end_date,
																		subgroup:event.action,
																		notes 	:	""
															})
															
															
																		
															
																	
												})
														
														
													
													
										  					
										
										return	fn(visevents)

		},
  
  
  
	
	updateOptions: function(options){

		timeline.setOptions(options)
			
				
	},
	updateItem: function(options){
		options.id=$rootScope.selected_t_id
		timeline.itemsData.getDataSet().update(options)
		
				
	},
	
  };
}
