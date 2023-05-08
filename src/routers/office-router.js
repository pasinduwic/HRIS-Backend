import express from "express";
import Office from "../models/office.js";

const router = express.Router();

//APIs

//create office
router.post("/api/office", async (req, res) => {
  console.log(req.body);
  const checkOffice = await Office.findOne({ name: req.body.name });

  if (checkOffice) {
    return res.send({ errorSpecified: "office name is alreday take!" });
  }
  const newOffice = new Office(req.body);

  try {
    await newOffice.save();

    res.send(newOffice);
  } catch (e) {
    res.send({
      error: e,
    });
  }
});

//read all offices
router.get("/api/office", async (req, res) => {
  console.log(req.data)
  try {
    const allOffices = await Office.find();
    if (!allOffices) {
      return res.send({ error: "No office available!" });
    }

    res.send(allOffices);
  } catch (e) {
    res.send({ error: e });
  }
});

//update office
router.put("/api/office:id", async (req, res) => {
  const _id = req.params.id;
  console.log(req.body);
  try {
    const updatedOffice = await Office.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedOffice);
    if (!updatedOffice) {
      return res.send({ errorSpecified: "Department not found!" });
    }
    res.send(updatedOffice);
  } catch (e) {
    res.send({ error: e });
  }
});

//delete office

router.delete("/api/office:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedOffice = await Office.findByIdAndDelete({ _id });

    if (!deletedOffice) {
      return res.send({ errorSpecified: "Office not found!" });
    }

    res.send(deletedOffice);
  } catch (e) {
    res.send({ error: e });
  }
});

export default router;
