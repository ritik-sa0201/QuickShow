import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";
import connectDB from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";

const app = express();
const port = 3000;

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

app.get("/", function (req, res) {
  res.send("server is running fine");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(3000, () => {
  console.log(`server is running on port ${port}`);
});
