import express from "express";
import Admin from "../models/admin.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ADMIN LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Admin.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(password, admin.password, (err, result) => {
          if (result === true) {
            const payload = {
              id: admin._id,
              email: admin.email,
              name: admin.name,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "15d",
            });

            return res.status(200).send({
              success: true,
              message: "User is logged in successfully",
              token: "Bearer " + token,
              id: admin._id,
              name: admin.name,
            });
          } else {
            res.json({ message: "Password doesn't match!" });
          }
        });
      } else {
        res.json({ message: "Email doesn't exist!" });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
