const express = require("express")

const Student = require("../models/student")

const router = new express.Router()

router.post("/students/register", async (req, res) => {
  const student = new Student(req.body)

  try {
    await student.save()
    const token = await student.generateAuthToken()
    res.status(201).send({ student, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router