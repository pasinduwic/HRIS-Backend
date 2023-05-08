import express from "express";
import Attendance from "../models/attendance.js";

const router = express.Router();

//APIs

//create attendance
router.post("/api/attendance", async (req, res) => {
  console.log(req.body);
  const newAttendance = new Attendance(req.body);

  try {
    await newAttendance.save();
    newAttendance.populate("employee", {
      first_name: 1,
      last_name: 1,
      epf_no: 1,
    });
    console.log(newAttendance);
    res.send(newAttendance);
  } catch (e) {
    res.send({
      error: e,
    });
  }
});

//read all attendance
router.get("/api/attendance", async (req, res) => {
  const _id = req.params.id;

  try {
    const allAttendance = await Attendance.find().populate("employee", {
      first_name: 1,
      last_name: 1,
      epf_no: 1,
    });
    // const filterdAttendance = allAttendance?.filter(
    //   (index) => index.employee._id.toString() === _id
    // );

    // console.log(allAttendance);
    if (allAttendance.length === 0) {
      return res.send({ error: "No records available!" });
    }

    res.send(allAttendance);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//read attendance
router.get("/api/attendance:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const allAttendance = await Attendance.find().populate("employee", {
      first_name: 1,
      last_name: 1,
      epf_no: 1,
    });
    const filterdAttendance = allAttendance?.filter(
      (index) => index.employee._id.toString() === _id
    );

    // console.log(filterdAttendance);
    if (filterdAttendance.length === 0) {
      return res.send({ error: "No records available!" });
    }

    res.send(filterdAttendance);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//update attendance

router.put("/api/attendance:id", async (req, res) => {
  const _id = req.params.id;

  console.log(_id);
  console.log(req.body);
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate({
      _id: _id,
    }, req.body).populate("employee", {
      first_name: 1,
      last_name: 1,
      epf_no: 1,
    });
    // updatedAttendance.out = req.body.out;

    // updatedAttendance.save();
    // console.log(updatedAttendance);
    if (updatedAttendance.length === 0) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(updatedAttendance);
  } catch (e) {
    res.send({ error: e });
  }
});

//delete attendance

router.delete("/api/attendance:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedattendance = await Attendance.findByIdAndDelete({ _id });

    if (deletedattendance.length === 0) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(deletedattendance);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
