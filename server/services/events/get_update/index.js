const getUpdate = require("./get_update");
module.exports = async ({
   timeStamp
}) => {
   const response = await  getUpdate(timeStamp);
   return {
      data: response
   }
}