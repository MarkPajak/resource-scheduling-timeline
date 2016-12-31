
exports.timeline_holidays_functions = function ($http,Timeline,$rootScope) {

  return {
  
     get_events: function() {
		 
		 /*
		 'https://www.googleapis.com/calendar/v3/calendars/en.uk#holiday@group.v.calendar.google.com/events?key=AIzaSyDi8arJr4JvnETpZVylXUVpxZDyBHNkQyk';
				  */
				  
		 	 var SheetToJSONServiceURL = "https://www.gov.uk/bank-holidays.json"
			 
			 
			 console.log(SheetToJSONServiceURL)
			 
      return $http.get(SheetToJSONServiceURL);  //1. this returns promise
    },
  
  
  
  	add_hols: function (eventss, fn){
	
								
									var visevents = new vis.DataSet();
									var self=this
										var today = new Date()
												var names=[];
												var name=[];
												var lastname="";
												var start_date="";
												var start_date="";
												var oldName="";
												var lastfrom_date="";
												var lastto_date="";
												var mylastfrom_date
												var currentStartDate;
												
												tempdates=[]
											if( 	$rootScope.added_track_groups.indexOf("public holidays")==-1){
												$rootScope.added_track_groups.push("public holidays")														
													$rootScope.track_groups.push({"track":"public holidays"})
													}
												
												$.each(eventss.data['england-and-wales'].events, function( index, event ) {	
																	end_date=new Date(event.date) 
																	end_date.setDate( end_date.getDate() + 1);
														if(	event.title!=""){											
														visevents.add( {content:event.title  ,
																		name:event.title  ,
																		group:"public holidays",
																		group_id:"public holidays"+"public holidays",
																		//id:event.id,
																		event_type:"public holidays",
																		track:"public holidays",
																		order: "public holidays",
																		className:"blue",
																		start:event.date,
																		end:end_date,
																		subgroup:"na",
																		notes 	:	event.notes
																		})
																		}
																		/*
																		group:value.group,
																		id:value.id,
																		event_type:"leave",
																		track:"leave",
																		order: "leave",
																		subgroup: value.name,
																		start:value.start_date,
																		end:value.end_date,
																		className 	:	"orange"
																		*/
																	
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
