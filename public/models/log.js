const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    action: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
