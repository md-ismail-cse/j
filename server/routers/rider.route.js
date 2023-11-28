import express from "express";
import multer from "multer";
import Riders from "../models/rider.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/riders/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE RIDER
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Riders.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "Already registered." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/riders/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash("admin", saltRounds, async (err, hash) => {
        const newRiders = new Riders({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          gender: req.body.gender,
          address: req.body.address,
        });
        await newRiders.save().then((data) => {
          res.json({ message: "Rider registration successfull." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// ALL RIDER
router.get("/", async (req, res) => {
  await Riders.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No rider found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find rider." });
    });
});

// SINGLE RIDER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Riders.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No rider found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.json({ message: "No data found!" });
    });
});

// UPDATE RIDER
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data to update can not be empty." });
  }
  // If no new thumbnail found.
  if (req.body.oldPassword) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    await Riders.findOne({ email: email }).then((rider) => {
      if (rider) {
        bcrypt.compare(oldPassword, rider.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Riders.findByIdAndUpdate(
                id,
                { password: hash },
                {
                  useFindAndModify: false,
                }
              )
                .then((data) => {
                  if (!data) {
                    res.json({ message: "Can not update." });
                  } else {
                    res.json({ message: "Updated successful." });
                  }
                })
                .catch((err) => {
                  res.json({ message: "Error updatating rider." });
                });
            });
          } else {
            res.json({ message: "Old password doesn't match." });
          }
        });
      } else {
        res.json({ message: "Something wrong." });
      }
    });
  } else if (req.body.thumb) {
    await Riders.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Can not update." });
        } else {
          res.json({ data, message: "Rider updated." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating rider." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/riders/${oldThumb}`);

    await Riders.findByIdAndUpdate(
      id,
      { ...req.body, thumb: req.file.filename },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.json({ message: "Can not update." });
        } else {
          res.json({ message: "Rider updated." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating rider." });
      });
  }
});

// DELETE RIDER
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/riders/${thumb}`);

  await Riders.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Rider deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting rider." });
    });
});

export default router;
