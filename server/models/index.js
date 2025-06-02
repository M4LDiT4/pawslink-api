`use strict`;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const models = {
   UserModel: require('./user'),
   RefreshToken: require('./token'),
   AnimalModel: require('./animal'),
   MedHistoryModel : require('./med_history'),
   VaxHistoryModel : require('./vax_history'),
};

let exportModels = {};

for (const fileName in models) {
   try {
      exportModels[fileName] = mongoose.model(models[fileName]);
   } catch (e) {
      exportModels[fileName] = models[fileName](mongoose, Schema);
   }
}

module.exports = exportModels;
