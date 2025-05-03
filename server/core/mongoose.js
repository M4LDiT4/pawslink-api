`use strict`;

/**
 * @module mongoose
 * @description Mongoose connection module
 * 
 * @requires mongoose
 * @requires config
 * @requires chalk
 * 
 * @exports mongoose
 * 
 * @example require('./core/mongoose')()
 * @uthor Jonathan Calugas
 */


const config = require('../../config');

const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve) => {
      mongoose.Promise = global.Promise;

      //check if mongoose is already connected
      //if not, connect to the database
      //if yes, resolve the connection
      //wait for the connection to be established
      //if the connection is not established, log the error and exit the process
      //if the connection is established, log the success message and resolve the connection
      //if the connection is not established, log the error and exit the process
      if (mongoose.connection.readyState !== 1) {
        console.info('Connecting to MongoDB...');
  
        mongoose.connect(config.dbUri, 
        ).catch(err => {
          // Catch connection errors that aren't handled by events
          console.error(chalk.red.bold('Initial MongoDB connection error:'));
          console.error(chalk.red(err));
          process.exit(0);
        });
  
        const dbConnection = mongoose.connection;
  
        dbConnection.on('error', () => {
          console.error(chalk.red.bold('Could not connect to MongoDB!'));
          console.error(chalk.red.bold('Will not run server.'));
          process.exit(0);
        });
  
        dbConnection.on('disconnected', () => {
          console.error(chalk.red.bold('Disconnected from MongoDB!'));
          console.error(chalk.red.bold('Need to restart server.'));
          process.exit(0);
        });
  
        dbConnection.once('open', () => {
          console.info();
          console.info(chalk.yellow.bold('Connected to MongoDB successfully!'));
          console.info();
          resolve(dbConnection);
        });
      } else {
        console.info('Mongo already connected.');
        resolve(mongoose.connection);
      }
    });
};