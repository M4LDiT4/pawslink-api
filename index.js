`use strict`;

/**
 * @module pawslink-api
 * @description This module initializes the data storage and the server for the application.
 * @author Jonathan Calugas
 *
 * process flow: initialize data storage -> initialize server
 */

const config = require('./config');
const chalk = require('chalk');

const logServerBootup = () => {
   console.info(
      chalk.green.bold(
         '--------------------------[ Starting server ]--------------------------'
      )
   );
   console.info(chalk.bold('Application root path: ') + __dirname);
};
const logServerShutdown = () => {
   console.info(
      chalk.red.bold(
         '--------------------------[ Shutting down server ]--------------------------'
      )
   );
   console.info(chalk.bold('Application root path: ') + __dirname);
};
const setupDataStorage = async () => {
   // If error is encountered, log error and exit program
   if (!config.dbUri || !config.dbCredentials) {
      console.error(chalk.red.bold('No db connections and credentials found!'));
      process.exit(0);
   } else {
      // Connect to db, if `config.dbUri` and `config.dbOptions` are available
      const dbConnection = await require('./server/core/mongoose')();
      // Return database connection and redis connection
      return { dbConnection };
   }
};

const setupApp = (dbConnection) => {
   // Otherwise, setup express app
   const app = require('./server/core/express')();

   app.listen(config.port, '0.0.0.0', () => {
      console.info('Application started!');
      console.info('----------------------------------------------');
      console.info(
         'Environment:\t' +
            chalk.underline.bold(process.env.NODE_ENV || 'development')
      );
      console.info('Port:\t' + config.port);
      console.info('----------------------------------------------');
      console.log('');
   });
};

(() => {
   logServerBootup();
   setupDataStorage()
      .then((dbConnection) => {
         setupApp(dbConnection);
      })
      .catch((err) => {
         console.error(chalk.red.bold('Error starting server: '), err);
         process.exit(1);
      });

   process.on('SIGINT', () => {
      logServerShutdown();
      process.exit(0);
   });
})();
