const singleFileUpload = require("../../utils/multer/single_file_upload");
const controllerRegistry = require("../../controllers/animal_database");
const authentication = require("../../middlewares/authentication");

module.exports = (router) => {
   router.patch(
      '/update',
      authentication,
      singleFileUpload.single(`image`),
      controllerRegistry.updateAnimal
   );
}