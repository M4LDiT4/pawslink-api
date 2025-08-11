`use strict`

module.exports = (filter) => {
   const {field, condition, value} = filter;

   switch(condition){
      case 'startsWith':
         return {
            [field] : {
               $regex: '^' + escapreRegExp(value),
               $options: 'i'
            }
         };
      case 'endsWith':
         return {
            [field] : {
               $regex: escapreRegExp(value) + '$',
               $options: 'i'
            }
         };
      case 'contains':
      case 'matches':
         return {
            [field]: {
               $regex: escapreRegExp(value),
               $options: 'i'
            }
         };
      case 'equals':
         return {[field] : value};

      case 'notEquals':
         return {[field]: {
            $ne: value
            }
         };
      
      case 'greaterThan':
         return {
            [field]: {
               $gt: value
            }
         };
      
      case 'greaterThanOrEqual':
         return {
            [field]: {
               $gte: value
            }
         };
      
      case 'lessThan':
         return {
            [field]: {
               $lt: value
            }
         };
      
      case 'lessThanOrEqual':
         return {
            [field]: {
               $lte: value
            }
         };

      case 'inList':
         return {
            [field]: {
               $in: value
            }
         };
      
      case 'notInList':
         return {
            [field]: {
               $nin: value
            }
         };
      
      case 'isNull':
         return {
            [field] : null
         };
      case 'isNotNull':
         return {
            [field] : {
               $ne: null
            }
         };
      case 'exists':
         return {
            [field]: {
               '$exists': !!value
            }
         };
      case 'between':
         if(Array.isArray(value) && value.length === 2){
            let ascArray = value;
            if(value[0] > value[1]){
               ascArray[1] = value[0];
               ascArray[0] = value[1];
            }
            return {
               [field]: {
                  $gte: ascArray[0],
                  $lte: ascArray[1]
               }
            }
         };
         throw new Error("Invalid value for between filter");
      default:
         throw new Error(`Unsupported filter condition : ${condition}`);
   }
}

function escapreRegExp(string){
   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}