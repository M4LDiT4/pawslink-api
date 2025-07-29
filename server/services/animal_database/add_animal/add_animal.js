const AnimalModel = require('../../../models').AnimalModel;
const MedHistoryModel = require('../../../models').MedHistoryModel;
const VaxHistoryModel = require('../../../models').VaxHistoryModel;

/**
 * @module add_animal
 * @author Jonathan Calugas
 * @description creates an instance of animal in mongo db
 * @param {Object} session -> session where this write operation belongs to
 * @param {Object} animalData -> data object representing an animal
 * @param {String} animalData.name -> name of the animal
 * @param {age} animalData.age -> age of animal in months
 * @param {String} animalData.species -> species of the animal
 * @param {String} animalData.location -> location of the animal where it usually stays/found
 * @param {String} animalData.sex -> sex of the animal
 * @param {String} animalData.status -> status of being an animal within the campus vicinity
 * @param {List<String>} animalData.coatColor -> list of colors the animal has
 * @param {List<String>} animalData.notes -> additional information that cannot be placed on other fields
 * @param {List<String>} animalData.traitsAndPersonality -> list of information about the animals traits and personality
 * @param {List<{
 *       date: Date,
 *       description : String
 *    }>} animalData.vaxHistory -> history of vaccinations that the animal has undergone
 * @param {
 *       List<{
 *          date: Date,
 *          description: String
 *       }>
 *    } animalData.medHistory -> history of medications that the animal has
 * @returns {Promise<Object>} -> animal document from mongodb
 */
module.exports = async (session, animalData) => {
   const animal = new AnimalModel({
      name: animalData.name,
      species: animalData.species,
      age: animalData.age,
      location: animalData.location,
      sex: animalData.sex,
      status: animalData.status,
      coatColor: animalData.coatColor,
      notes: animalData.notes,
      traitsAndPersonality: animalData.traitsAndPersonality,
   });

   const newAnimal = await animal.save({ session });

   const vaccinations = animalData.vaxHistory.map((item) => ({
      animal: newAnimal._id,
      vaccinationDate: item.date,
      vaccinationFor: item.description,
   }));

   await VaxHistoryModel.insertMany(vaccinations, { session });

   const medications = animalData.medHistory.map((item) => ({
      animal: newAnimal._id,
      medicationDate: item.date,
      medicationFor: item.description,
   }));

   await MedHistoryModel.insertMany(medications, { session });

   return newAnimal;
};
