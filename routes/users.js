const express = require("express")
const UserController = require("../controllers/UserController")

const router = express.Router()

router.get("/me", UserController.getMe)

module.exports = router
