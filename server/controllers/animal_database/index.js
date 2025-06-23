const animalDatabaseControllerRegistry = {
   addAnimal: require('./add_animal'),
   getAnimal: require("./get_animal"),
};

module.exports = animalDatabaseControllerRegistry;
