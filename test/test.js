var assert = require('assert');
var app =  require('../app.js');


describe('my feature', function() {
  it('works', function() {
  ;
  });

  it('fails gracefully', function() {
    assert.throws(function() {
      throw 'Error!';
    });
  });
});



describe('my other feature', function() {
  it('async', function(done) {
    setTimeout(function() {
      done();
    }, 25);
  });
});