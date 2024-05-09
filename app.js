const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http'); 
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
// Controllers
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login'); // Redirect to the login page
});


// MongoDB connection
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.put('/profile/:id', userController.updateProfile);
app.get('/logs', logController.getLogs);
app.post('/logs', logController.addLog);
app.delete('/logs/:id', logController.deleteLog);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
