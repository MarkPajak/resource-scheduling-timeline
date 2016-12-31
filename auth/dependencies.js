var fs = require('fs');
var fx = require('../models/fx');
var Stripe = require('stripe');

module.exports = function(wagner) {
	
  var stripe =

  // TODO: Make Stripe depend on the Config service and use its `stripeKey`
  // property to get the Stripe API key.
  wagner.factory('Stripe', function() {
	  
	  	var Config = wagner.invoke(function(Config){
		return Config
	})
	
    return Stripe(Config.stripeKey);
  });

  wagner.factory('fx', fx);

  wagner.factory('Config', function() {
    return JSON.parse(fs.readFileSync('./secret/api_keys.JSON').toString());
  });
};
