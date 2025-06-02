`use strict`;
module.exports = (mongoose, Schema) => {
   const schema = new Schema({
      name: {
         type: String,
         required: true,
         trim: true,
      },
      species: {
         type: String,
         enum: ['dog', 'cat', 'unknown'],
         required: true,
         trim: true,
      },
      age: {
         type: Number,
         required: true,
      },
      location: {
         type: String,
         required: true,
      },
      sex: {
         type: String,
         enum: ['male', 'female', 'unknown'],
         required: true,
         trim: true,
      },
      status: {
         type: String,
         required: true,
      },
      coatColor: {
         type: [String],
         required: true,
         default: [],
      },
      notes: {
         type: [String],
         default: [],
      },
      traitsAndPersonality: {
         type: [String],
         default: [],
      },
      imgUrl: {
         type: String,
      }
   });

   schema.virtual(`vaccinations`, {
      ref: 'Vaccination',
      localField: '_id',
      foreignField: `animal`,
   });

   schema.virtual('medications', {
      ref: 'Medication',
      localField: '_id',
      foreignField: 'animal'
   });

   schema.set('toObject', { virtuals: true });
   schema.set('toJSON', { virtuals: true });

   return mongoose.model('Animal', schema);
};
