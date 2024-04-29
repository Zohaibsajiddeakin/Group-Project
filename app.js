const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let users = [];
let logs = [];

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
    const isExistingUser = users.find(user => user.username === username);
    if (isExistingUser) {
        console.log("Error: Username already exists");
        return res.status(409).json({ message: 'Username already exists' });
    }
    const newUser = {
        id: users.length + 1,
        username: username,
        password: password
    };
    users.push(newUser);
    console.log("User created successfully:", newUser);
    res.status(201).json({ message: 'User created successfully' });
});

// User Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login Request Received:", req.body);
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        console.log("Error: Invalid username or password");
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log("Login successful");
    res.status(200).json({ message: 'Login successful' });
});

// Update user profile
app.put('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { username } = req.body;
    console.log("Update Profile Request Received:", req.body);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        console.log("Error: User not found");
        return res.status(404).json({ message: 'User not found' });
    }
    users[userIndex].username = username;
    console.log("User profile updated successfully:", users[userIndex]);
    res.status(200).json({ message: 'User profile updated successfully' });
});

// Get user activity logs
app.get('/logs', (req, res) => {
    console.log("Request for logs received");
    res.status(200).json({ logs });
});

// Add a log
app.post('/logs', (req, res) => {
    const { user_id, activity } = req.body;
    console.log("Log Request Received:", req.body);
    logs.push({ user_id, activity, created_at: new Date() });
    console.log("Log added successfully:", logs[logs.length - 1]);
    res.status(201).json({ message: 'Log added successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
