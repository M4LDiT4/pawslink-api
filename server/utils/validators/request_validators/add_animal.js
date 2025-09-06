`use strict`;

const joi = require('joi');

const schema = joi.object({
   id: joi.string(),
   name: joi.string()
      .min(3)
      .max(30)
      .required(),
   species: joi.string()
      .valid('dog', 'cat', 'unknown')
      .required(),
   age: joi.number()
      .integer()
      .min(0)
      .required(),
   location: joi.string()
      .min(3)
      .required(),
   sex: joi.string()
      .valid('male', 'female', 'unknown')
      .required(),
   status: joi.string()
      .required(),
   coatColor: joi.array()
      .items(
         joi.string()
      )
      .default([]),
   notes: joi.array()
      .items(
         joi.string()
      )
      .default([]),
   traitsAndPersonality: joi.array()
      .items(
         joi.string()
      )
      .default([]),
   vaccinationRecords: joi.array().items(
      joi.object({
         vaccineName: joi.string()
            .required(),
         dateGiven: joi.date()
            .required(),
         doseNumber: joi.number()
            .required(),
         nextDueDate: joi.date()
            .required(),
         administeredBy: joi.string()
            .required(),
         batchNumber: joi.number()
            .required(),
         expiryDate: joi.date()
            .required(),
         route: joi.string()
            .required(),
         notes: joi.array()
            .items(
               joi.string
            )
            .default([])
      })
   ),
   medicationRecords: joi.array().items(
      joi.object({
         medicationName: joi.string()
            .required(),
         dosage: joi.string()
            .required(),
         route: joi.string()
            .required(),
         dateGiven: joi.date()
            .required(),
         durationInDays: joi.number()
            .required(),
         reason: joi.string()
            .required(),
         prescribedBy: joi.string()
            .required(),
         notes: joi.array().
            items(
               joi.string()
            )
            .default([])
      })
   ),
});

module.exports = (args) => {
   return schema.validate(args);
};
