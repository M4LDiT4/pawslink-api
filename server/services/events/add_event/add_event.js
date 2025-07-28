const EventModel = require("../../../models").EventModel;

module.exports = async (session, eventData) => {
   const event = new EventModel({
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      description: eventData.description
   });

   const newEvent = await event.save({session});

   return newEvent;
}