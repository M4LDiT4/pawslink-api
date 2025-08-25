const AnimalModel = require('../../../models').AnimalModel;

module.exports = async (session, id, imgUrl) => {
   if (!imgUrl) {
      throw new Error('Image URL cannot be empty');
   }

   // 1. Find the current animal first to check existing profileImage
   const animal = await AnimalModel.findById(id).session(session);
   if (!animal) {
      throw new Error('Animal not found');
   }

   const updates = { profileImage: imgUrl };

   // 2. If old profileImage exists, push it into imgUrls
   if (animal.profileImage) {
      updates.$addToSet = { imgUrls: animal.profileImage };
   }

   // 3. Update with new profileImage and modified imgUrls
   const newAnimal = await AnimalModel.findByIdAndUpdate(
      id,
      updates,
      {
         new: true,
         runValidators: true,
         session,
      }
   );

   return newAnimal;
};
