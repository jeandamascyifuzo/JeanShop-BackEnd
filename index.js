const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")


const app = express();

dotenv.config();

mongoose
    .connect("mongodb+srv://"+ process.env.MONGO_URL)
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.log(err));

app.use(express.json());
app.use("/api/v1/user", userRoute)
app.use("/api/v1/auth", authRoute) 

app.listen(5000, ()=>{
    console.log("server is running");
})  