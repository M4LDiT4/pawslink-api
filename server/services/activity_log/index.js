const insertActLog = require("./insert_activity_log");
module.exports = async (session, data) => {
   return await insertActLog(
      session,
      data.userId,
      data.action,
      data.collectionName,
      data.documentId
   )
}

