const yup = require("yup")

const signup = yup.object({
  name: yup.string().max(255).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().max(255).required()
})

module.exports = { signup }
