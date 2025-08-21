`use strict`

module.exports = (mongoose, Schema) => {
   const schema = new Schema({
      animal: {
         type: Schema.Types.ObjectId,
         ref: 'Animal',
         required: true
      },
      medicationName: {
         type: String,
         required: true
      },
      dosage: {
         type:String,
         required: true
      },
      route: {
         type: String,
         required: true
      },
      dateGiven: {
         type:Date,
         required: true,
      },
      durationInDays:{
         type: Number,
         required: true
      },
      reason: {
         type: String,
         required: true
      },
      prescribedBy:{
         type: String,
         required: true
      },
      notes: {
         type: [String],
         default: []
      }
   });

   return mongoose.model('MedicationRecord', schema);
}