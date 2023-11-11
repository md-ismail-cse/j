import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  customerID: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  read: {
    type: String,
    default: "No",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contacts = mongoose.model("Contacts", contactSchema);
export default Contacts;
