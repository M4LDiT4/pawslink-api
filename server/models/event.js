`use strict`

module.exports = (mongoose, Schema) => {
   const schema = new Schema(
      {
         title: {
            type: String,
            required: true
         },
         date: {
            type: Date,
            requiored: true
         },
         time: {
            type: Number,
            required: true
         },
         description: {
            type: String,
            required: true
         },      
         imgUrl: {
            type: String, 
            requred: false
         }
      },
      {
         timeStamps: true,
      }
   );

   return mongoose.model('Event', schema);
}