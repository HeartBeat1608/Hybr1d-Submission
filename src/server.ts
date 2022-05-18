import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import apiRouter from "./api";
import { ErrorHandler, NotFoundHandler } from "./middlewares";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load Environment configuration
dotenv.config();

const app = express();

/* 
=====================================================================
                Middlewares And Plugins
=====================================================================
*/

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v1", apiRouter);
app.use(NotFoundHandler);
app.use(ErrorHandler);

/*
=====================================================================
                Connect Database
=====================================================================
*/

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("[SRV]", "failed to connect to database");
  process.exit(1);
}
mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.error("[SRV]", err.message);
    process.exit(1);
  }

  console.log("[SRV]", "Database connected");
});

/*
=====================================================================
                Configure and Export
=====================================================================
*/

app.set("PORT", process.env.PORT || "5000");
app.set("NAME", process.env.NAME || "ZeroBalance");

export default app;
