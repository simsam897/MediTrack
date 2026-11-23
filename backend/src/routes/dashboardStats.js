import express from "express";
import {
  getDashboardStats,
  getMonthlyAnalytics,
  getYearlyAnalytics,
} from "../controllers/dashbordStats.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/analytics/monthly", getMonthlyAnalytics);
router.get("/analytics/yearly", getYearlyAnalytics);

export default router;
