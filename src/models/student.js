const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  admNo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  school: {
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
  fees: {
    type: Number,
    default: 0,
    trim: true,
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


// ******** virtual properties *******
studentSchema.virtual("grades", {
  ref: "Grade",
  localField: "admNo",
  foreignField: "studentId"
})


// ************ instance methods **********
studentSchema.methods.generateAuthToken = async function() {
  const student = this
  const token = await jwt.sign({_id: student.id.toString()}, process.env.JWT_SECRET)
  student.tokens = student.tokens.concat({token: token})
  await student.save()
  return token
}


const StudentModel = mongoose.model("Student", studentSchema)

module.exports = StudentModel