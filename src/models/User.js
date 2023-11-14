import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  hashedPwd: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  birthdayMonth: {
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
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  }
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
