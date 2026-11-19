import express from "express";
import {
  createVisit,
  deleteVisit,
  getSingleVisit,
  getVisits,
  updateVisit,
} from "../controllers/visit.controller.js";

const router = express.Router();

router.post("/create", createVisit);
router.get("/get-visits/:patientId", getVisits);
router.get("/:visitId", getSingleVisit);
router.patch("/:visitId/update", updateVisit);
router.delete("/:visitId/delete", deleteVisit);

export default router;
