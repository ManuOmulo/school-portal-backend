const express = require("express")
const cors = require("cors")
require("./db/mongoose")

const studentRouter = require("./routers/studentRouter")

const app = express()

app.use(express.json())
app.use(cors())
app.use(studentRouter)

module.exports = app