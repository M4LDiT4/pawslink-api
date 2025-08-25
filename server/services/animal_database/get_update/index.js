const AnimalModel = require("../../../models").AnimalModel;

module.exports = async (lastUpdatedTime) => {
   const query = {};

  if (lastUpdatedTime) {
    // If provided, only fetch records newer than this
    query.updatedAt = { $gt: new Date(lastUpdatedTime) };
  }

  const updates = await AnimalModel.find(query)
    .sort({ updatedAt: 1 }) // ascending → oldest first
    .limit(50)
    .populate("vaccinationRecords")
    .populate("medicationRecords");
  return updates;
}