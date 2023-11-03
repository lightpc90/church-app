import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  attended: {
    type: Boolean,
    required,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  byWho: {
    type: String,
  },
}, {timestamps: true});

const Attendance = mongoose.model.Attendance || mongoose.model('Attendance', AttendanceSchema)

export default Attendance