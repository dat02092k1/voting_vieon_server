// models/vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    contestant: { type: mongoose.Schema.Types.ObjectId, ref: 'Contestant' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);
