const express = require('express');
const userMiddleware = require('../middlewares/user-middleware');
const userService = require('../services/user-service');
const logger = require('../utils/logger');

const router = new express.Router();

router.post('/api/addUser', userMiddleware.post, async (req, res) => {
    try {
        const { response } = await userService.save(res.token, req.body);
        const { headers, body, statusCode } = response;
        logger.success(res, body);
    }
    catch(err)
    {
        logger.serverError(res, err);
    }
})

module.exports = router;