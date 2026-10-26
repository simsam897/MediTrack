import express from "express";
import {
  createPatient,
  getAllPatient,
} from "../controllers/patient.controller.js";
const router = express.Router();

router.post("/create", createPatient);
router.get("/get-patients", getAllPatient);

export default router;
