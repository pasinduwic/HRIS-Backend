import express from "express";
import Dept from "../models/department.js";
import Office from "../models/office.js";

const router = express.Router();

//APIs
//create Dept

router.post("/api/department", async (req, res) => {
  // const office = await Office.findById(req.body.office);
  // console.log(office);
  // req.body.office = office._id;
  const newDept = new Dept(req.body);
  try {
    const checkDept = await Dept.findOne({ name: newDept.name }).populate(
      "office"
    );
    await newDept.populate("office");
    // console.log(newDept);
    // console.log(checkDept);

    if (checkDept?.office._id === newDept.office) {
      return res.send({ errorSpecified: "Department is alreday exist!" });
    }

    await newDept.save();
    await newDept.populate("office");
    // console.log(newDept);
    res.send(newDept);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//read all departments

router.get("/api/department", async (req, res) => {
  try {
    const allDept = await Dept.find().populate("office");

    if (!allDept) {
      return res.send({ error: "No Depertments found!" });
    }

    res.send(allDept);
  } catch (e) {
    res.send({ error: e });
  }
});

//update department
router.put("/api/department:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const updatedDepartment = await Dept.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDepartment) {
      return res.send({ errorSpecified: "Department not found!" });
    }
    res.send(updatedDepartment);
  } catch (e) {
    res.send({ error: e });
  }
});

// delete department

router.delete("/api/department:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deleteddept = await Dept.findByIdAndDelete({ _id });

    if (!deleteddept) {
      return res.send({ errorSpecified: "Depratment not found!" });
    }

    res.send(deleteddept);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
