const { StatusCodes } = require("http-status-codes")
const UserModel = require("../models/UserModel")

const signup = async (req, res) => {
  try {
    const body = req.body
    const { email } = body

    const alreadyExistUserEmail = await UserModel.findOne({ email })
    if (alreadyExistUserEmail) {
      return res
        .status(StatusCodes.CONFLICT)
        .jsend.fail({ message: "Email already exist." })
    }

    const user = new UserModel({ ...body })

    await user.save()

    return res.status(StatusCodes.CREATED).jsend.success({
      message: "User created!",
      user: body
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error })
  }
}

module.exports = { signup }
