const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    activity: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
