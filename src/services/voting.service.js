'use strict';

const Vote = require('../models/vote.model');
const Constestant = require('../models/contestant.model');
const User = require('../models/user.model');
const {Api403Error, BusinessLogicError, Api401Error} = require('../core/error.response');

class VotingService {
    static createVote = async (data) => {
        const {candicateId, user} = data;

        const targetUser = await User.findOne({'_id': user.userId});

        if (!targetUser) throw new Api403Error('User not found');

        const now = new Date();
        const lastVoteDate = targetUser.lastVoteDate || new Date(0);

        if (now - lastVoteDate < 24 * 60 * 60 * 1000 || targetUser.votesRemaining < 1) {
            throw new Api403Error('You can vote only once a day.');
        }

        const rapper = await Constestant.findOne({'candicateId': candicateId});

        if (!rapper) throw new Api404Error('Rapper not found');

        // Create a new vote document and save it
        const newVote = new Vote({
            contestant: rapper._id,
            user: user.userId,
        });

        await newVote.save();

        if (targetUser.votesRemaining > 0) targetUser.votesRemaining--;

        targetUser.votes.push(newVote._id); // Add the vote to the user's votes array
        targetUser.lastVoteDate = now;

        await targetUser.save();

        rapper.votes.push(newVote._id); // Add the vote to the rapper's votes array
        await rapper.save();

        return {
            message: 'Vote successfully',
        }
    }

    static getAll = async () => {
        return {
            users: await User.find(),
        }
    }
}

module.exports = VotingService;