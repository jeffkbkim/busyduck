//to access mongodb shell:
//mongo "mongodb://pocha-shard-00-00-upvmz.mongodb.net:27017,pocha-shard-00-01-upvmz.mongodb.net:27017,pocha-shard-00-02-upvmz.mongodb.net:27017/test?replicaSet=Pocha-shard-0" --authenticationDatabase admin --ssl --username superuser --password G2fOzqDqKIb8yTIC

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var WorkPosition = require('../models/work-position');

router.get('/:userId', function(req, res, next) {
    const userId = req.params.userId;
    WorkPosition.find({employees : userId})
        .exec(function(err, workPositions) {
            if(err) {
                return res.status(500).json({
                    title: 'an error has occurred',
                    error: err
                });
            }
            console.log(userId);
            console.log(workPositions);
            res.status(200).json({
                message: 'Success',
                obj: workPositions
            });
        });
});

router.patch('/:userId', function (req, res, next) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: "an error has occurred",
                error: err
            })
        }

        WorkPosition.findOne({workplace: req.body.workplace, type: req.body.type}, function(err, workPosition) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            user.workPositions.push(workPosition);
            user.save();
            res.status(201).json({
                message: 'updated work position',
                object: workPosition
            });
        });



    });
});

module.exports = router;