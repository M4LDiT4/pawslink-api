const joi = require('joi');

const schema = joi.object({
   name: joi.string().min(3).max(30),
   species: joi.string().valid('dog', 'cat', 'unknown'),
   age: joi.number().integer().min(0),
   location: joi.string().min(3),
   sex: joi.string().valid('male', 'female', 'unknown'),
   status: joi.string(),
   coatColor: joi.array().items(joi.string()),
   notes: joi.array().items(joi.string()),
   traitsAndPersonality: joi.array().items(joi.string()),
   vaccinationRecords: joi.array().items(
      joi.object({
         _id: joi.string(), // include for updates
         vaccineName: joi.string(),
         dateGiven: joi.date(),
         doseNumber: joi.number(),
         nextDueDate: joi.date(),
         administeredBy: joi.string(),
         batchNumber: joi.number(),
         expiryDate: joi.date(),
         route: joi.string(),
         notes: joi.array().items(joi.string())
      })
   ),
   medicationRecords: joi.array().items(
      joi.object({
         _id: joi.string(), // include for updates
         medicationName: joi.string(),
         dosage: joi.string(),
         route: joi.string(),
         dateGiven: joi.date(),
         durationInDays: joi.number(),
         reason: joi.string(),
         prescribedBy: joi.string(),
         notes: joi.array().items(joi.string())
      })
   ),
});

module.exports = (args) => {
   return schema.validate(args);
};
