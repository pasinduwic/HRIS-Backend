import express from "express";
import Department from "../models/department.js";
import Employee from "../models/employee.js";
import LeaveData from "../models/leaves.js";

const router = express.Router();

//APIs

//create employee
router.post("/api/employee", async (req, res) => {
  const newEmployee = new Employee(req.body);
  // const newLeaveData = new LeaveData({
  //   employee: newEmployee._id,
  //   anual: 14,
  //   casual: 7,
  //   medical: 0,
  //   nopay: 0,
  //   carryOver: 0,
  // });
  // console.log(newEmployee);
  // console.log(newLeaveData);
  try {
    await newEmployee.save();
    // await newEmployee
    //   .populate("HOD", {
    //     first_name: 1,
    //     last_name: 1,
    //     designation: 1,
    //     email: 1,
    //   })
    //   .populate("office")
    //   .populate("department")
    //   .populate("designation");

    // await newLeaveData.save();
    // newLeaveData.populate("employee");

    res.send(newEmployee);
  } catch (e) {
    console.log(e);
    res.send({
      error: e,
    });
  }
});

//read all employees
router.get("/api/employee", async (req, res) => {
  try {
    const allEmployees = await Employee.find()
      .populate("HOD", {
        first_name: 1,
        last_name: 1,
        designation: 1,
        email: 1,
      })
      .populate("office")
      .populate("department")
      .populate("designation");

    if (!allEmployees) {
      return res.send({ error: "No records available!" });
    }

    res.send(allEmployees);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});
//read employee
router.get("/api/employee:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const correctEmployee = await Employee.findOne({ _id })
      .populate("HOD", {
        first_name: 1,
        last_name: 1,
        designation: 1,
        email: 1,
      })
      .populate("office")
      .populate("department")
      .populate("designation");

    if (!correctEmployee) {
      return res.send({ error: "No records available!" });
    }

    res.send(correctEmployee);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//update employee

router.put("/api/employee:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(updatedEmployee);
  } catch (e) {
    res.send({ error: e });
  }
});

//delete employee
//not tested

router.delete("/api/employee:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete({ _id });

    if (!deletedEmployee) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(deletedEmployee);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
