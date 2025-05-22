`use strict`
const dateUtil = require("../utils/date")
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
        }
        }, { timestamps: true }
    );

    schema.index(
        {createdAt: 1},
        {expireAfterSeconds: dateUtil.daysToSeconds(15)}
    )

    return mongoose.model('token', schema);
}