`use strict`;
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

/**
 * @module express
 * @author Jonathan Calugas
 * @description generates a customized express object for the server
 * @returns {Express} the server instance
 */
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
