   
        angular.module('app').config(['$routeProvider', function ($routeProvider) {
          $routeProvider
            .when('/-:view', {
              templateUrl: '../views/trello.html',
              controller: 'trello'
            })
			
			 .when('/', {
              templateUrl: '../views/dashboard.html',
              controller: 'boardCtrl'
           })
		   
		    .when('/downtime/:kiosk', {
              templateUrl: '../views/downtime.html',
              controller: 'downtimeCtrl'
           })
		     .when('/downtime', {
              templateUrl: '../views/downtime.html',
              controller: 'downtimeCtrl'
           })
		   .when('/activity', {
              templateUrl: '../views/downtime.html',
              controller: 'downtimeCtrl'
           })
		   
		    .when('/feedback', {
              templateUrl: '../views/feedback.html',
              controller: 'feedbackCtrl'
           })
		   
		   
		   
		     .when('/dead', {
              templateUrl: '../views/dead.html',
              controller: 'deadCtrl'
           })
		   
		       .when('/people', {
              templateUrl: '../views/people.html',
              controller: 'peoplecounter'
           })
		   
		    .when('/todo', {
              templateUrl: '../views/page-feedback.html',
              controller: 'form_to_trellox'
           })
		     .when('/timeline', {
              templateUrl: '../views/timeline-page.html',
              controller: 'timeline_controller'
           })
			.otherwise({
         templateUrl: '../views/dashboard.html',
              controller: 'boardCtrl'
    });
          
        }]);