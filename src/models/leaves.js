import mongoose, { Schema } from "mongoose";


const leaveSchema = Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  anual: {
    type: Number,
    default: 14,
  },
  casual: {
    type: Number,
    default: 7,
  },
  medical: {
    type: Number,
    default: 0,
  },
  nopay: {
    type: Number,
    default: 0,
  },
  carryOver: {
    type: Number,
    default: 0,
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
