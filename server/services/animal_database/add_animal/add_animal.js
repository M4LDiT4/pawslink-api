const AnimalModel = require('../../../models').AnimalModel;
const AnimalMedicationRecordModel = require('../../../models').AnimalMedicationRecord;
const AnimalVaccinationRecordModel = require('../../../models').AnimalVaccinationRecord;
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

   const vaxRecords = animalData.vaccinationRecords ? animalData.vaccinationRecords.map((item) => {
      const record = item;
      record.animal = newAnimal._id;
      return record;
   }) : [];

   const medRecords = animalData.medicationRecords? animalData.medicationRecords.map((item) => {
      const record = item;
      record.animal = newAnimal._id;
      return record;
   }) : [];

   await AnimalMedicationRecordModel.insertMany(
      medRecords,
      {session}
   );

   await AnimalVaccinationRecordModel.insertMany(
      vaxRecords,
      {session}
   );

   return newAnimal;
};
