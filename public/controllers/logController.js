// logController.js

const Log = require('../models/log');

// Function to get all logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to add a new log
exports.addLog = async (userId, activity) => {
    userId = userId.toString();
    activity = activity.toString();
    try {
      // Create a new log instance
      const newLog = new Log({
        userId: userId,
        action: activity // Use 'activity' here instead of 'action'
      });
  
      // Save the log to the database
      await newLog.save();
      console.log('Log added successfully:', newLog);
  
      // res.status(201).json({ message: 'Log added successfully' });
    } catch (error) {
      console.error('Error adding log:', error);
      const newLog = new Log({
        userId: "Error",
        action: "Failed Creating Log"
      })

      await newLog.save();
      console.log('Log added successfully:', newLog);
      // res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

// Function to delete a log by ID
exports.deleteLog = async (req, res) => {
  const logId = req.params.id;

  try {
    // Find the log by ID and delete it
    await Log.findByIdAndDelete(logId);
    res.status(200).json({ message: 'Log deleted successfully' });
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};