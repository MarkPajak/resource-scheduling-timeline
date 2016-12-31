var status = require('http-status');

exports.$user = function($http) {
  var s = {};

  s.loadUser = function() {
    $http.
      get('/api/v1/me').
      success(function(data) {
        s.user = data.user;
      }).
      error(function(data, $status) {
        if ($status === status.UNAUTHORIZED) {
          s.user = null;
        }
      });
  };

  s.loadUser();

  setInterval(s.loadUser, 60 * 60 * 1000);

  return s;
};



exports.Tallys = function($resource){
	

          return $resource('/tallys/:id', null, {
            'update': { method:'PUT' }
          });
 }
 
 exports.Timeline =  function($resource){
		
		 
          return $resource('/timeline/:id', null, {
            'update': { method:'PUT' }
          });
 }
 
 exports.delete_leave_by_id = function(Team,$rootScope){
 
 
 var delete_leave_by_id = {};
 
 
 delete_leave_by_id._delete  = function(leave_id){
 
 ids_to_delete=[]
 ids_to_delete.push(leave_id)
 
 		 Team.query({}, function(team) {
				_.each(team, function(_team,i) {
		
												console.log ('before',team[i].leave_taken)
												new_leave=[]
											new_ids=[]	
											_.each(team[i].leave_taken, function(leave_me,index) {
											
													if( ids_to_delete.indexOf(leave_me._id)==-1 && new_ids.indexOf(leave_me._id)==-1){
														new_leave.push(leave_me	)	
														new_ids.push(	leave_me._id)													
													 }
												
											})
							
											team[i].leave_taken=new_leave
											
											console.log ('after',team[i].leave_taken)
							
											Team.update({
											id:_team._id,				
											}, team[i]);
											
											$rootScope.me_Data=team[i]
							
							
		
		 
						
           
        
						
				})
			})
 
 
 }
 
  return delete_leave_by_id;
 }
 
 exports.Leave =  function($resource){
	  
		 
          return $resource('/leave/:id', null,
		  { 'get':    {method:'GET'},  // get individual record
			  'save':   {method:'POST'}, // create record
			  'query':  {method:'GET', isArray:true}, // get list all records
			  'remove': {method:'DELETE'}, // remove record
			    'update': { method:'PUT' },
			  'delete': {method:'DELETE'} // same, remove record
          });

  }
  
 exports.Timeline =  function($resource){
		
			 
          return $resource('/timeline/:id', null,
		  { 'get':    {method:'GET'},  // get individual record
			  'save':   {method:'POST'}, // create record
			  'query':  {method:'GET', isArray:true}, // get list all records
			  'remove': {method:'DELETE'}, // remove record
			    'update': { method:'PUT' },
			  'delete': {method:'DELETE'} // same, remove record
          });
}
		
 exports.Team =  function($resource){
	 
		 
          return $resource('/team/:id', null,
			{ 'get':    {method:'GET'},  // get individual record
			  'save':   {method:'POST'}, // create record
			  'query':  {method:'GET', isArray:true}, // get list all records
			  'remove': {method:'DELETE'}, // remove record
			    'update': { method:'PUT' },
			  'delete': {method:'DELETE'} // same, remove record
          });
 }
 
  exports.Todos =  function($resource){
        
        
          return $resource('/todos/:id', null, {
            'update': { method:'PUT' }
          });
  }
		
		
	