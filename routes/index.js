const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser');
urlencodedParser = bodyParser.urlencoded({ extended: false });
const upload = require('../config/multer');
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
router.get('/:username/edit-profile', ensureAuthenticated, (req, res) => {
    var username1 = req.params.username
    var username2 = req.user.username

    if(username1 == username2){
        res.render('edit_profile', {
            user: req.user
        })
    } else {
        res.send("you are not Authorized to Access this Route")
    }
});

router.post('/profile-picture', ensureAuthenticated, urlencodedParser, upload, 
(req, res) => {
    var user = req.user; 

    let avatar;
    if(req.file){
        avatar = req.file.filename;
    } else{
        avatar = null;
    }

    if(req.fileValidationError) {
        req.flash('error', 'please upload a valid file');
        res.redirect('register');
    } else{
        User.findOneAndUpdate({_id: user.id}, {avatar: avatar},(err, user) => {
            if(err){
                res.send(err)
            } else{
                req.flash('success', 'Profile Picture Successfully Changed');
                res.redirect('/' + user.username + "/edit-profile")
            }
        })
    }
})

router.get('/profile-picture/remove/:id', ensureAuthenticated, (req, res) => {
    var mongoId = req.params.id;
    var user = req.user; 
    var noImage = "noimage.png";

    if(mongoId == user.id){
        User.findOneAndUpdate({_id: mongoId}, {avatar: noImage}, (err, result) => {
            if(err){
                res.send(err)
            } else{
                req.flash('success', 'Profile Picture Successfully Removed');
                res.redirect('/' + user.username + "/edit-profile")
            }
        })
    }
})

router.post('/bio', ensureAuthenticated, urlencodedParser, (req, res) => {
    var user = req.user;
    const {about, website} = req.body;
        User.findOneAndUpdate({_id: user.id}, {"$set": {"about": about, "website": website}}, (err, result) => {
            if(err){
                res.send(err);
            } else {
                req.flash('success', 'bio successfully updated');
                res.redirect('/' + user.username + "/edit-profile");
            }
        })
})

module.exports = router;
