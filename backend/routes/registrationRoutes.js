const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Registration = require("../models/Registration");

// 1. Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Saves file with unique timestamp + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// File validation filter (Accept PDFs and Word Docs only)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Word documents are allowed!"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// =============================
// CREATE REGISTRATION (With File Upload)
// =============================
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, technology, status } = req.body;
    
    const registrationData = {
      name,
      email,
      technology,
      status: status || "Applied",
      resume: req.file ? `/uploads/${req.file.filename}` : null
    };

    const registration = new Registration(registrationData);
    const savedData = await registration.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =============================
// GET ALL REGISTRATIONS
// =============================
router.get("/", async (req, res) => {
  try {
    const records = await Registration.find().sort({ _id: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =============================
// GET SINGLE REGISTRATION BY ID
// =============================
router.get("/:id", async (req, res) => {
  try {
    const record = await Registration.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found." });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================
// UPDATE REGISTRATION STATUS / DETAILS
// =============================
router.put("/:id", async (req, res) => {
  try {
    const { name, email, technology, status } = req.body;
    
    const updatedRecord = await Registration.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, technology, status } },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ success: false, message: "Record not found." });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================
// DELETE REGISTRATION (Crucial Fix for Front-end 404/500 Errors)
// =============================
router.delete("/:id", async (req, res) => {
  try {
    // 1. Locate Document in MongoDB first to check for physical file cleanups
    const record = await Registration.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found in collection cluster." });
    }

    // 2. Clear out local storage copy of the file if one exists
    if (record.resume) {
      // Reconstruct local system directory address from database string path
      const filename = record.resume.replace("/uploads/", "");
      const physicalFilePath = path.join(uploadDir, filename);
      
      if (fs.existsSync(physicalFilePath)) {
        fs.unlinkSync(physicalFilePath);
      }
    }

    // 3. Purge Document from MongoDB collection
    await Registration.findByIdAndDelete(req.params.id);

    // Return a clean 200 OK block so front-end `res.ok` matches up perfectly
    res.status(200).json({ success: true, message: "Record and attached assets deleted successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;