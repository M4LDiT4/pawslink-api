module.exports = (mongoose, Schema) => {
   const schema = new Schema(
      {
         username: {
            type: String,
            required: true,
            unique: true,
         },
         email: {
            type: String,
            required: true,
            unique: true,
         },
         password: {
            type: String,
            required: true,
         },
         isAdmin: {
            type: Boolean,
            required: true,
            default: false,
         },
      },
      {
         timestamps: true,
      }
   );

   return mongoose.model('user', schema);
};
