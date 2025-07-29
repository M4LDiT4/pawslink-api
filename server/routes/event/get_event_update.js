const controllerRegistry = require("../../controllers/event");

module.exports = (router) => {
   router.get(
      "/event/update", 
      controllerRegistry.getEventUpdate
   );
}