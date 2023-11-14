import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  attended: {
    type: Boolean,
    required,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  byWho: {
    type: mongoose.Types.ObjectId,
  },
}, {timestamps: true});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema)

export default Attendance