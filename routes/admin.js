var express = require('express');
var router = express.Router();
var Student =  require('../models/student');
var Teacher =  require('../models/teacher');
var Class =  require('../models/class');

/* all GET admin routes */
router.get('/', function(req, res, next) {
  res.send('admin router - dashboard');
});

router.get('/class', function(req, res, next) {
  Class.find({}).populate('teacher').populate('students.sid').exec(function(error,result){
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.get('/teacher', function(req, res, next) {
  Teacher.find().sort('name').exec(function(error,result) {
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.get('/student', function(req, res, next) {
  Student.find().sort('name').exec(function(error,result) {
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.get('/class/:cid', function(req, res, next) {
  Class.find({_id: req.params.cid}).populate('teacher').populate('students.sid').exec(function(error,result){
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.get('/teacher/:tid', function(req, res, next) {
  Teacher.findById(req.params.tid).then((teacher)=>{
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(teacher);
  },(err)=> next(err)
  ).catch((err)=>next(err));
});

router.get('/student/:sid', function(req, res, next) {
  Student.findById(req.params.sid).then((std)=>{
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(std);
  },(err)=> next(err)
  ).catch((err)=>next(err));
});

/* all POST admin routes */
router.post('/addclass', function(req, res, next) {
  Class.create(req.body).then((result)=>{
    console.log('class added',result);
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(result);
  },(err)=> next(err)
  ).catch((err)=>next(err));
});

router.post('/addteacher', function(req, res, next) {
  Teacher.create(req.body).then((teacher)=>{
    console.log('teacher added',teacher);
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(teacher);
  },(err)=> next(err)
  ).catch((err)=>next(err));
});

router.post('/addstudent', function(req, res, next) {
  Student.create(req.body).then((student)=>{
    console.log('student added',student);
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.json(student);
  },(err)=> next(err)
  ).catch((err)=>next(err));
});

/* all PUT admin routes */
router.put('/class/:cid/student/:sid', function(req, res, next) {
  Class.findOneAndUpdate({_id: req.params.cid},{
    "$push" :{
      "students" : { "sid": req.params.sid }
    }
  },{new: true, upsert: false}, function(error,result) {
    if (error) {
      return next(error);
    }
    res.json(result);
  });
});

router.put('/class/:cid/teacher/:tid', function(req, res, next) {
  Class.findOneAndUpdate({_id: req.params.cid},{teacher: req.params.tid}, function(error, result) {
    if (error) {
      return next(error);
    }
    res.json(result);
  });
});
router.put('/class/:cid/', function(req, res, next) {
  res.send('update class info');
});

/* all DELETE admin routes */
router.delete('/delclass/:cid', function(req, res, next) {
  Class.deleteOne({_id: req.params.cid}, function(error, result) {
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.delete('/delteacher/:tid', function(req, res, next) {
  Teacher.deleteOne({_id: req.params.tid}, function(error, result) {
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

router.delete('/delstudent/:sid', function(req, res, next) {
  Student.deleteOne({_id: req.params.sid}, function(error, result) {
    if(error) {
      return next(error);
    }
    res.json(result);
  });
});

module.exports = router;