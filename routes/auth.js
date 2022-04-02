const express = require("express")
const { UserSchema } = require("../constants/schemas")
const { signup } = require("../controllers/AuthController")
const validateBody = require("../middleware/validateBody")

const router = express.Router()

router.post("/signup", validateBody(UserSchema.signup), signup)

module.exports = router
