const mongoose = require("mongoose");

//////Query Schema /////////

const schemaQuery = new mongoose.Schema(
  {
    trackingNo: {
      type: Number,
      required: true,
      unique: true,
    },
    safe: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    date: String,
    anyHarassment: String,
    organization: String,
    name: String,
    location: String,
    contactNumber: String,
    email: String,
    employeeOrStudentId: String,
    isEthnicMinority: String,
    gender: String,
    assaulted: String,
    oneOffIncident: String,
    dateOfIncident: String,
    nameOfAssaulter: String,
    reportAnonymously: String,
    reportToManagement: String,
    locationOfIncident: String,
    comment: String,
  },
  { timestamps: true }
);

exports.queries = mongoose.model("queries", schemaQuery);
