const Log = require('../models/log');

exports.getLogs = async (req, res) => {
    try {
        console.log("Fetching logs...");
        const logs = await Log.find();
        console.log("Logs:", logs);
        res.status(200).json({ logs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.addLog = async (req, res) => {
    try {
        const { user_id, activity } = req.body;
        const newLog = await Log.create({ user_id, activity });
        res.status(201).json({ message: 'Log added successfully', log: newLog });
    } catch (error) {
        console.error("Error adding log:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteLog = async (req, res) => {
    try {
        const logId = req.params.id;
        const deletedLog = await Log.findByIdAndDelete(logId);
        if (!deletedLog) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json({ message: 'Log deleted successfully', log: deletedLog });
    } catch (error) {
        console.error("Error deleting log:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};