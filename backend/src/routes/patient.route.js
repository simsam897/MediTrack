import express from "express";
import {
  createPatient,
  getAllPatient,
  getPatientByPatientId,
  getPatientProfile,
  updatePatient,
} from "../controllers/patient.controller.js";
const router = express.Router();

router.post("/create", createPatient);
router.get("/get-patients", getAllPatient);
router.get("/:patientId", getPatientByPatientId);
router.get("/:patientId/profile", getPatientProfile);
router.put("/:patientId/update", updatePatient);

export default router;
