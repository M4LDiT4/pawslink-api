`use strict`

const joi = require("joi");

const schema = joi.object({
   title: joi.string().required(),
   date: joi.date().required(),
   time: joi.number().min(0).required(),
   description: joi.string().required(), 
})

module.exports = (args) => {
   return schema.validate(args);
}