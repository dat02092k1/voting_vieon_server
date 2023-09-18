const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const User = require("../models/user.model")
const Constestant = require("../models/contestant.model")
const Vote = require("../models/vote.model")
const utilContainers = require("../shared/constants");
require('../database/init.mongodb');

// will make api & pass candicates_id as parameters later
const seeding = async () => {
    // try catch
    try {
        const users = await User.find({votesRemaining: { $gt: 0 }});
        const contestant = await Constestant.findOne({candicateId: utilContainers.candicateIds.HCH});

        for (let i = 0; i < users.length; i++) {
            const vote = new Vote({
                contestant: contestant._id,
                user: users[0]._id
            });

            await vote.save();
            users[0].votes.push(vote._id); // Add the vote to the user's votes array
            await users[0].save();
            contestant.votes.push(vote._id); // Add the vote to the rapper's votes array
            await contestant.save();
        }

        console.log('data seeding done');
    }
    catch (error) {
        console.log(error);
    }
}

seeding();