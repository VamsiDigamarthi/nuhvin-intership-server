import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";

import "dotenv/config";

import StudentRoute from "./Routes/ApplyIntership.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const server = http.createServer(app);
// console.log(process.env.MONGO_DB);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() =>
    server.listen(process.env.PORT, () =>
      console.log(`App Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Nuhvin Leaning......!" });
});

app.use("/student", StudentRoute);
