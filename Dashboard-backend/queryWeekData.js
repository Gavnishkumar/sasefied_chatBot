const { queries } = require("./Models/model");
const getDate = (now, n) => {
  let Day = now.getDay();
  if (Day === 0) Day = 7;
  const days = (Day + 7 - 1) % n;
  now.setDate(now.getDate() - days);
  now.setHours(0, 0, 0, 0);
  return now;
};
exports.mondayRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 7),
          $lt: getDate(new Date(), 8),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 7),
          $lt: getDate(new Date(), 8),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.tuesdayRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 8),
          $lt: getDate(new Date(), 9),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 8),
          $lt: getDate(new Date(), 9),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.wednesdayRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 9),
          $lt: getDate(new Date(), 10),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 9),
          $lt: getDate(new Date(), 10),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.thursdayRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 10),
          $lt: getDate(new Date(), 11),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 10),
          $lt: getDate(new Date(), 11),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.fridayRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 11),
          $lt: getDate(new Date(), 12),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 11),
          $lt: getDate(new Date(), 12),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.satRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 12),
          $lt: getDate(new Date(), 13),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 12),
          $lt: getDate(new Date(), 13),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.sunRecords = async () => {
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 13),
          $lt: getDate(new Date(), 14),
        },
        status: {
          $eq: 1,
        },
      },
    },
  ]);

  const notRes = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getDate(new Date(), 13),
          $lt: getDate(new Date(), 14),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
