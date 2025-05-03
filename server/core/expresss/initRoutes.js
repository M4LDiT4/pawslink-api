`use strict`;

/**
 * @module {Function} initRoutes
 * @description centralizes the loading of all routes
 * @author Jonathan Calugas
 * 
 * @requires path
 * 
 * @argument {object} app - express app
 */

const path = require('path');

module.exports = app => {
    try{
        const router = require(path.join(
            __dirname,
            '../',
            '../',
            '../',
            'server',
            'routes',
            'api'
        ));
        app.use('/api', router);
    }catch(err){
        console.error('Unable to load api.js in the routes folder.');
        console.error(e.message || e);
        console.info({});
    }
}