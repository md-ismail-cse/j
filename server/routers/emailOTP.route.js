import express from "express";
import nodemailer from "nodemailer";
import Customers from "../models/customer.model.js";
const router = express.Router();

// email config
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "afrinsultana5555@gmail.com",
    pass: "mnty ohoi rcnz ssqn",
  },
});

// UPDATE CUSTOMER
router.put("/", async (req, res) => {
  const id = req.body.id;

  if (!req.body) {
    return res.json({ Message: "Data to update can not be empty." });
  }
  if (req.body.otp) {
    const otp = Number(req.body.otp);

    try {
      await Customers.findById(id).then(async (customer) => {
        if (customer.emailOTP === otp) {
          await Customers.findByIdAndUpdate(
            id,
            { emailVerification: true },
            {
              useFindAndModify: false,
            }
          )
            .then((data) => {
              res.json({ message: "Email verification successfull." });
            })
            .catch((err) => {
              res.json({ message: "Email verification failed." });
            });
        } else {
          res.json({ message: "OTP doesn't match!" });
        }
      });
    } catch (error) {
      res.json({ message: "User doesn't exist!" });
    }
  } else {
    const OTP = Math.floor(100000 + Math.random() * 900000);

    await Customers.findByIdAndUpdate(
      id,
      { emailOTP: OTP },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        const mailOptions = {
          from: "afrinsultana5555@gmail.com",
          to: data.email,
          subject: "USB Express Email Verification",
          html: `<div>
            <h3>Dear ${data.name},</h3>
            <h3>Your verification code is:</h3>
            <p><span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:22px;line-height:36px;font-weight:bold;letter-spacing:5px;padding:10px 25px;background-color:#f2f2f2;">${OTP}</span></p>
            <h3>Thank you,</h3>
            <h2>USB Express</h2>
            </div>`,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            res
              .status(200)
              .json({ message: "A verification code was send in your email." });
          }
        });
      })
      .catch((err) => {
        res.json({ message: "Error updatating customer." });
      });
  }
});

export default router;
