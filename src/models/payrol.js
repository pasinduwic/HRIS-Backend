import mongoose, { Schema } from "mongoose";

const payrolSchema = Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  payType: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amountToEmployee: {
    type: Number,
  },
  //need to add
  amountByCompany: {
    type: Number,
  },
  nopay: {
    type: Number,
  },
  month: {
    type: Number,
  },
  otAmount: {
    type: Number,
  },
  net: {
    type: Number,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Payrol = mongoose.model("Payrol", payrolSchema);

export default Payrol;
