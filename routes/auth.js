const express = require("express")
const { UserSchema } = require("../constants/schemas")
const AuthController = require("../controllers/AuthController")
const Middleware = require("../middleware")

const router = express.Router()

router.post(
  "/signup",
  Middleware.validateBody(UserSchema.signup),
  AuthController.signup
)
router.post(
  "/signin",
  Middleware.validateBody(UserSchema.signin),
  AuthController.signin
)

module.exports = router
