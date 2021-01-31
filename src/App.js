const express = require("express")
const cors = require("cors")
require("./db/mongoose")

const studentRouter = require("./routers/studentRouter")
const staffRouter = require("./routers/staffRouter")

const app = express()

app.use(express.json())
app.use(cors())
app.use(studentRouter)
app.use(staffRouter)

module.exports = app