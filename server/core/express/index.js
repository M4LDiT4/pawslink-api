`use strict`;

/**
 * @module express
 * @description creates a server with routes and response handling middleware
 * @author Jonathan Calugas
 *
 * @requires express
 * @requires initRoutes
 * @requires generateApiResponse
 * @requires http
 *
 * @returns {object} server - http server
 */

const express = require('express');

module.exports = () => {
   let app = express();

   app.use(express.json());

   require('./initRoutes')(app);
   require('./generateApiResponse')(app);

   const server = require('http').createServer(app);
   return server;
};
