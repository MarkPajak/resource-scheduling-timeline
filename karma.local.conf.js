module.exports = function(config) {
  config.set({
    files: [
      'http://code.jquery.com/jquery-1.11.3.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
      // For ngMockE2E
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-mocks.js',
      './public/js/directives/directives.js',
      './test/karma-test.js',
      { pattern: './public/js/templates/*.html', included: false, served: true }
    ],
	
	ngHtml2JsPreprocessor: {
      // strip this from the file path 
      stripPrefix: 'public/',
      // prepend this to the 
      prependPrefix: 'served/',
 
      // or define a custom transform function 
      cacheIdFromPath: function(filepath) {
        return cacheId;
      },
 
      // setting this option will create only a single module that contains templates 
      // from all the files, so you can load them all with module('foo') 
      moduleName: 'foo'
    },

    frameworks: ['mocha', 'chai'],
    browsers: ['Google Chrome'],
    port: 9876,
    proxies : {
      '/assessment': 'http://d1g1t.al:9876/base/'
    }
  });
};
