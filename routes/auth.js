const express = require("express")
const { UserSchema } = require("../constants/schemas")
const AuthController = require("../controllers/AuthController")
const validateBody = require("../middleware/validateBody")

const router = express.Router()

router.post("/signup", validateBody(UserSchema.signup), AuthController.signup)
router.post("/signin", validateBody(UserSchema.signin), AuthController.signin)

module.exports = router
