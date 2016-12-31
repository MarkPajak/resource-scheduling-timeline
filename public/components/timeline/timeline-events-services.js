
exports.timeline_events_functions = function ($http,Timeline,$rootScope) {


  return {
  
    get_events: function() {
      return $http.get('http://museums.bristol.gov.uk/sync/data/events.JSON');  //1. this returns promise
    },
  
  
  
  	add_events: function (eventss, fn){
											var checked_event_types=[]
											checked_event_types.push('Tour')
											checked_event_types.push('Walk')
											checked_event_types.push('Rides')
											checked_event_types.push('Tours')
											checked_event_types.push('Talk')
											checked_event_types.push('Lecture')
											checked_event_types.push('Special Event')
											checked_event_types.push('Event')
											checked_event_types.push('Family')

								
											var visevents = new vis.DataSet();
											var self=this
											var today = new Date()
											
									$.each(eventss.data.events, function( index, eventx ) {					
												
											var end_date=new Date(eventx.endDate)
											
											if(eventx.endDate==""||eventx.endDate==eventx.startDate){
										
											var end_date=new Date(eventx.startDate)
											end_date.setDate(end_date.getDate() + 1)
										
											}
										
											var event_image=false
											var event_image_irn
											if(eventx.images){
											if(eventx.images[0]){
												event_image=true
												event_image_irn=eventx.images[0].irn
												}
											}
												
											var htmlContent =  self.event_html(eventx.name,event_image,event_image_irn,eventx.startDate,eventx.endDate)
										
											if($rootScope.added_track_groups.indexOf("What's On")==-1){
												$rootScope.added_track_groups.push("What's On")	
												$rootScope.track_groups.push({"track":"What's On"})
											}
													if(eventx['type']!="" && checked_event_types.indexOf(eventx.type)!=-1 && new Date(eventx.startDate)){
										
													visevents.add({
																		group		:	eventx.type||"NA" , 
																		group_id		:	eventx.type+"What's On"||"NA" , 
																		select_group :false,
																		title		:	eventx.name,
																		name:eventx.name,
																		type		: "background",
																		content		:	htmlContent,
																		order		:"What's On",
																		track		:"What's On",
																		start		:	new Date(eventx.startDate), 
																		end			:	end_date, 
																		className 	:	"green",
																		event_type  :   "What's On"
												})
												}
																		
											//}
											
											
											})	
			
											
											
											
											
											
										
														
														
													
													
										  					
										
										return	fn(visevents)

		},

   		 event_html: function(name,showimage,image,start_date,end_date,notes ){
			var notes=notes ||""
				var htmlContent = '<div class="titlediv" >'
																htmlContent+='<div class="title_heading">'
																htmlContent+=name
																htmlContent+='</div>';
																htmlContent+="<span> ";
																htmlContent+=start_date+ "-" + end_date;
																htmlContent+="<span>";
																htmlContent+="<p>"+notes
																
																if(showimage){
																	htmlContent+='<div class="image_box">'
																	htmlContent+='<img src="http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn='+image +'&height=50&format=jpeg" />'
																	htmlContent+='</div>'	
																}													
													htmlContent+= '</div>'
													
			return htmlContent

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
