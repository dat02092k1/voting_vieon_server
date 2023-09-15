const { Api401Error, Api404Error, Api403Error} = require('../core/error.response');
const jwt = require('jsonwebtoken');
const utilContainers = require('../shared/constants');

const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch((err) => next(err));
}


module.exports = {
    asyncHandler,
}