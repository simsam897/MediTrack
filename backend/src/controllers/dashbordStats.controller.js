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
