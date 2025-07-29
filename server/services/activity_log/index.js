const insertActLog = require('./insert_activity_log');
/**
 * @module insert_activity_log
 * @author Jonathan Calugas
 * @param {Object} session - mongoose session wheret this write operation belongs to
 * @param {Object} data - metadata for the activity log object
 * @param {String} data.userId id of the user this activity log is related to
 * @param {String} data.action action by the user; limited to `CREATE`, `UPDATED` and `DELETE`
 * @param {String} data.collectionName the name of the collection where the action is done
 * @param {String} data.documentId id of the document that is affected by the action
 * @returns {Promise<void>}
 */
module.exports = async (session, data) => {
   return await insertActLog(
      session,
      data.userId,
      data.action,
      data.collectionName,
      data.documentId
   );
};
