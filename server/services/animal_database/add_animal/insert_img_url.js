const AnimalModel = require('../../../models').AnimalModel;

module.exports = async (session, id, imgUrl) => {

   const newAnimal = await AnimalModel.findByIdAndUpdate(
      id,
      {
         profileImage: imgUrl,
      },
      {
         new: true,
         runValidators: true,
         session,
      }
   );
   return newAnimal;
};
