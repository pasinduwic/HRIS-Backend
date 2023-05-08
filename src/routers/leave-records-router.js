import express from "express";
import LeaveRcords from "../models/leaveRecorde.js";
import Leave from "../models/leaves.js";
import moment from "moment";

const router = express.Router();

//APIs

//create leave
router.post("/api/leave", async (req, res) => {
  // console.log(req.body);
  const newLeave = new LeaveRcords(req.body);

  try {
    const leaveDetails = await Leave.findOne({ employee: newLeave.employee });
    // console.log(leaveDetails);
    if (leaveDetails.length === 0) {
      return res.send({ errorSpecified: "No leave details found!" });
    } else if (
      leaveDetails.carryOver > 0 &&
      newLeave.leaveType === 5 &&
      leaveDetails.carryOver >= newLeave.numberofDays
    ) {
      leaveDetails.carryOver -= newLeave.numberofDays;
    } else if (
      leaveDetails.anual > 0 &&
      newLeave.leaveType === 1 &&
      leaveDetails.anual >= newLeave.numberofDays
    ) {
      leaveDetails.anual -= newLeave.numberofDays;
    } else if (
      leaveDetails.casual > 0 &&
      newLeave.leaveType === 2 &&
      leaveDetails.casual >= newLeave.numberofDays
    ) {
      leaveDetails.casual -= newLeave.numberofDays;
    } else if (
      leaveDetails.medical > 0 &&
      newLeave.leaveType === 3 &&
      leaveDetails.medical >= newLeave.numberofDays
    ) {
      leaveDetails.medical -= newLeave.numberofDays;
    } else if (newLeave.leaveType === 4) {
      leaveDetails.nopay += newLeave.numberofDays;
    } else {
      return res.send({ errorSpecified: "Not enough leaves in this type!" });
    }

    // console.log(leaveDetails);
    await newLeave.save();
    await leaveDetails.save();

    res.send(newLeave);
  } catch (e) {
    res.send({
      error: e,
    });
  }
});

//read leaves
router.get("/api/leave:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const allLeaves = await LeaveRcords.find().populate("employee", {
      first_name: 1,
      last_name: 1,
    });

    const filteredLeaves = allLeaves?.filter(
      (index) => index.employee._id.toString() === _id
    );
    // console.log(filteredLeaves);
    if (filteredLeaves.length === 0 || !filteredLeaves) {
      return res.send({ error: "No records available!" });
    }

    res.send(filteredLeaves);
  } catch (e) {
    res.send({ error: e });
  }
});

//read all leaves
router.get("/api/leave", async (req, res) => {
  // const _id = req.params.id;

  try {
    const allLeaves = await LeaveRcords.find().populate("employee", {
      first_name: 1,
      last_name: 1,
    });

    if (allLeaves.length === 0) {
      return res.send({ error: "No records available!" });
    }

    res.send(allLeaves);
  } catch (e) {
    res.send({ error: e });
  }
});

//update leave

router.put("/api/leave:id", async (req, res) => {
  const _id = req.params.id;
  const newRecord = req.body;

  try {
    let preRecord = await LeaveRcords.findOne({ _id });
    let leaveDetails = await Leave.findOne({
      employee: preRecord.employee,
    });
    console.log(newRecord);

    if (leaveDetails.length === 0) {
      return res.send({ errorSpecified: "No leave details found!" });
    } else {
      //removing previouse leave details
      if (preRecord.leaveType === 5) {
        leaveDetails.carryOver += preRecord.numberofDays;
      } else if (preRecord.leaveType === 1) {
        leaveDetails.anual += preRecord.numberofDays;
      } else if (preRecord.leaveType === 2) {
        leaveDetails.casual += preRecord.numberofDays;
      } else if (preRecord.leaveType === 3) {
        leaveDetails.medical += preRecord.numberofDays;
      } else if (preRecord.leaveType === 4) {
        leaveDetails.nopay -= preRecord.numberofDays;
      }

      //adding new leave details
      if (
        leaveDetails.carryOver > 0 &&
        newRecord.leaveType === "5" &&
        leaveDetails.carryOver >= newRecord.numberofDays
      ) {
        leaveDetails.carryOver -= newRecord.numberofDays;
      } else if (
        leaveDetails.anual > 0 &&
        newRecord.leaveType === "1" &&
        leaveDetails.anual >= newRecord.numberofDays
      ) {
        leaveDetails.anual -= newRecord.numberofDays;
      } else if (
        leaveDetails.casual > 0 &&
        newRecord.leaveType === "2" &&
        leaveDetails.casual >= newRecord.numberofDays
      ) {
        leaveDetails.casual -= newRecord.numberofDays;
      } else if (
        leaveDetails.medical > 0 &&
        newRecord.leaveType === "3" &&
        leaveDetails.medical >= newRecord.numberofDays
      ) {
        leaveDetails.medical -= newRecord.numberofDays;
      } else if (newRecord.leaveType === "4") {
        leaveDetails.nopay += newRecord.numberofDays;
      } else {
        return res.send({ errorSpecified: "Not enough leaves in this type!" });
      }
    }

    // console.log(leaveDetails);
    const updatedLeave = await LeaveRcords.findByIdAndUpdate(
      { _id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(newRecord);
    // console.log(updatedLeave);
    // console.log(leaveDetails);
    await leaveDetails.save();
    res.send(updatedLeave);
  } catch (e) {
    res.send({ error: e });
    console.log(e);
  }
});

//delete office

router.delete("/api/leave:id", async (req, res) => {
  const _id = req.params.id;

  try {
    let preRecord = await LeaveRcords.findOne({ _id });
    let leaveDetails = await Leave.findOne({
      employee: preRecord.employee,
    });
    console.log(preRecord);
    if (leaveDetails.length === 0) {
      return res.send({ errorSpecified: "No leave details found!" });
    } else {
      //removing previouse leave details
      if (preRecord.leaveType === 5) {
        leaveDetails.carryOver += preRecord.numberofDays;
      } else if (preRecord.leaveType === 1) {
        leaveDetails.anual += preRecord.numberofDays;
      } else if (preRecord.leaveType === 2) {
        leaveDetails.casual += preRecord.numberofDays;
      } else if (preRecord.leaveType === 3) {
        leaveDetails.medical += preRecord.numberofDays;
      } else if (preRecord.leaveType === 4) {
        leaveDetails.nopay -= preRecord.numberofDays;
      }
    }
    console.log(leaveDetails);
    const deletedLeave = await LeaveRcords.findByIdAndDelete({ _id });

    if (!deletedLeave) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    await leaveDetails.save();
    res.send(deletedLeave);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
