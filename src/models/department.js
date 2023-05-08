import mongoose, { Schema } from "mongoose";

const departmentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Office",
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
