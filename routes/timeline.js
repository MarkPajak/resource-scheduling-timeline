var express = require('express');
var router = express.Router();


var Timeline = require('../models/Timeline.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Timeline.find()
   .sort({'date': 'desc'})
     .exec(function(err, todos) {
  
     if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Timeline.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Timeline.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Timeline.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Timeline.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
