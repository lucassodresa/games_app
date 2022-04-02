const UserModel = require("../models/UserModel")

const signup = async (req, res) => {
  const body = req.body

  const user = new UserModel({
    ...body
  })

  await user.save()

  return res.jsend.success({
    message: "user created!",
    user: body
  })
}

module.exports = { signup }
