import { model, Schema } from "mongoose";

const officeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Office = model("Office", officeSchema);

export default Office;
