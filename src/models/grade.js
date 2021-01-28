const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  grade: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    ref: "Student"
  },
  year: {
    type: Number,
    required: true,
    trim: true,
    validate(value) {
      if (value > 7) {
        throw new Error("All Programmes have a maximum of 7 years")
      }
    }
  }
}, {
  timestamps: true
})

const GradeModel = mongoose.model("Grade", gradeSchema)

module.exports = GradeModel