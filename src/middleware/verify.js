const jwt = require("jsonwebtoken");
const utilContainers = require("../shared/constants");
const {Api403Error, Api404Error, Api401Error} = require("../core/error.response");
const {asyncHandler} = require("./auth");
require('dotenv').config();

class verifyMiddileware {
     verifyToken = (req, res, next) => {
        const token = req.headers[utilContainers.HEADER.AUTHORIZATION];
        if (token) {
            const accessToken = token.split(" ")[1];
            console.log(accessToken);
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
              if (err) {
                  console.log(err);
                throw new Api403Error("Forbidden request");
              }
              req.user = user;
              next();
            });
          } else {
            throw new Api401Error("You're not authenticated");
          }
    }

     authentication = asyncHandler(async (req, res, next) => {
        /**
         * 1 - check api key???
         * 2 - get access token
         * 3 - verify Token
         * 4 - check user exists ?
         * 5 - check keyStore with this userId
         * 6 - OK all => return next()
         */
            // 1
        const apiKey = req.headers[utilContainers.HEADER.API_KEY];
         console.log(apiKey)
        if (!apiKey) throw new Api403Error('Forbidden request');

        if (apiKey !== process.env.API_KEY) throw new Api403Error('Forbidden request');

         this.verifyToken(req, res, () => {
             next();
         })

    })

}

module.exports = new verifyMiddileware();