const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Import the User model
const User = require('./models/user');

// Controllers
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

// MongoDB connection
mongoose.connect('mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    next(); // User is logged in, proceed to next middleware or route handler
  } else {
    res.redirect('/login'); // User is not logged in, redirect to login page
  }
};

// Routes

// Serve index.html as the default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Route to handle updating the password
app.post('/profile/update-password', isLoggedIn, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.session.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Verify the current password
    if (!user || user.password !== currentPassword) {
      // Redirect to profile page with error message if current password is invalid
      return res.redirect('/profile?passwordUpdateStatus=error');
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Redirect to profile page with success message after successful password update
    res.redirect('/profile?passwordUpdateStatus=success');
  } catch (error) {
    console.error('Error updating password:', error);
    // Redirect to profile page with error message if an error occurs
    res.redirect('/profile?passwordUpdateStatus=error');
  }
});

// Serve profile.html as the profile route
app.get('/profile', (req, res) => {
  // Render the profile page template with password update status
  res.sendFile(path.join(__dirname, '/profile.html'));
});

// Your route handlers
app.post('/login', userController.loginUser);
app.post('/register', userController.registerUser);
app.get('/logout', userController.logoutUser); // Add logout route
app.put('/profile/:id', isLoggedIn, userController.updateProfile); // Protect profile update route
app.get('/logs', logController.getLogs);
app.post('/logs', logController.addLog);
app.delete('/logs/:id', logController.deleteLog);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});






