var express = require('express');
var router = express.Router();
var Assignment =  require('../models/assignment');
const cors = require('./cors');

router.get('/assignments',cors.cors, (req, res, next) => {
  Assignment.find({}).populate('class').sort('number').exec((error,result) => {
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.post('/addassignment', cors.cors, (req, res, next) => {
  Assignment.create(req.body).then((assignment) => {
    console.log('assignment added',assignment);
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(assignment);
  },(err) => next(err)
  ).catch((err) => next(err));
});

router.delete('/deleteassignment/:aid', cors.cors, (req, res, next) => {
  Assignment.findByIdAndRemove(req.params.aid, (error, assignment) => {
    if(error) {
      return next(error);
    }
    res.json(assignment);
  });
});

router.put('/updateassignment/:aid', cors.cors, (req, res, next) => {
  Assignment.findOneAndUpdate({_id: req.params.aid},{
    "$push" :{
      "questions" : req.body 
    }
  },{new: true, upsert: false}, function(error,result) {
    if (error) {
      return next(error);
    }
    res.json(result);
  });
});

module.exports = router;