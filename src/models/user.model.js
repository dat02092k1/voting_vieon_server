const mongoose = require('mongoose');
const UtilContainer = require('../shared/constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, // You should hash and salt passwords for security
    isVIP: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: UtilContainer.roleUsers,
        default: UtilContainer.roleUsers[0],
    },
    votesRemaining: { type: Number, default: 0 },  // in day
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
    lastVoteDate: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
