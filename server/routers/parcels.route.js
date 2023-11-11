import express from "express";
import Parcels from "../models/parcel.model.js";
const router = express.Router();

// CREATE PARCEL
router.post("/", async (req, res) => {
  try {
    const newParcel = new Parcels({
      customerID: req.body.customerID,
      customerName: req.body.customerName,
      type: req.body.type,
      note: req.body.note,
      weight: req.body.weight,
      deliveryCost: req.body.deliveryCost,
      totalPrice: req.body.totalPrice,
      recName: req.body.recName,
      recPhone: req.body.recPhone,
      recEmail: req.body.recEmail,
      recAddress: req.body.recAddress,
      sendLocation: req.body.sendLocation,
      endLocation: req.body.endLocation,
      payment: req.body.payment,
    });
    await newParcel.save().then((data) => {
      res.json({ message: "Parcel add successful." });
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL PARCEL
router.get("/", async (req, res) => {
  await Parcels.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No order found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find order." });
    });
});

// SINGLE PARCEL
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Parcels.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No order found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find order." });
    });
});

// UPDATE PARCEL
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data to update can not be empty." });
  }
  await Parcels.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not update." });
      } else {
        res.send("Order updated.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updatating order." });
    });
});

// DELETE PARCEL
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Parcels.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Order deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting order." });
    });
});

export default router;
