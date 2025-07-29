//controller registry for the event model
//register controllers for event model here
const eventControllerRegistry = {
   addEvent: require("./add_event"),
   getEvent: require("./get_event"),
   getEventUpdate: require('./get_update')
}

module.exports = eventControllerRegistry;