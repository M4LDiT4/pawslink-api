`use strict`;

/**
 * @module {Router}
 * @description This module initializes the API routes for the application.
 * @author Jonathan Calugas
 *
 * @returns {object} router - Express router instance
 */

const router = require('express').Router();

//define the routes here
require('./landingEndpoint')(router);

module.exports = router;
