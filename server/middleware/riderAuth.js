import jwt from "jsonwebtoken";
import Riders from "../models/rider.model.js";

const riderAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, email } = decoded;
    const rider = await Riders.findById(id);
    if (rider) {
      req.id = id;
      req.rider = rider;
      next();
    } else {
      next("User can not find!");
    }
  } catch (error) {
    next("Authontication failed!");
  }
};

export default riderAuth;
