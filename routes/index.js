const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser');
urlencodedParser = bodyParser.urlencoded({ extended: false });
const upload = require('../config/multer');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
        res.redirect('/settings/' + username1)
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
        res.redirect('/settings/' + user.username);
    } else{
        User.findOneAndUpdate({_id: user.id}, {avatar: avatar},(err, user) => {
            if(err){
                res.send(err)
            } else{
                req.flash('success', 'Profile Picture Successfully Changed');
                res.redirect('/settings/' + user.username)
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
                res.redirect('/settings/' + user.username)
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
                res.redirect('/settings/' + user.username);
            }
        })
})

router.post('/details', ensureAuthenticated, urlencodedParser,[
    check('username').custom((value, {req}) => {
        return new Promise((resolve, reject) => {
            User.findOne({username :req.body.username}, function(err, user){
                if(err) {
                    reject(new Error('Server Error'))
                }
                if(Boolean(user)) {
                    reject(new Error('Username already in use'))
                }
                resolve(true)
            });
        });
    }),
], (req, res) => {
    var user = req.user;
    const {name} = req.body;

    let username
    if(req.body.username){
        username = req.body.username;
    } else {
        username = user.username;
    } 

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', 'Username already in use');
        res.redirect('/' + user.username + "/edit-profile");
    } else {
        User.findOneAndUpdate({_id: user.id}, {"$set": {"name": name, "username": username}}, (err, result) => {
            if(err){
                res.send(err);
            } else {
                User.findOne({_id: user.id}, (err, result) => {
                    if(err){
                        res.send(err);
                    } else{
                        var usernameFinal = result.username 
                        req.flash('success', 'Details successfully updated');
                        res.redirect('/settings/' + usernameFinal);
                    }
                })
            }
        })
    }
})

// Password
router.post('/password', ensureAuthenticated, urlencodedParser, (req, res) => {
    const {original, password} = req.body;
    var user = req.user;

    bcrypt.compare(original, user.password, (err, isMatch) => {
        if(err){
            throw err;
        } else if (isMatch) {
            User.findOne({_id: user.id}, (err, user) => {
                if(err){
                    res.send(err);
                } else{
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            throw err
                        } else {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                if (err) {
                                    throw err
                                } else {
                                    req.body.password = hash;
                                    User.findOneAndUpdate({_id: user.id}, {password: req.body.password}, (err, result) => {
                                        if (err) {
                                            res.send(err);
                                        } else {
                                            req.flash("success", "Password has been Changed");
                                            res.redirect("/settings/" + user.username)
                                        }
                                    });   
                                }
                            });
                        }
                    });  
                }
            });
        } else {
            req.flash('error', 'Password is invalid');
            res.redirect("/settings/" + user.username);
        }
    });
})

// Settings
router.get('/settings/:username', ensureAuthenticated, (req, res) => {
    var username1 = req.params.username;
    var username2 = req.user.username;

    if(username1 == username2){
        res.render('settings', {
            user: req.user
        })
    } else{
        req.flash("you are not Authorized to Access this Route")
        res.redirect('/home')
    }
});

module.exports = router;