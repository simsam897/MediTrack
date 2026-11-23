import { Patient } from "../models/patient.model.js";
import { Visit } from "../models/visit.model.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalVisits = await Visit.countDocuments();

    const result = await Visit.aggregate([
      {
        $group: {
          _id: null,
          totalActualCost: { $sum: "$totalActualCost" },
          totalCharged: { $sum: "$totalCharged" },
        },
      },
    ]);

    const totalActualCost = result[0]?.totalActualCost || 0;
    const totalCharged = result[0]?.totalCharged || 0;

    const totalProfit = totalCharged - totalActualCost;

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalPatients,
        totalVisits,
        totalActualCost,
        totalCharged,
        totalProfit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMonthlyAnalytics = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    const startDate = new Date(selectedYear, selectedMonth - 1, 1);

    const endDate = new Date(selectedYear, selectedMonth, 1);

    if (
      !Number.isInteger(selectedMonth) ||
      selectedMonth < 1 ||
      selectedMonth > 12 ||
      !Number.isInteger(selectedYear) ||
      selectedYear < 2000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid month and year",
      });
    }

    const visits = await Visit.find({
      visitDate: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .populate("patient", "name")
      .sort({ visitDate: 1 });

    return res.status(200).json({
      success: true,
      message: "monthly report fetched successfully",
      visits,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getYearlyAnalytics = async (req, res, next) => {
  try {
    const { year } = req.query;

    const selectedYear = Number(year);
    if (!Number.isInteger(selectedYear) || selectedYear < 2000) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid year",
      });
    }

    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear + 1, 0, 1);
    const monthlyBreakdown = await Visit.aggregate([
      {
        $match: {
          visitDate: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      {
        $group: {
          _id: { $month: "$visitDate" },
          totalVisits: { $sum: 1 },
          totalActualCost: { $sum: "$totalActualCost" },
          totalCharged: { $sum: "$totalCharged" },
        },
      },

      {
        $addFields: {
          totalProfit: {
            $subtract: ["$totalCharged", "$totalActualCost"],
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const visits = await Visit.find({
      visitDate: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .populate("patient", "name")
      .sort({ visitDate: 1 });
    const totalActualCost = visits.reduce((total, visit) => {
      return total + visit.totalActualCost;
    }, 0);

    const totalCharged = visits.reduce((total, visit) => {
      return total + visit.totalCharged;
    }, 0);
    const totalProfit = totalCharged - totalActualCost;

    const totalVisits = visits.length;
    return res.status(200).json({
      success: true,
      message: "Yearly report fetched successfully",
      data: {
        selectedYear,
        totalVisits,
        totalActualCost,
        totalCharged,
        totalProfit,
        visits,
        monthlyBreakdown,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
};
