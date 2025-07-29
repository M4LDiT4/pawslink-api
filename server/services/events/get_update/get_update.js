const EventModel = require("../../../models").EventMode;

module.exports = async(timeStamp) => {
   // pre: timestamp is a valid date
   // post: retreives the uodates to the event collection after or during the given timestamp
   const result =  await EventMode.find(
      {
         createdAt: {$gte: timeStamp}
      }
   )
   return result;
}