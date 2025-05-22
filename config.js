require('dotenv').config();

/**
 * @module config
 * @requires dotenv
 * @description Configuration file for the application
 * @author Jonathan Calugas
 */

module.exports = {
   port: process.env.PORT || 3000,
   //data redundancy to accomodate mongoose new feature where it only requires uri
   //dbCrendentials for checking credentials does really exists
   dbCredentials: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
   },
   dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h10enh5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
};
