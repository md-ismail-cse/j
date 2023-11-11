import express from "express";
import Contacts from "../models/contact.model.js";
const router = express.Router();

// CREATE CONTACT
router.post("/", async (req, res) => {
  try {
    const newContact = new Contacts({
      customerID: req.body.customerID,
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      phone: req.body.phone,
      message: req.body.message,
      read: req.body.read,
    });
    await newContact.save().then((data) => {
      res.send({ message: "Message sent." });
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL CONTACT
router.get("/", async (req, res) => {
  await Contacts.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No message found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find message." });
    });
});

// SINGLE CONTACT
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Contacts.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No message found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find message." });
    });
});

// UPDATE READ STATUS
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  await Contacts.findByIdAndUpdate(
    id,
    { read: "Yes" },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not update." });
      } else {
        res.send("Message status updated.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updatating message status." });
    });
});

// DELETE CONTACT
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Contacts.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Message deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting message." });
    });
});

export default router;
