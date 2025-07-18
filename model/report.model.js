const mongoose = require("mongoose");

const reportsSchema = mongoose.Schema({
    contact_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    garp_cfa_id: {
      type: String,
      required: true,
    },
    exam_cycle: {
      type: Date,
      required: true,
    },
    result: {
      type: Boolean,
      required: true
    },
    used_midha_materials: {
      type: Boolean,
      required: true
    },
    comments: {
      type: String,
      trim: true
    }
  }, {
    timestamps: true,
    versionKey: false
  })

  //abcde

const reportsModel = mongoose.model("reports", reportsSchema);

module.exports = { reportsModel }
