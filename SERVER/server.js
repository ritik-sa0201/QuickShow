import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";
import connectDB from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/Bookingroutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 3000;

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.send("server is running fine");
});

app.get("/test", function (req, res) {
  res.render("index");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/show", showRouter);

app.use("/api/booking", bookingRouter);

app.use("/api/admin", adminRouter);

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log(`server is running on port ${port}`);
});
