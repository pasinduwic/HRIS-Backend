import express from "express";
import Payrol from "../models/payrol.js";

const router = express.Router();

//APIs

//create payrol
router.post("/api/payrol", async (req, res) => {
  const newPayrol = new Payrol(req.body);
  console.log(req.body);
  try {
    await newPayrol.save();
    await newPayrol.populate("employee", { first_name: 1 });
    // console.log(newPayrol);
    res.send(newPayrol);
  } catch (e) {
    console.log(e);
    res.send({
      error: e,
    });
  }
});

//read all payrol
router.get("/api/payrol", async (req, res) => {
  // const _id = req.params.id;
  try {
    const allPayrols = await Payrol.find()
      .populate("employee", { first_name: 1, last_name: 1 })
      .populate("paidBy",{ displayName: 1});
    if (allPayrols.length === 0) {
      return res.send({ error: "No records available!" });
    }

    res.send(allPayrols);
  } catch (e) {
    res.send({ error: e });
  }
});

//update payrol

router.put("/api/payrol:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const updatedPayrol = await Payrol.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("employee", { first_name: 1 })
      .populate("paiedBy",{ displayName: 1});

    if (updatedPayrol.length === 0) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(updatedPayrol);
  } catch (e) {
    res.send({ error: e });
  }
});

//delete payrol

router.delete("/api/payrol:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedPayrol = await Payrol.findByIdAndDelete({ _id })
      .populate("employee", { first_name: 1 })
      .populate("paidBy", { displayName: 1});

    if (deletedPayrol.length === 0) {
      return res.send({ errorSpecified: "Record not found!" });
    }
    // console.log(deletedPayrol);
    res.send(deletedPayrol);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
