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
