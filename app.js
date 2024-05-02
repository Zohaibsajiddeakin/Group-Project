const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema
const LogSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  activity: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', LogSchema);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Register a new user
app.post('/register', (req, res) => {
  console.log("Registration Request Received:", req.body);
  // Registration logic
  if (registrationSuccessful) {
    console.log("Registration Successful");
  } else {
    console.log("Registration Unsuccessful");
  }
});

// User Login
app.post('/login', (req, res) => {
  console.log("Login Request Received:", req.body);
  // Login logic
  if (loginSuccessful) {
    console.log("Login Successful");
  } else {
    console.log("Login Unsuccessful");
  }
});

// Update user profile
app.put('/profile/:id', (req, res) => {
  console.log("Profile Update Request Received:", req.body);
  // Profile update logic
  if (profileUpdateSuccessful) {
    console.log("Profile Update Successful");
  } else {
    console.log("Profile Update Unsuccessful");
  }
});

// Get user activity logs
app.get('/logs', (req, res) => {
  Log.find()
    .then(logs => {
      console.log("Retrieved logs:", logs); // Log the retrieved logs
      res.status(200).json({ logs });
    })
    .catch(err => {
      console.error("Error fetching logs:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Add a log
app.post('/logs', (req, res) => {
  const { user_id, activity } = req.body;
  Log.create({ user_id, activity })
    .then(log => {
      console.log("Log added successfully:", log);
      // Emit new log event to all connected clients
      io.emit('logAdded', log);
      res.status(201).json({ message: 'Log added successfully', log });
    })
    .catch(err => {
      console.error("Error adding log:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Delete a log
app.delete('/logs/:id', (req, res) => {
  // Log deletion logic
});

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io to HTTP server
const io = socketIo(server);

// Socket.io logic
io.on('connection', (socket) => {
  console.log('New client connected');

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
