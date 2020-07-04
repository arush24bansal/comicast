const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/home', ensureAuthenticated, (req, res) => {
    res.render('home', {
        user: req.user
    });
});

// Profile Page
router.get('/user/:username', ensureAuthenticated, (req, res) => {
    var username1 = req.params.username
    var username2 = req.user.username

    if(username1 == username2){
        res.render('user_self',{
            user : req.user
        });
    } else {
        User.findOne({username: username1}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.render("user_others", {
                    user: req.user,
                    user2: result
                })
        }});
    }
});

//  Edit Profile
router.get('/edit-profile/:username', ensureAuthenticated, (req, res) => {
})

module.exports = router;
