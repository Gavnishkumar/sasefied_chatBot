const { queries } = require("../Models/model");

const { autoInc } = require("../autoIncrement");
const {
  sunRecords,
  mondayRecords,
  tuesdayRecords,
  wednesdayRecords,
  thursdayRecords,
  fridayRecords,
  satRecords,
} = require("../queryWeekData");

const {
  julRecords,
  janRecords,
  febRecords,
  marRecords,
  aprRecords,
  mayRecords,
  junRecords,
} = require("../queryYearlyData");
//Query controlllers
exports.createQuery = async (req, res) => {
  try {
    const seq = await autoInc();
    const obj = req.body;
    obj["trackingNo"] = seq + 1;
    julRecords();
    const query = await queries.create(obj);
    if (!query) throw new Error("Query not inserted");
    res.status(201).json({
      message: "Sucessfully Created",
      status: true,
    });
  } catch (error) {
    res.status(444).json({
      message: `${error}`,
      status: false,
    });
  }
};
exports.getQueries = async (req, res) => {
  try {
    if (req.query.limit === "5") {
      const data = await queries.find().sort({ _id: -1 }).limit(5);
      if (!data) throw new Error("Something Went Wrong");
      res.status(200).json(data);
    } else {
      const data = await queries.find();
      if (!data) throw new Error("Something Went Wrong");
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }
};
exports.getQueryDetails = async (req, res) => {
  try {
    let query = req.query;
    if (!query) {
      query = "";
    }

    const totalQuery = await queries.find().count();
    const resQuery = await queries
      .find({
        status: 1,
      })
      .count();
    const unResQuery = await queries
      .find({
        status: 0,
      })
      .count();

    res.status(200).json({
      totalQuery,
      resQuery,
      unResQuery,
    });
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }
};
exports.getQueryWeek = async (req, res) => {
  try {
    const resolveList = [
      (await mondayRecords()).res.length,
      (await tuesdayRecords()).res.length,
      (await wednesdayRecords()).res.length,
      (await thursdayRecords()).res.length,
      (await fridayRecords()).res.length,
      (await satRecords()).res.length,
      (await sunRecords()).res.length,
    ];
    const unResolveList = [
      (await mondayRecords()).notRes.length,
      (await tuesdayRecords()).notRes.length,
      (await wednesdayRecords()).notRes.length,
      (await thursdayRecords()).notRes.length,
      (await fridayRecords()).notRes.length,
      (await satRecords()).notRes.length,
      (await sunRecords()).notRes.length,
    ];

    res.status(200).json({
      res: {
        name: "Queries resolved",
        data: resolveList,
      },
      reg: {
        name: "Queries registered",
        data: unResolveList,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }
};
exports.getQueryYear = async (req, res) => {
  try {
    const resolveList = [
      (await janRecords()).res.length,
      (await febRecords()).res.length,
      (await marRecords()).res.length,
      (await aprRecords()).res.length,
      (await mayRecords()).res.length,
      (await junRecords()).res.length,
      (await julRecords()).res.length,
    ];
    const unResolveList = [
      (await janRecords()).notRes.length,
      (await febRecords()).notRes.length,
      (await marRecords()).notRes.length,
      (await aprRecords()).notRes.length,
      (await mayRecords()).notRes.length,
      (await junRecords()).notRes.length,
      (await julRecords()).notRes.length,
    ];

    res.status(200).json({
      yearRes: {
        name: "Queries resolved",
        data: resolveList,
      },
      yearReg: {
        name: "Queries registered",
        data: unResolveList,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }
};

exports.updateQuery = async (req, res) => {
  try {
    const query = await queries.findByIdAndUpdate(req.body._id, req.body, {
      runValidators: true,
      new: true,
    });
    console.log(query);
    if (!query) throw new Error("Not Updated");
    res.status(200).json({
      message: "sucessfully Updated",
      status: true,
    });
  } catch (error) {
    res.status(409).json({
      message: `${error}`,
      status: false,
    });
  }
};

exports.deleteQuery = async (req, res) => {
  try {
    const query = await queries.findByIdAndDelete(req.body._id);
    if (!query) throw new Error("Not Deleted");
    res.status(204).json({
      message: "sucessfully Deleted",
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
      status: false,
    });
  }

};
exports.genderWiseQuery = async (req, res) => {
  try {
    // Count the number of queries for each gender
    const genderCounts = await queries.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      }
    ]);

    // Prepare the response
    const result = {
      male: 0,
      female: 0,
      other: 0
    };

    // Extract the counts for each gender
    genderCounts.forEach((item) => {
      const gender = item._id ? item._id.toLowerCase() : 'other';
      result[gender] = item.count;
    });
    res.json(result);
  } catch (error) {
       res.status(500).json({ error: 'An error occurred while fetching data.' });
  }

};

