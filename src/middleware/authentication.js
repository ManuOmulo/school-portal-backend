const jwt = require("jsonwebtoken")
const Student = require("../models/student")
const Staff = require("../models/staff")

const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (req.body.admNo) {
      const student = await Student.findOne({
        _id: decoded._id,
        "tokens.token": token
      })

      if (!student) {
        throw new Error()
      }
      req.token = token
      req.student = student
      next()
    } else if (req.body.employeeNo) {
      const staff = await Staff.findOne({
        _id: decoded._id,
        "tokens.token": token
      })

      if (!staff) {
        throw new Error()
      }
      req.token = token
      req.staff = staff
      next()
    }
  } catch {
    res.status(401).send("Error: Please Login")
  }
}