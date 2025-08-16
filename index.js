import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";

// dot env config
configDotenv();

// app creation using expressjs
const app =express();
app.use(cors());
app.use(express.json());


// connect to mongodb

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected."))
.catch((err)=>console.log("MongoDB Conn Error : ", err));


//  Mongoose Schema 
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});


