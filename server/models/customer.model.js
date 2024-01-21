import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  thumb: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  emailVerification: {
    type: Boolean,
    default: false,
  },
  emailOTP: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Customers = mongoose.model("Customers", customerSchema);
export default Customers;
