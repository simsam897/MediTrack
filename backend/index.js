import express from "express";

import dotenv from "dotenv";
import patientRouter from "./src/routes/patient.route.js";
import visitRouter from "./src/routes/visit.route.js";
const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/patient", patientRouter);
app.use("/api/visits", visitRouter);
export default app;
