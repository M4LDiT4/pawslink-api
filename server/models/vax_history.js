`use strict`;

module.exports = (mongoose, Schema) => {
   const schema = new Schema({
      animal: {
         type: Schema.Types.ObjectId,
         ref: 'Animal',
         required: true,
      },
      vaccinationDate: {
         type: Schema.Types.Date,
         required: true,
         default: Date.now,
      },
      vaccinationFor: {
         type: String,
         required: true,
      },
   });
   return mongoose.model('Vaccination', schema);
};
