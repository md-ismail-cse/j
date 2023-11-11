import mongoose from "mongoose";

const parcelSchema = mongoose.Schema({
  customerID: {
    type: String,
    require: true,
  },
  customerName: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  deliveryCost: {
    type: Number,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Ordered",
  },
  recName: {
    type: String,
    require: true,
  },
  recPhone: {
    type: String,
    require: true,
  },
  recEmail: {
    type: String,
    require: true,
  },
  recAddress: {
    type: String,
    require: true,
  },
  sendLocation: {
    type: String,
    require: true,
  },
  endLocation: {
    type: String,
    require: true,
  },
  payment: {
    type: String,
  },
  acceptTime: {
    type: Date,
  },
  expTime: {
    type: String,
    default: "0",
  },
  picRiderID: {
    type: String,
    default: "NaN",
  },
  dlvRiderID: {
    type: String,
    default: "NaN",
  },
});

const Parcels = mongoose.model("Parcels", parcelSchema);
export default Parcels;
