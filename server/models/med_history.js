`use strict`;

module.exports = (mongoose, Schema) => {
   const schema = new Schema({
      animal: {
         type: Schema.Types.ObjectId,
         ref: 'Animal',
         required: true,
      },
      medicationDate: {
         type: Date,
         required: true,
         default: Date.now,
      },
      medicationFor: {
         type: String,
         required: true,
      },
   });

   return mongoose.model(`Medication`, schema);
};
