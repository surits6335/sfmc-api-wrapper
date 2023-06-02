const userService = require('../services/user-service');
const logger = require('../utils/logger');

const post = async(req, res, next) => {
    try {
        const {access_token} = await userService.getToken();
        res.token = access_token;
    }
    catch(err)
    {
        logger.serverError(res, err);
    }
    next();
}

module.exports = { post }