`use strict`;
const updateAnimalHandler = require("../../services/animal_database/update_animal");
const validator = require("../../utils/validators/request_validators/update_animal")
module.exports = async (req, res, next) => {
   try{
      if (!req.body || Object.keys(req.body).length === 0) {
         req.responseData = {
            statusCode: 400,
            body: {
               error: 'No request body provided',
            },
         };
         return next();
      }

      if (!req.user || req.user == null) {
         req.responseData = {
            statusCode: 401,
            body: {
               error: 'Invalid User Detected',
            },
         };
         return next();
      }

      const body = req.body;
      if(!body.id){
         req.responseData = {
            statusCode: 400,
            body: {
               error: `Id is not provided`
            }
         }
         return next();
      }
      const animalData = body;
      if(animalData.coatColor){
         animalData.coatColor = JSON.parse(animalData.coatColor);
      }
      if(animalData.notes){
         animalData.notes = JSON.parse(animalData.notes);
      }
      if(animalData.traitsAndPersonality){
         body.traitsAndPersonality = JSON.parse(animalData.traitsAndPersonality);
      }
      if (animalData.vaccinationRecords) {
         animalData.vaccinationRecords = JSON.parse(body.vaccinationRecords);
      }

      if (animalData.medicationRecords) {
         animalData.medicationRecords = JSON.parse(body.medicationRecords);
      }

      const {err, value} = validator(animalData);

      if (err) {
         req.responseData = {
            statusCode: 400,
            body: {
               error: error.details[0].message,
            },
         };
         return next();
      }

      const response = await updateAnimalHandler({
         animalData: animalData,
         id: body.id,
         user: req.user,
         imgFile: req.file,
      });

      req.responseData = {
         statusCode: 200,
         body: {
            message: "Animal updated successfully",
            data: response,
         }
      }
      return next();
   }catch (err){
      console.log(`Error in update animal ${err}`);
      req.responseData = {
         statusCode: 400,
         body: {
            error: err.message || err
         }
      }
      return next();
   }
}