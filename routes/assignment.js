var express = require('express');
var router = express.Router();
var Assignment = require('../models/assignment');

router.post('/addassignment', function(req, res, next) {
    Assignment.create(req.body)
        .then((assign) => {
            console.log('assignment added');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(assign);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.get('/view', function(req, res, next) {
    Assignment.find({}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

router.post('/submit', function(req, res, next) {
    Assignment.create(req.body)
        .then((assign) => {
            console.log('assignment added', assign);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(assign);
        }, (err) => next(err))
        .catch((err) => next(err));
});


