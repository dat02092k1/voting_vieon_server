'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { Api403Error, BusinessLogicError, Api401Error } = require('../core/error.response');

const RoleShop = {
    SHOP: 'SHOP',
    WRITTER: 'WRITTER',
    EDITER: 'EDITER',
    ADMIN: 'ADMIN'
}

class AccessService {
    /**
     * 1) check email in db
     * 2) check match password
     * 3) create AT and RT then save
     * 4) generate tokens
     * 5) get data return
     */
    static login = async ({ email, password, refreshToken = null }) => {
        console.log({ email });
        // 1.
        const foundShop = await findByEmail({email});

        if (!foundShop) {
            throw new Api403Error('Error: Shop not registered');
        }

        // 2.
        const match = bcrypt.compare(password, foundShop.password);

        if (!match) throw new Api401Error('Authentication error');

        // 3.
        const { privateKey, publicKey } = generateKeys();
        // 4. create access token and refresh token
        const { _id: userId } = foundShop;

        const tokens = await createTokenPair({
            userId,
            email
        }, publicKey, privateKey);

        await keyTokenService.createToken({
            userId,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        })

        return {
            metadata: {
                shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
                tokens
            }
        }

    }

    static signUp = async ({ name, email, password }) => {
        // s1: check email existence
        const hodelShop = await shopModel.findOne({ email }).lean(); // return JS object

        if (hodelShop) {
            throw new Api403Error('Error: Shop already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            // create private key & public key
            const { privateKey, publicKey } = generateKeys();

            console.log(privateKey, '---', publicKey);

            // save collection Keystore
            const publicKeyString = await keyTokenService.createToken({
                userId: newShop._id, publicKey, privateKey
            });

            if (!publicKeyString) {
                throw new BusinessLogicError('Error: Create publicKeyString failed');
            }

            const publicKeyObject = crypto.createPublicKey(publicKeyString);

            // create token pair
            const tokens = await createTokenPair({
                userId: newShop._id,
                email
            }, publicKeyObject, privateKey)

            console.log(`creating token pair::`, tokens);

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }

    static logout = async (keyStore) => {
        console.log(keyStore);
        const delKey = await keyTokenService.removeKeyById(keyStore._id);
        console.log(delKey);
        return delKey;
    }
}

module.exports = AccessService;