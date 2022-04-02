const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    active: Boolean,
    role: Number,
    availableBackground: Array,
    background: String,
    availableAvatar: Array,
    avatar: String
  },
  {
    collection: "users",
    timestamps: true
  }
)

module.exports = model("User", UserSchema)
