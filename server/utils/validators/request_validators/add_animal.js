`use strict`

const joi = require('joi');

const schema = joi.object({
   name: joi.string().min(3).max(30).required(),
   species: joi.string().valid('dog', 'cat', 'unknown').required(),
   age: joi.number().integer().min(0).required(),
   location: joi.string().min(3).required(),
   sex: joi.string().valid('male', 'female', 'unknown').required(),
   status: joi.string().required(),
   coatColor: joi.array().items(joi.string()).default([]),
   notes: joi.array().items(joi.string()).default([]),
   traitsAndPersonality: joi.array().items(joi.string()).default([]),
   vaxHistory: joi.array().items(joi.object({
      date: joi.date().required(),
      description: joi.string().required(),
   })),
   medHistory: joi.array().items(joi.object({
      date: joi.date().required(),
      description: joi.string().required(),
   })),  
});

module.exports = (args) => {
   return schema.validate(args);
};