const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  employeeNo: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain phrase 'password'")
      }
    }
  },
  avatar: {
    type: Buffer,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
}, {
  timestamps: true
})

const StaffModel = mongoose.model("Staff", staffSchema)

module.exports = StaffModel