const objectId = require('mongoose').Types.ObjectId;
const ActivityLogModel = require('../../models').ActivityLogModel;

/**
 * @description creates a new mongodb document for activity log
 * @author Jonathan Calugas
 * @param {Object} session session this async function belongs to
 * @param {String} userId id of the user this activity log is related to
 * @param {String} action action by the user; limited to `CREATE`, `UPDATED` and `DELETE`
 * @param {String} collectionName the name of the collection where the action is done
 * @param {String} documentId id of the document that is affected by the action
 * @returns {Promise<voids>}
 */

module.exports = async (
   session,
   userId,
   action,
   collectionName,
   documentId
) => {
   const actLog = new ActivityLogModel({
      userId: new objectId(userId),
      action: action,
      collectionName: collectionName,
      documentId: new objectId(documentId),
   });

   await actLog.save(session);

   return;
};
