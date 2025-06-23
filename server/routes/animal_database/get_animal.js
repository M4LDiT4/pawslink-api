const controllerRegistry = require('../../controllers/animal_database');

module.exports = (router) => {
   router.get(
      '/animal/:id',
      controllerRegistry.getAnimal
   )
}