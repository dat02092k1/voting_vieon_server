'use strict';
const cron = require('node-cron');
const User = require('../models/user.model');

// Define a cron job that runs at midnight (00:00) every day
class CollectIssueTask {
    resetVote() {
        cron.schedule('0 0 * * *', async () => {
            // Reset votesRemaining for all users to 1 (or 5 for VIP accounts)
            const users = await User.find();

            for (const user of users) {
                user.votesRemaining = user.isVIP ? 5 : 1;
                await user.save();
            }

            console.log('Votes reset for all users.');
        });
    }
}

module.exports = new CollectIssueTask();