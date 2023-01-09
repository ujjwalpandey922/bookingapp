import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import authroute from "./routes/auth.js"; //for files use .js
import usersroute from "./routes/users.js";
import hotelsroute from "./routes/hotels.js";
import roomsroute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
const app = express();
env.config();
//connect mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("DB Connected");
    console.log("====================================");
  } catch (error) {
    throw error;
  }
};
// for starting any app || should not use it here as many lines of code , hence use Routes folder
app.listen(5000, () => {
  connect();
  console.log("connected at 5000");
  console.log("====================================");
});
//middleware
//bu default we cannot request a json form front end hence this....
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//app.use("path",middleware file); //api==common endpoint***can use anything
app.use("/api/auth", authroute);
app.use("/api/hotels", hotelsroute);
app.use("/api/rooms", roomsroute);
app.use("/api/users", usersroute);

// handle error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went XXXXXX";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//make any resq or response
app.get("/luffy", (req, res) => {
  res.send("YoooooooooooHOHOHO");
});

//uploading code

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
