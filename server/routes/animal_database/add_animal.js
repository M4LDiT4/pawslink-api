const singleFileUpload = require('../../utils/multer/single_file_upload');
const controllerRegistry = require("../../controllers/animal_database");

module.exports = (router) => {
   router.post(
      '/add-animal', 
      singleFileUpload.single(`image`), 
      controllerRegistry.addAnimal,
   );
}