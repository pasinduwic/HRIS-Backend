import express from "express";
import Salary from "../models/salary.js";

const router = express.Router();

//APIs

//create salary
router.post("/api/salary", async (req, res) => {
  const newSalary = new Salary(req.body);
  // console.log(newSalary);

  try {
    await newSalary.save();

    res.send(newSalary);
  } catch (e) {
    res.send({
      error: e,
    });
  }
});

//read salary
router.get("/api/salary:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const allSalary = await Salary.find();
    const filterdSalary = allSalary.filter(
      (index) => index.employee.toString() === _id
    );

    console.log(filterdSalary);
    if (filterdSalary.length === 0) {
      return res.send({ error: "No records available!" });
    }

    res.send(filterdSalary[0]);
  } catch (e) {
    res.send({ error: e });
  }
});

//update salary

router.put("/api/salary:id", async (req, res) => {
  const _id = req.params.id;
  // console.log(req.body);

  try {
    const updatedSalary = await Salary.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });

    console.log(updatedSalary);

    if (updatedSalary.length === 0) {
      return res.send({ errorSpecified: "Record not found!" });
    }

    res.send(updatedSalary);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
