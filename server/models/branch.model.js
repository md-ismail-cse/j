import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
  branch: {
    type: String,
    require: true,
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

const Branches = mongoose.model("Branches", branchSchema);
export default Branches;
