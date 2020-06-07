const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator/check');
const flash = require('connect-flash');
urlencodedParser = bodyParser.urlencoded({ extended: false });
const getUser = require('../controllers/get-user');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => { 
    res.render('login', { error: req.flash('error')});
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Register Information
router.post('/register', forwardAuthenticated, urlencodedParser, [
    check('name','Name is required').notEmpty(), 
    check('username','Username is required').notEmpty(), 
    check('email','Email is required').notEmpty(), 
    check('email','Email is not valid').isEmail(),
    check('password','Please enter a password').notEmpty(),
    check('dateOfBirth','Please mention your Date of Birth').notEmpty(), 
    check('gender', 'Please mention your gender').notEmpty(),
    check('country', 'Please mention your country of residence').notEmpty(), 
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
], 
function(req, res){
    const { name, username, email, password, password2, dateOfBirth, gender, country, about, website} = req.body;

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
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                );
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
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

router.get('/profile', getUser);

module.exports = router;