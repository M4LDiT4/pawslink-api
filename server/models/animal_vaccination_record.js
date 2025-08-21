`use strict`

module.exports = (mongoose, Schema) => {
   const schema = new Schema({
      animal: {
         type: Schema.Types.ObjectId,
         ref: 'Animal',
         required: true
      },
      vaccineName: {
         type: String,
         required: true,
      },
      dateGiven:{
         type: Date,
         required: true
      },
      doseNumber: {
         type: Number,
         required: true
      },
      nextDueDate: {
         type: Date,
         required: true
      },
      administeredBy:{
         type: String,
         required: true,
      },
      batchNumber: {
         type: String,
         required: false
      },
      expiryDate: {
         type: Date,
         required: true
      },
      route:{
         type: String,
         required: false
      },
      notes: {
         type: [String],
         default: []
      }
   });

   return mongoose.model('VaccinationRecord', schema);
}