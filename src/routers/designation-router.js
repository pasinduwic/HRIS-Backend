import express from "express";
import Designation from "../models/designation.js";

const router = express.Router();

// create designationSchema
router.post("/api/designation", async (req, res) => {
  const newDesignation = new Designation(req.body);

  try {
    console.log(newDesignation);
    const checkDesignation = await Designation.findOne({
      name: newDesignation.name,
    }).populate("department");
    console.log(checkDesignation);
    if (checkDesignation) {
      return res.send({ errorSpecified: "Designation name already exists!" });
    }

    await newDesignation.save();
    await newDesignation.populate("department");

    res.send(newDesignation);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//read designation
router.get("/api/designation", async (req, res) => {
  try {
    const designation = await Designation.find().populate("department");
    // console.log(deletedDesignation);
    if (designation.length === 0) {
      return res.send({ error: "No records available!" });
    }
    res.send(designation);
  } catch (e) {
    res.send({ error: e });
  }
});
// update designation
router.put("/api/designation:id", async (req, res) => {
  const _id = req.params.id;
  console.log(req.body);
  try {
    const designation = await Designation.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(designation);
    if (designation.length === 0) {
      return res.send({ errorSpecified: "No records available!" });
    }
    res.send(designation);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

//delete designation
router.delete("/api/designation:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedDesignation = await Designation.findByIdAndDelete({ _id });
    console.log(deletedDesignation);
    if (!deletedDesignation) {
      return res.send({ errorSpecified: "Designation not found!" });
    }

    res.send(deletedDesignation);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
