const User = require('../models/user');

exports.registerUser = async (req, res) => {
    // Registration logic using User model
};

exports.loginUser = async (req, res) => {
    // Login logic using User model
};

exports.updateProfile = async (req, res) => {
    // Profile update logic using User model
};

exports.logoutUser = async (req, res) => {
    // Logout logic
    // Assuming you're using a library like Passport.js for authentication
    req.logout(); 
    // Redirect the user to the home page after logout
    res.redirect('/');
};

