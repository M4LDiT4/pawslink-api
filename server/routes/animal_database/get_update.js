const { model } = require("mongoose");
const controllerRegistry = require("../../controllers/animal_database");

module.exports = (router) => {
   router.get(
      '/update/:lastUpdateTime',
      controllerRegistry.getUpdate
   );

   router.get(
      '/update',
      controllerRegistry.getUpdate
   )
}