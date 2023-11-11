import express from "express";
import Prices from "../models/price.model.js";
const router = express.Router();

// CREATE PRICE
router.post("/", async (req, res) => {
  try {
    const newPriec = new Prices({
      sendLocation: req.body.sendLocation,
      endLocation: req.body.endLocation,
      price: req.body.price,
    });
    await newPriec.save().then((data) => {
      res.json({ message: "Price added." });
    });
  } catch (error) {
    res.json({
      message: `Error: ${error}`,
    });
  }
});

// ALL PRICE
router.get("/", async (req, res) => {
  await Prices.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.json({ message: "No price found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find price." });
    });
});

// SINGLE PRICE
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Prices.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No price found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find price." });
    });
});

// UPDATE PRICE
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  await Prices.findByIdAndUpdate(
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
        res.json({ message: "Price updated." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updatating price." });
    });
});

// DELETE PRICE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Prices.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Price deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting price." });
    });
});

export default router;
