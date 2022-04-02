const express = require("express")
const { signup } = require("../controllers/AuthController")
const UserModel = require("../models/UserModel")

const router = express.Router()

router.post(
  "/signup",
  (req, res, next) => {
    const body = req.body

    if (body.password === undefined) {
      return res.status(400).jsend.fail({
        message: "password is missing"
      })
    }
    console.log("go to next")
    next()
  },
  signup
)

module.exports = router
