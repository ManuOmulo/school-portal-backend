const express = require("express")

const Staff = require("../models/staff")

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

module.exports = router