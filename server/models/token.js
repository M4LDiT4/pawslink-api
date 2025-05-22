`use strict`
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

module.exports = (mongoose, Schema) => {
    const schema = new Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        refreshToken : {
            type : String,
            required : true
        },
        expiresAt : {
            type : Date,
            required : true
        },
        createdAt : {
            type: Date,
            required : true,
            default : Date.now
        }
    });

    //add ttl here if it is free 

    return mongoose.model('token', schema);
}