import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
  sendLocation: {
    type: String,
    require: true,
  },
  endLocation: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Prices = mongoose.model("Prices", priceSchema);
export default Prices;
