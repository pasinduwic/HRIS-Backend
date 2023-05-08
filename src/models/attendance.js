import mongoose, { Schema } from "mongoose";

const attendanceSchema = Schema({
  employee: {
    type: Schema.Types.ObjectId,
    requirder: true,
    ref: "Employee",
  },
  date: {
    type: Date,
    required: true,
  },
  in: {
    type: String,
    required: true,
  },
  out: {
    type: String,
  },
  OT: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
