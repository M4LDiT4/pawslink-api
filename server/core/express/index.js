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

      // Catch-all 404 handler
   app.use((req, res, next) => {
      res.status(404).json({
         error: `${req.method} ${req.originalUrl} not found`
      });
   });

   // Error handling middleware
   app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).json({
         error: err.message || 'Internal Server Error'
      });
   });

   const server = require('http').createServer(app);
   return server;
};
