/**
 * @module BuildSearchQuery
 * @description generates a valid search query
 * @description validates the passed values and combinations
 * @param {*} Model Mongodb model
 * @param {*} search value for comparison
 * @param {*} searchBy field to search
 * @returns 
 */
module.exports = (Model, search, searchBy) => {
   const query = {}

   if(!search || !searchBy) return query;

   const schemaType = Model.schema.path(searchBy);

   if(!schemaType){
      throw new Error(`${searchBy} is not valid searchable field`);
   }

   const typeName = schemaType.instance;

   switch(typeName){
      case 'String':
         query[searchBy] = {$regex: search, $options: 'i'};
         break;
      case 'Number':
         const num = Number(search);
         if(isNaN(num)){
            throw new Error(`${search} is not valid number for '${searchBy}'`)
         }
         query[searchBy] = num
         break;
      case 'Boolean':
         query[searchBy] = search === 'true';
         break;
      default:
         throw new Error(`Unsupported search field type: ${typeName}`);
   }
   return query;
}