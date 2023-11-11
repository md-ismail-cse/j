import express from "express";
import Branches from "../models/branch.model.js";
const router = express.Router();

// CREATE BRANCH
router.post("/", async (req, res) => {
  try {
    const newBranch = new Branches({
      branch: req.body.branch,
      address: req.body.address,
    });
    await newBranch.save().then((data) => {
      res.json({ message: "Branch added." });
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL BRANCH
router.get("/", async (req, res) => {
  await Branches.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No branch found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find branch." });
    });
});

// SINGLE BRANCH
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Branches.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No branch found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find branch." });
    });
});

// UPDATE BRANCH
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  await Branches.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.json({ message: "Can not update." });
      } else {
        res.json({ message: "Branch updated." });
      }
    })
    .catch((err) => {
      res.json({ message: "Error updatating branch." });
    });
});

// DELETE BRANCH
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Branches.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Branch deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting branch." });
    });
});

export default router;
