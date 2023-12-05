import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    hashedPwd: {
      type: String,
    },
    username: {
      type: String,
    },
    birthdayMonth: {
      type: String,
    },
    image: {
      type: String,
    },
    birthDay: {
      type: Number,
    },
    dept: {
      type: String,
    },
    gender: {
      type: String,
    },
    residentialAddress: {
      type: String,
    },
    houseFellowship: {
      type: String,
    },
    registeredBy: {
      type: String,
      default: 'self'
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: String
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models["User"] || mongoose.model("User", userSchema);

export default User;
