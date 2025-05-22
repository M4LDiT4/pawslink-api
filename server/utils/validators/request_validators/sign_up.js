`use strict`

const joi = require("joi");

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().required(),
    username: joi.string().alphanum().required(),
});

module.exports = schema;