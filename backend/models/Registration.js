const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  technology: { type: String, required: true },
  status: { type: String, default: "Applied" },
  resume: { type: String }, // Stores the file path string
}, { timestamps: true });

module.exports = mongoose.model("Registration", RegistrationSchema);