import mongoose, { Schema } from "mongoose";
import defaults from "nodemon/lib/config/defaults";

const monthlyDataSchema = Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  month: {
    type: String,
    required: true,
  },
  attendance: {
    type: Number,
    default: 0,
  },
});

const MonthyData = mongoose.model("MonthlyData", monthlyDataSchema);

export default MonthyData;
