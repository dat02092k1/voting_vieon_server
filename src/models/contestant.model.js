const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema({
    name: String,
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
    imgUrl: {
        type: String,
        required: true
    },
    description: String,
    candicateId: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Contestant', contestantSchema);