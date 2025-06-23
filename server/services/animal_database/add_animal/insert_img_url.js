const AnimalModel = require('../../../models').AnimalModel;

module.exports = async (session, id, imgUrl) => {
   const newAnimal = await AnimalModel.findByIdAndUpdate(
      id,
      {
         imgUrl: imgUrl,
      },
      {
         new: true,
         runValidators: true,
         session,
      }
   );
   return newAnimal;
};
