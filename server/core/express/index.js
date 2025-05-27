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
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

module.exports = () => {
   let app = express();

   app.use(express.json());
   app.use(helmet());
   app.use(compression());
   app.use(cors());
   app.use(morgan('dev'));
   app.use(cookieParser());

   require('./initRoutes')(app);
   require('./generateApiResponse')(app);

   const server = require('http').createServer(app);
   return server;
};
