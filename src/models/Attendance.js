import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  attended: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
  },
  byWho: {
    type: String,
    default: "self"
  },
}, {timestamps: true});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema)

export default Attendance