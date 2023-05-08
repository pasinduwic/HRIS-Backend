import mongoose, { Schema } from "mongoose";

const LeaveRecordsSchema = Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  leaveType: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberofDays: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
});

const LeaveRecords = mongoose.model("LeaveRecords", LeaveRecordsSchema);

export default LeaveRecords;
