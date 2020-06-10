const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator/check');
urlencodedParser = bodyParser.urlencoded({ extended: false });
const upload = require('../config/multer');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => { 
    res.render('login', { error: req.flash('error')});
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Register Information
router.post('/register', forwardAuthenticated, urlencodedParser, upload, [
    check('password', 'Password should be minimum 8 characters').isLength({ min: 8 }),
    check('email').custom((value, {req}) => {
        return new Promise((resolve, reject) => {
            User.findOne({email:req.body.email}, function(err, user){
                if(err) {
                    reject(new Error('Server Error'))
                }
                if(Boolean(user)) {
                    reject(new Error('E-mail already in use'))
                }
                resolve(true)
            });
        });
    }),
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
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
], 
function(req, res){
    const { name, username, email, password, password2, dateOfBirth, gender, country, about, website} = req.body;
    let avatar;
    if(req.file){
        avatar = req.file.filename;
    } 

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('register', {errors:errors.array()});
        console.log(errors);
    } else{
        var newUser = new User({
            name: name,
            username: username,
            email: email,
            password: password,
            dateOfBirth: dateOfBirth,
            gender: gender,
            country: country,
            about: about,
            website: website,
            avatar: avatar,
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    req.flash('success', 'You are now registered and can log in');
                    res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
    });
    };
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/users/login',
        failureFlash: true
    })
    (req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});

router.get('/profile', (req, res) => {
    res.render('./profile-user')
});

module.exports = router;