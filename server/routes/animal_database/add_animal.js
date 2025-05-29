const singleFileUpload = require('../../utils/multer/single_file_upload');
const uploadImgToStorage = require("../../middlewares/file_upload/img_upload");
const controllerRegistry = require("../../controllers/animal_database");

module.exports = (router) => {
   router.post(
      '/add-animal', 
      singleFileUpload.single(`image`), 
      uploadImgToStorage,  
      controllerRegistry.addAnimal,
   );
}