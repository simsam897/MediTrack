import express from "express";

import dotenv from "dotenv";
import patientRouter from "./src/routes/patient.route.js";
const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/patient/", patientRouter);
export default app;
