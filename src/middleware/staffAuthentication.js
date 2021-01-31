const jwt = require("jsonwebtoken")
const Staff = require("../models/staff")

const staffAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

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
  } catch {
    res.status(401).send({Error: "Please Login"})
  }
}

module.exports = staffAuth