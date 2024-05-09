const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const session = require('express-session'); // Import express-session module
const app = express();
const PORT = process.env.PORT || 3000;

// Controllers
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

// MongoDB connection
mongoose.connect('mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session
app.use(session({
  secret: 'your_secret_key_here', // Change this to a secret key
  resave: false,
  saveUninitialized: false
}));

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    next(); // User is logged in, proceed to next middleware or route handler
  } else {
    res.redirect('/login'); // User is not logged in, redirect to login page
  }
};

// Routes
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/logout', userController.logoutUser); // Add logout route
app.put('/profile/:id', isLoggedIn, userController.updateProfile); // Protect profile update route
app.get('/logs', logController.getLogs);
app.post('/logs', logController.addLog);
app.delete('/logs/:id', logController.deleteLog);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
