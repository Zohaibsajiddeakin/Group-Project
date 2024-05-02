const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log("Register Request Received:", req.body);
  if (!username || !password) {
    console.log("Error: Please provide both username and password");
    return res.status(400).json({ message: 'Please provide both username and password' });
  }
  User.findOne({ username })
    .then(existingUser => {
      if (existingUser) {
        console.log("Error: Username already exists");
        return res.status(409).json({ message: 'Username already exists' });
      }
      return User.create({ username, password });
    })
    .then(newUser => {
      console.log("User created successfully:", newUser);
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch(err => {
      console.error("Error creating user:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("Login Request Received:", req.body);
  User.findOne({ username, password })
    .then(user => {
      if (!user) {
        console.log("Error: Invalid username or password");
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      console.log("Login successful");
      res.status(200).json({ message: 'Login successful' });
    })
    .catch(err => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Update user profile
app.put('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  User.findByIdAndUpdate(userId, { username, password }, { new: true })
    .then(user => {
      if (!user) {
        console.log("Error: User not found");
        return res.status(404).json({ message: 'User not found' });
      }
      console.log("User profile updated successfully:", user);
      res.status(200).json({ message: 'User profile updated successfully', user });
    })
    .catch(err => {
      console.error("Error updating user profile:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Get user activity logs
app.get('/logs', (req, res) => {
  // Your logs retrieval logic using Mongoose
  Log.find()
    .then(logs => {
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
      res.status(201).json({ message: 'Log added successfully', log });
    })
    .catch(err => {
      console.error("Error adding log:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Delete a log
app.delete('/logs/:id', (req, res) => {
  const logId = req.params.id;
  Log.findByIdAndDelete(logId)
    .then(log => {
      if (!log) {
        console.log("Error: Log not found");
        return res.status(404).json({ message: 'Log not found' });
      }
      console.log("Log deleted successfully:", log);
      res.status(204).end();
    })
    .catch(err => {
      console.error("Error deleting log:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
