const controllerRegistry = require("../../controllers/event");

module.exports = (router) => {
   router.get(
      '/event/:id',
      controllerRegistry.getEvent
   );
   router.get(
      '/event',
      controllerRegistry.getEvent
   );
}
