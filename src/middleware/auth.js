const { Api401Error, Api404Error } = require('../core/error.response');
const jwt = require('jsonwebtoken');

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

const authentication = asyncHandler (async (req, res, next) => {
    /**
     * 1 - check userId missing???
     * 2 - get access token
     * 3 - verify Token
     * 4 - check user exists ?
     * 5 - check keyStore with this userId
     * 6 - OK all => return next()
     */
        // 1
    const userId = req.headers[HEADER.CLIENT_ID];

    if (!userId) throw new Api401Error('Invalid request');

    // 3
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new Api404Error('Invalid request');
    console.log('qdn1');
    try {
        const decodedUser = jwt.verify(accessToken);
        console.log(decodedUser);
        if (userId !== decodedUser.userId) throw new Api401Error('Invalid userId');

        return next();
    } catch (error) {
        throw error;
    }

})

module.exports = {
    asyncHandler, authentication
}