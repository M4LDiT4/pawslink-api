
module.exports = (Model, fieldName) => {
   //pre: Model is valid mongodb model
   //post: returns true if field name exists on the Model
   const schemaType = Model.schema.path(fieldName);

   if(schemaType){
      return true;
   }
   return false;
}