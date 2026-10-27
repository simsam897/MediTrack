import express from "express";
import { createVisit, getVisits } from "../controllers/visit.controller.js";

const router = express.Router();

router.post("/create", createVisit);
router.get("/get-visits/:patientId", getVisits);

export default router;
