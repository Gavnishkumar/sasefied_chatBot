const { queries } = require("./Models/model");
exports.janRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 0, 1),
          $lt: new Date(date.getFullYear(), 1, 1),
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
          $gte: new Date(date.getFullYear(), 0, 1),
          $lt: new Date(date.getFullYear(), 1, 1),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.febRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 1, 1),
          $lt: new Date(date.getFullYear(), 2, 1),
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
          $gte: new Date(date.getFullYear(), 1, 1),
          $lt: new Date(date.getFullYear(), 2, 1),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.marRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 2, 1),
          $lt: new Date(date.getFullYear(), 3, 1),
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
          $gte: new Date(date.getFullYear(), 2, 1),
          $lt: new Date(date.getFullYear(), 3, 1),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.aprRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 3, 1),
          $lt: new Date(date.getFullYear(), 4, 1),
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
          $gte: new Date(date.getFullYear(), 3, 1),
          $lt: new Date(date.getFullYear(), 4, 1),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.mayRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 4, 1),
          $lt: new Date(date.getFullYear(), 5, 1),
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
          $gte: new Date(date.getFullYear(), 4, 1),
          $lt: new Date(date.getFullYear(), 5, 1),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.junRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 5, 1),
          $lt: new Date(date.getFullYear(), 6, 1),
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
          $gte: new Date(date.getFullYear(), 5, 1),
          $lt: new Date(date.getFullYear(), 6, 1),
        },
      },
    },
  ]);

  const Data = { res, notRes };
  return Data;
};
exports.julRecords = async () => {
  const date = new Date();
  const res = await queries.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date.getFullYear(), 6, 1),
          $lt: new Date(date.getFullYear(), 7, 1),
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
          $gte: new Date(date.getFullYear(), 6, 1),
          $lt: new Date(date.getFullYear(), 7, 1),
        },
      },
    },
  ]);
  console.log(notRes);
  const Data = { res, notRes };
  return Data;
};
