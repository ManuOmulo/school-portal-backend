
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  employeeNo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
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


// ******** Model methods **********
staffSchema.statics.findByCredentials = async (employeeNo, password) => {
  const staff = await StaffModel.findOne({ employeeNo })
  if (!staff) {
    throw new Error("Unable to Login")
  }

  const isMatch = await bcrypt.compare(password, staff.password)
  if (!isMatch) {
    throw new Error("Unable to Login")
  }

  return staff
}


// ******** instance methods *********
staffSchema.methods.generateAuthToken = async function () {
  const staff = this
  const token = await jwt.sign({_id: staff.id.toString()}, process.env.JWT_SECRET)
  staff.tokens = staff.tokens.concat({token: token})
  await staff.save()
  return token
}


staffSchema.pre("save", async function (next) {
  const staff = this
  if (staff.isModified("password")) {
    staff.password = await bcrypt.hash(staff.password, 10)
  }
  next()
})


const StaffModel = mongoose.model("Staff", staffSchema)

module.exports = StaffModel