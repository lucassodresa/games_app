const { StatusCodes } = require('http-status-codes')

const getMe = async (req, res) => {
  try {
    const { _id, name, email, role } = req._user
    return res.status(StatusCodes.OK).jsend.success({
      user: { _id, name, email, role }
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error })
  }
}

module.exports = { getMe }
