const { queries } = require("./Models/model");
exports.autoInc = async () => {
  const [recentDoc] = await queries.find().sort({ _id: -1 }).limit(1);
  if (!recentDoc) return 0;

  return recentDoc.trackingNo;
};
