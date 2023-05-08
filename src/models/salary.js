import mongoose, { Schema } from "mongoose";

const salarySchema = Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  basic: {
    type: Number,
    required: true,
  },
  transportAllawance: {
    type: Number,
  },
  mobileAllawance: {
    type: Number,
  },
  otherAllawance: {
    type: Number,
  },
  OTAllawance: {
    type: Number,
    default: 0,
  },
  gross: {
    type: Number,
    required: true,
  },
  EPFEmp: {
    type: Number,
  },
  EPFCompany: {
    type: Number,
  },
  ETF: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  net: {
    type: Number,
    required: true,
  },
});

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
