const filterBuilder = require("./filter_builder");
const fieldValidityChecker = require("./field_validity_checker");

module.exports = (Model, filterConfigs, options = {}) => {
   try{
      filterConfigs = JSON.parse(filterConfigs); //try parsing the config
   }catch(err){
      console.warn(`Failed to parse filter conditions: ${err}`);
      return;
   }
   if (!Model || !Array.isArray(filterConfigs)) {
        console.warn("Either Model or filter configs is missing");
        return ;
    }
   let combineMethod = options.combineMethod || 'and'; //default the combine method to and

   const filters = filterConfigs
      .filter(({ field }) => {
         const valid = fieldValidityChecker(Model, field);
         if (!valid) console.warn(`${field} is not a field for the model ${Model.modelName}`);
         return valid;
      })
      .map(({ field, condition, value }) => filterBuilder({ field, condition, value }));

   if (filters.length === 0) return {};
   if (filters.length === 1 && combineMethod !== 'not') return filters[0];

   switch (combineMethod) {
      case 'and':
         return { $and: filters };
      case 'or':
         return { $or: filters };
      case 'nor':
         return { $nor: filters };
      case 'not':
         if (filters.length !== 1) {
               throw new Error("'not' combine method supports only a single filter");
         }
         // Assuming filters[0] is already { fieldName: { condition } }
         const [fieldName, condition] = Object.entries(filters[0])[0];
         return { [fieldName]: { $not: condition } };
      default:
         throw new Error(`${combineMethod} is not supported, must be one of 'and', 'or', 'nor', 'not'`);
   }
};
