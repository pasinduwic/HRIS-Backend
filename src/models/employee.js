import mongoose, { model, Schema } from "mongoose";

const employeeSchema = Schema({
  employee_no: {
    type: Number,
    unique: true,
    reqired: true,
  },
  first_name: {
    type: String,
    reqired: true,
  },
  last_name: {
    type: String,
    reqired: true,
  },
  designation: {
    //fk
    type: Schema.Types.ObjectId,
    reqired: true,
    ref: "Designation",
  },
  email: {
    type: String,
    reqired: true,
  },
  epf_no: {
    type: Number,
    unique: true,
    reqired: true,
  },
  photo: {
    type: String,
    default: "/images/emp_profile.png",
  },
  HOD: {
    //fk
    // type: String,
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  department: {
    //fk
    type: Schema.Types.ObjectId,
    reqired: true,
    ref: "Department",
  },
  phone_office: {
    type: Number,
  },
  phone_personal: {
    type: Number,
    reqired: true,
  },
  address: {
    type: String,
  },
  emergancy_contact_name: {
    type: String,
  },
  emergancy_contact_number: {
    type: Number,
  },
  joined_date: {
    type: Date,
    reqired: true,
  },
  end_date: {
    type: Date,
  },
  birthDay: {
    type: Date,
  },
  emp_status: {
    type: Number,
    default: 0,
  },
  office: {
    //fk
    type: Schema.Types.ObjectId,
    reqired: true,
    ref: "Office",
  },
  NIC: {
    type: String,
  },
  nationality: {
    type: String,
  },
  riligion: {
    type: String,
  },
  marital_status: {
    type: Number,
    default: 0,
  },
  carder: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Employee = model("Employee", employeeSchema);

export default Employee;
