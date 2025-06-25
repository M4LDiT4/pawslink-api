const objectId = require('mongoose').Types.ObjectId;
const ActivityLogModel = require('../../models').ActivityLogModel;
/**
 * @description creates a new mongodb document for activity log
 * @param {*} session session this async function belongs to
 * @param {*} userId id of the user this activity log is related to
 * @param {*} action action by the user; limited to CREATE, UPDATED and DELETE
 * @param {*} collectionName the name of the collection where the action is done
 * @param {*} documentId id of the document that is affected by the action
 * @returns
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
