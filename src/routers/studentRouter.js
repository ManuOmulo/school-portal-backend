const express = require("express")

const Student = require("../models/student")
const studentAuth = require("../middleware/studentAuthentication")

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

router.post("/students/login", async (req, res) => {
  try {
    const student = await Student.findByCredentials(req.body.admNo, req.body.password)
    const token = await student.generateAuthToken()
    res.send({ student, token })
  } catch {
    res.status(400).send()
  }
})

router.get("/students/me", studentAuth, async (req, res) => {
  const student = req.student
  res.send(student)
})

module.exports = router