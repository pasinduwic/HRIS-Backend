import mongoose, { Schema } from "mongoose";

const designationSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
});

const Designation = mongoose.model("Designation", designationSchema);

export default Designation;
