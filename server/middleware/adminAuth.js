import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const adminAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, email } = decoded;
    const admin = await Admin.findById(id);
    if (admin) {
      req.id = id;
      req.admin = admin;
      next();
    } else {
      next("User can not find!");
    }
  } catch (error) {
    next("Authontication failed!");
  }
};

export default adminAuth;
