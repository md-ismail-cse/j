import jwt from "jsonwebtoken";
import Customers from "../models/customer.model.js";

const customerAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, email } = decoded;
    const customer = await Customers.findById(id);
    if (customer) {
      req.id = id;
      req.customer = customer;
      next();
    } else {
      next("User can not find!");
    }
  } catch (error) {
    next("Authontication failed!");
  }
};

export default customerAuth;
