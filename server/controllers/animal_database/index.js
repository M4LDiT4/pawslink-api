const animalDatabaseControllerRegistry = {
   addAnimal: require('./add_animal'),
   getAnimal: require("./get_animal"),
   updateAnimal: require("./update_animal"),
   getUpdate: require("./get_animal_updates"),
   checkUpdate: require("./check_updates"),
};

module.exports = animalDatabaseControllerRegistry;
