const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const User = require("../models/user.model")
const utilContainers = require("../shared/constants");
require('../database/init.mongodb');

const seeding = async () => {
    const userSeedings = [];
    for (let i = 0; i < utilContainers.numUsersToSeed; i++) {
        userSeedings.push({
            email: faker.internet.email(),
            password: faker.internet.password(),
            lastVoteDate: faker.date.past(),
            votesRemaining: 1
        })
    }

    // try catch
    try {
        await User.insertMany(userSeedings);
        console.log('data seeding done');
    }
    catch (error) {
        console.log(error);
    }
}

seeding(); // call seeding function
