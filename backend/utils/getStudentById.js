const { Student } = require("../models");
const { validationResult } = require('express-validator');

// Middleware to fetch student by ID
const getStudentByID = async (req, res, next) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const student = await Student.findById(id).select('-password');
    if (!student) {
      return res.status(404).json({ success, errors: 'Student does not exist' });
    }

    req.student = student;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success, errors: 'Server error' });
  }
};

module.exports = getStudentByID;