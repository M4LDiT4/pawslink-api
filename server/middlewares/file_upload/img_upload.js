`use strict`;

const uploadService = require("../../services/cloudinary");
uploadService.init();

module.exports = async (req, res, next) => {
   try{
      if(!req.file || Object.keys(req.file).length === 0){
         return next();
      }
      const file = req.file;

      if(!file.buffer){
         return next();
      }
      console.log(`uploading image to cloudinary`);
      const imgUrl = await uploadService.uploadImageAndGetUrl(file.buffer, null, 'pawslink');
      req.imgUrl = imgUrl;
      
      return next();
   }catch (err){
      return res.status(400).json({
         error: `Image upload failed`
      });
   }
}