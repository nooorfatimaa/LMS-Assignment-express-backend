var express = require('express');
var router = express.Router();
var Assignment =  require('../models/assignment');
const cors = require('./cors');

router.get('/assignments', cors.cors, function(req, res, next) {
  Assignment.find({}).populate('class').exec(function(error,result){
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.post('/addassignment', cors.cors, function(req, res, next) {
  Assignment.create(req.body).then((assignment)=>{
    console.log('assignment added',assignment);
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(assignment);
  },(err)=> next(err)
  ).catch((err)=>next(err));
});

router.delete('/deleteassignment/:aid', cors.cors, function(req, res, next) {
  Assignment.deleteOne({_id: req.params.aid}, function(error, result) {
    if(error) {
      return next(error);
    }
    res.json(assignment);
  });
});

module.exports = router;