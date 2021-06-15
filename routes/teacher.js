var express = require('express');
var router = express.Router();
var Student =  require('../models/student');
var Teacher =  require('../models/teacher');
var Class =  require('../models/class');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('teacher router');
});

module.exports = router;