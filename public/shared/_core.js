'use strict';
/* app */
require('angular')


global.jQuery  =require('jquery')
global._  =require('underscore')
//global.underscore  =require('underscore')

require('jqueryui')
require('jquery-ui-touch-punch')
require('angular-dragdrop')


require('angular-route')
require('angular-resource')
require('angular-utils-pagination')
require('angular-aria')

require('ng-scrollbar')
require('angular-material')
require('angular-sanitize')

require('angulargrid')
require('api-check')
require('angular-formly')
require('angular-formly')
require('moment')
require('bootstrap-daterangepicker')
require('moment')
require('angular-bootstrap')

require('angular-chart')
require('../lib/angular-chart.js')
require('../lib/angular-daterangepicker.js')
var chartjs = angular.module('chartjs', []);	
var daterangepicker = angular.module('daterangepicker', []);		


require('angular-material-data-table')
require('angular-formly-templates-bootstrap')
require('vis')




var controllers = require('../shared/controllers/controllers');
var dead_controllers = require('../components/machine-monitor/dead-controller');




var dashboard_controllers = require('../components/machine-monitor/dashboard-controller');
var feedback_controllers = require('../components/machine-monitor/feedback-controller');
var downtime_controllers = require('../components/machine-monitor/downtime-controller');


var app_controllers = require('../components/team/app-controllers');
var leave_controllers = require('../components/team/leave-controller');
var team_controllers = require('../components/team/team-controller');
var form_controllers = require('../components/team/form-controller');
var timeline_controllers = require('../components/timeline/timeline-controller');


var directives = require('../shared/directives/directives');
var data_services = require('../shared/services/data-services');
var app_services = require('../shared/services/app-services');

var timeline_services = require('../components/timeline/timeline-services');
var timeline_leave_services = require('../components/timeline/timeline-leave-services');
var timeline_arts_services = require('../components/timeline/timeline-arts-services');
var timeline_events_services = require('../components/timeline/timeline-events-services');
var timeline_holidays_services = require('../components/timeline/timeline-holidays-services');
var timeline_learning_services = require('../components/timeline/timeline-learning-bookings-services');
var timeline_loans_services = require('../components/timeline/timeline-loans-services');

var downtime_services = require('../components/machine-monitor/downtime-services');
var feedback_services = require('../components/machine-monitor/feedback-services');

	var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

	var animateApp = angular.module('animateApp', []);
	
	
	
	var app =  angular.module('app', [
		
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'angularUtils.directives.dirPagination',
		'underscore',
		'ngScrollbar',
		'ngMaterial',		
		'angularGrid',
		"ngSanitize",
		'formly', 
		'formlyBootstrap',
		'daterangepicker',
		'ngDragDrop',
		'md.data.table',
		'chartjs'
		
		])
		
	  angular.module('app').config(require("../shared/routes/app-routes.js"))	

_.each(controllers, function(controller, name) {
  app.controller(name, controller);
});


_.each(app_controllers, function(controller, name) {
  app.controller(name, controller);
});

_.each(leave_controllers, function(controller, name) {
  app.controller(name, controller);
});

_.each(team_controllers, function(controller, name) {
  app.controller(name, controller);
});
_.each(form_controllers, function(controller, name) {
  app.controller(name, controller);
});
_.each(timeline_controllers, function(controller, name) {
  app.controller(name, controller);
});







 _.each(directives, function(directive, name) {
  app.directive(name, directive);
});





_.each(data_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(app_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(downtime_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(feedback_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_leave_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_arts_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_events_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_holidays_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_learning_services, function(factory, name) {
  app.factory(name, factory);
});
_.each(timeline_loans_services, function(factory, name) {
  app.factory(name, factory);
});


	
		app.filter('orderByDayNumber', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

app.config(["$locationProvider", function($locationProvider)
{
/*
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
*/

}]);

app.config(function config(formlyConfigProvider) {


  formlyConfigProvider.setType([
  {
    name: 'radio',
	overwriteOk:true,
    templateUrl: 'views/formly-radio.html'
  },
  {
    name: 'button',
    templateUrl: '<button ng-click="options.templateOptions">{{options.label}}</button>'
  }
]);

  formlyConfigProvider.setType({
    name: 'input',
	overwriteOk:true,
    template: '<input class="form-control_CHEESE" ng-model="model[options.key]">',
    wrapper: ['helper', 'bootstrapLabel', 'bootstrapHasError']
  });
  

  
  formlyConfigProvider.setType({
    name: 'file',
     templateUrl: 'views/formly-file.html'
  });

});
