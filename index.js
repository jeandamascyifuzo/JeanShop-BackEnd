import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();

dotenv.config();

mongoose
    .connect("mongodb+srv://cyifuzo:Company1221@cluster0.awubt.mongodb.net/JeanShop?retryWrites=true&w=majority")
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.log(err));

app.listen(5000, ()=>{
    console.log("server is running");
})  