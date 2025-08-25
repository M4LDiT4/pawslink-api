'use strict';

const AnimalModel = require("../../../models").AnimalModel;
const AnimalVaccinationRecordModel = require("../../../models").AnimalVaccinationRecordModel;
const AnimalMedicationRecordModel = require("../../../models").AnimalMedicationRecodModel;

module.exports = async (session, animalId, animalData) => {
   // 1. Update the base Animal
   const updatedAnimal = await AnimalModel.findByIdAndUpdate(
      animalId,
      {
         name: animalData.name,
         species: animalData.species,
         age: animalData.age,
         location: animalData.location,
         sex: animalData.sex,
         status: animalData.status,
         coatColor: animalData.coatColor,
         notes: animalData.notes,
         traitsAndPersonality: animalData.traitsAndPersonality,
         profileImage: animalData.profileImage,
         imgUrls: animalData.imgUrls
      },
      { new: true, session }
   );

   if (!updatedAnimal) {
      throw new Error('Animal not found');
   }

   // ✅ Helper function to merge records
   async function mergeRecords(Model, newRecords) {
      if (!newRecords) return;

      for (const record of newRecords) {
         if (record._id) {
            // Update existing record
            await Model.updateOne(
               { _id: record._id, animal: updatedAnimal._id },
               { $set: { ...record } },
               { session }
            );
         } else {
            // Create new record
            await Model.create(
               [{ ...record, animal: updatedAnimal._id }],
               { session }
            );
         }
      }

      // (Optional) Remove records in DB not present in newRecords
      const newIds = newRecords.filter(r => r._id).map(r => r._id.toString());
      await Model.deleteMany(
         { animal: updatedAnimal._id, _id: { $nin: newIds } },
         { session }
      );
   }

   // 2. Merge Vaccination Records
   await mergeRecords(AnimalVaccinationRecordModel, animalData.vaccinationRecords);

   // 3. Merge Medication Records
   await mergeRecords(AnimalMedicationRecordModel, animalData.medicationRecords);

   return updatedAnimal;
};
