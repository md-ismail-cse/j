import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
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
    require: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
