var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var WorkPosition = require('../models/work-position');

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