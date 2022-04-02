// libraries
const express = require("express")
const router = express.Router()

// imports
const auth = require("./auth")

router.use("/auth", auth)

module.exports = router
