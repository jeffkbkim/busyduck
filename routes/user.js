var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* POST signup page. */
router.post('/', function(req, res, next) {
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        isAdmin : req.body.isAdmin,
        password : bcrypt.hashSync(req.body.password, 10), //should use SSL
        email : req.body.email
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error has occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {

    //retrieve user
   User.findOne({email: req.body.email}, function(err, user) {
       if (err) {
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }

       //if no user found
       if (!user) {
           return res.status(401).json({
               title: 'Login Failed',
               error: {message: 'Invalid login credentials.'}
           });
       }

       //if password is incorrect
       if (!bcrypt.compareSync(req.body.password, user.password)) {
           return res.status(401).json({
               title: 'Login Failed',
               error: {message: 'Invalid login credentials.'}
           });
       }

       //if admin level is incorrect
       if (req.body.isAdmin !== user.isAdmin) {
           return res.status(401).json({
               title: 'Login Failed',
               error: {message: 'Invalid login credentials.'}
           })
       }

       //if password is correct
       var token = jwt.sign({user: user}, 'secret'/*, {expiresIn: 7200} */);
       res.status(200).json({
           message: 'Successfully logged in!',
           token: token,
           userId: user._id,
           isAdmin: user.isAdmin
       });
   });
});

router.use('/', function (req, res, next) {
    console.log(req.query.token);
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'and error has occurred',
                error: err
            })
        }
        res.status(201).json({
            title: 'User retrieved',
            user: user
        });
    });
});

router.put('/updatePassword', function (req, res, next) {

    //if user does not exist
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        //if password is incorrect
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials.'}
            });
        }


        //if password is correct -> change password
        user.password = bcrypt.hashSync(req.body.newPassword);
        user.save(function (error, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }

            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Successfully updated password!',
                token: token
            });
        });
    });
});




module.exports = router;
