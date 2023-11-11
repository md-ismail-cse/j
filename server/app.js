import express from "express";
import cors from "cors";
import branchRoute from "./routers/branches.route.js";
import priceRoute from "./routers/prices.route.js";
import contactRoute from "./routers/contacts.route.js";
import userRoute from "./routers/admin.route.js";
import customerRoute from "./routers/customers.route.js";
import parcelRoute from "./routers/parcels.route.js";
import riderRoute from "./routers/rider.route.js";
import adminLogin from "./routers/adminLogin.route.js";
import customerLogin from "./routers/customerLogin.route.js";
import riderLogin from "./routers/riderLogin.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// BRANCH API
app.use("/api/admin/branches", branchRoute);
app.use("/api/admin/branches/:id", branchRoute);

// PRICE API
app.use("/api/admin/prices", priceRoute);
app.use("/api/admin/prices/:id", priceRoute);

// CONTACT API
app.use("/api/admin/contacts", contactRoute);
app.use("/api/admin/contacts/:id", contactRoute);

// ADMIN API
app.use("/api/admin/admin", userRoute);
app.use("/api/admin/admin/:id", userRoute);

// CUSTOMER API
app.use("/api/admin/customers", customerRoute);
app.use("/api/admin/customers/:id", customerRoute);

// DELIVERY MEN API
app.use("/api/admin/riders", riderRoute);
app.use("/api/admin/riders/:id", riderRoute);

// ORDER API
app.use("/api/admin/parcels", parcelRoute);
app.use("/api/admin/parcels/:id", parcelRoute);

// ADMIN LOGIN API
app.use("/api/admin/adminlogin", adminLogin);

// CUSTOMER LOGIN API
app.use("/api/admin/customerlogin", customerLogin);

// DELIVERY MAN LOGIN API
app.use("/api/admin/riderlogin", riderLogin);

// EXPORT IMAGES
app.use("/default", express.static("uploads/default"));
app.use("/admin", express.static("uploads/admin"));
app.use("/customers", express.static("uploads/customers"));
app.use("/riders", express.static("uploads/riders"));

app.get("/", (req, res) => {
  res.send("<h1>App is running...</h1>");
});

// Router Not Found
app.use((req, res, next) => {
  res.json({
    message: "Router Not Found!",
  });
});

// Server Error
app.use((err, req, res, next) => {
  res.json({
    message: "Something broken!",
  });
});

export default app;
