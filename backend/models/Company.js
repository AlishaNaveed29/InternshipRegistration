const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, default: "Technology" },
  contactPerson: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  openPositions: { type: Number, default: 0 },
  status: { type: String, default: "Active" },
  logo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Company", CompanySchema);