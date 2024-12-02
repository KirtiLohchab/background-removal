import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";

// app config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// app intialize middleware
app.use(express.json());
app.use(cors());

// app routes
app.get("/", (req, res) => res.send("API WORKING"));
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));