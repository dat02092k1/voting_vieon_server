'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user.model');

const { Api403Error, BusinessLogicError, Api401Error } = require('../core/error.response');
const {getInfoData, generateAccessToken} = require("../utils/utils");
const UtilContainer = require("../shared/constants");

const RoleShop = {
    STUDENT: "user",
    ADMIN: "admin",
}

class AccessService {
    static login = async ({ email, password }) => {
        console.log({ email });
        // 1.
        const user = await User.findOne({email});

        if (!user) {
            throw new Api401Error('Error: User not registered');
        }

        // 2.
        const match = bcrypt.compare(password, user.password);

        if (!match) throw new Api401Error('Authentication error');

        if (user.role === UtilContainer.roleUsers[1]) {
            return {
                metadata: {
                    user: getInfoData({ fields: ['_id', 'votesRemaining', 'email', 'role'], object: user }),
                    token: generateAccessToken(user)
                }
            }
        }

        return {
            metadata: {
                user: getInfoData({ fields: ['_id', 'votesRemaining', 'email'], object: user }),
                token: generateAccessToken(user)
            }
        }

    }

    static signUp = async ({  email, password }) => {
        // s1: check email existence
        const hodelUser = await User.findOne({ email }).lean(); // return JS object

        console.log(hodelUser);
        if (hodelUser) {
            throw new Api403Error('Error: user already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
             email, password: passwordHash, votesRemaining: 1
        })

        if (newUser) {
            return {
                code: 201,
                metadata: {
                    user: getInfoData({ fields: ['_id', 'votesRemaining', 'email'], object: newUser }),
                    token: generateAccessToken(newUser)
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }

    static logout = async () => {
        return 'logout';
    }
}

module.exports = AccessService;