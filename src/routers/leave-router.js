import express from "express";
import Leave from "../models/leaves.js";

const router = express.Router();

//APIs

//create employee
router.post("/api/lvrecords", async (req, res) => {
  //   console.log("newEmployee");
  console.log("newLeaveData");
  try {
    const newLeaveData = new Leave(req.body);
    console.log(newLeaveData);
    await newLeaveData.save();
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

    res.send(newLeaveData);
  } catch (e) {
    console.log(e);
    res.send({
      error: e,
    });
  }
});

//read leave
router.get("/api/lvrecords:id", async (req, res) => {
  //   console.log("leaveDetail");
  const _id = req.params.id;
  try {
    const leaveDetail = await Leave.findOne({ employee: _id });

    console.log("leaveDetail");
    if (!leaveDetail) {
      return res.send({ error: "No records available!!" });
    }

    res.send(leaveDetail);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});
//read all leave
router.get("/api/lvrecords", async (req, res) => {
  //   console.log("leaveDetail");
  // const _id = req.params.id;
  try {
    const leaveDetail = await Leave.find();

    console.log("leaveDetail");
    if (!leaveDetail) {
      return res.send({ error: "No records available!!" });
    }

    res.send(leaveDetail);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//update employee

router.put("/api/lvrecords:id", async (req, res) => {
  //   console.log("leaveDetail");
  const _id = req.params.id;

  try {
    const updatedLeaveDetails = await Leave.findByIdAndUpdate(
      { _id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLeaveDetails) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(updatedLeaveDetails);
  } catch (e) {
    res.send({ error: e });
  }
});

//delete employee
//not tested

router.delete("/api/lvrecords:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedLeaveDetails = await Leave.findByIdAndDelete({ _id });

    if (!deletedLeaveDetails) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(deletedLeaveDetails);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
