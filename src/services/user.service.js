'use strict';

const mongoose = require('mongoose');
const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {Api403Error, BusinessLogicError, Api401Error} = require('../core/error.response');

const SAL_ROUNDS = 10;

class UserService {
    static create = async (userDetails) => {
        const {email, password} = userDetails;

         // check user
        const checkUser = await User.findOne({email: email});
        console.log(checkUser);
        if (checkUser) throw new Api403Error('User already exists');

        const hashPassword = await bcrypt.hash(password, SAL_ROUNDS);
        const user = new User(userDetails);
        user.password = hashPassword;
        user.votesRemaining = 1;
        await user.save();
        return user;
    }

}

module.exports = UserService;