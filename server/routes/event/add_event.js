const singleFileUpload = require("../../utils/multer/single_file_upload");
const controllerRegistry = require("../../controllers/event");
const authentication = require("../../middlewares/authentication");

module.exports = (router) => {
   router.post('/event',
      // authentication,
      singleFileUpload.single('image'),
      controllerRegistry.addEvent
   );
}