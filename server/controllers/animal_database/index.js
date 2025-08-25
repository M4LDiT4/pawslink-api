const animalDatabaseControllerRegistry = {
   addAnimal: require('./add_animal'),
   getAnimal: require("./get_animal"),
   updateAnimal: require("./update_animal"),
};

module.exports = animalDatabaseControllerRegistry;
