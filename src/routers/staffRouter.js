const express = require("express")

const Staff = require("../models/staff")
const staffAuth = require("../middleware/staffAuthentication")

const router = new express.Router()

router.post("/staff/register", async (req, res) => {
  const staff = new Staff(req.body)

  try {
    await staff.save()
    const token = await staff.generateAuthToken()
    res.status(201).send({ staff, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/staff/me", staffAuth, async (req, res) => {
  const staff = req.staff
  res.send(staff)
})

module.exports = router