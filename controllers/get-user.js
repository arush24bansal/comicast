const express = require('express');
const User = require('../models/User');

const controller = async (req, res) => {
    const users = await User.find(req.User);
    res.render('profile-user', {users: users}); 
}

module.exports = controller;