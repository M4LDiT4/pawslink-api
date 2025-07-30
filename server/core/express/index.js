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

   //catch routes that do not exist
   app.use((req, res, next) => {
      req.responseData = {
         statusCode:  404,
         body:{
            error: `${req.path} not found`
         }
      }
      return next();
   });

   const server = require('http').createServer(app);
   return server;
};
