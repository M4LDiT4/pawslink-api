const EventModel = require("../../../models").EventModel;
/**
 * @module add_event
 * @description inserts an event document to mongodb
 * @param {*} session session where this write method belongs
 * @param {Object} eventData contains data for event document
 * @param {String} eventData.title title of the event
 * @param {Date} eventData.date date of the event
 * @param {Number} eventData.time time of day in minutes
 * @param {String} eventData.description description of the event
 * @returns {EventModel} instance of newly created event document
 */
module.exports = async (session, eventData) => {
   // pre: EventModel is a valid MongoDB model
   // pre: there is a valid session started
   // pre: eventData is valid
   // post: EventModel instance that reflects the newly created event document
   const event = new EventModel({
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      description: eventData.description
   });

   const newEvent = await event.save({session});

   return newEvent;
}