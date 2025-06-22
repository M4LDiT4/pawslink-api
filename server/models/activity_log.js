
module.exports = (mongoose, Schema) => {
   const schema = new Schema({
      userId: {
         type: Schema.Types.ObjectId,
         required: true
      },
      action: {
         type: String,
         required: true,
         enum: ["CREATE", "UPDATE", "DELETE"]
      },
      collectionName: {
         type: String,
         required: true,
      },
      documentId: {
         type: Schema.Types.ObjectId,
         required: true
      }
   }, {
         timestamps: true
      }
   );

   return mongoose.model('ActivityLog', schema);
}