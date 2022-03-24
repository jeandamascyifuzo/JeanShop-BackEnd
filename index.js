const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


const app = express();

dotenv.config();

mongoose
    .connect("mongodb+srv://"+ process.env.MONGO_URL)
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.log(err));

    app.use(cors());
    app.use(express.json());
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute);

app.listen(5000, ()=>{
    console.log("server is running");
})  