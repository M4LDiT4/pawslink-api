const controllerRegistry = require('../../controllers/animal_database');

module.exports = (router) => {
   router.get(
      '/check-update/:lastUpdateTime',
      controllerRegistry.checkUpdate
   );

   router.get(
      '/check-update',
      controllerRegistry.checkUpdate
   )
}