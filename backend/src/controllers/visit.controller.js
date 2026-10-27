import { Visit } from "../models/visit.model.js";

export const createVisit = async (req, res, next) => {
  try {
    const {
      patient,
      visitDate,
      symptoms,
      diagnosis,
      doctorNotes,
      medicines = [],
    } = req.body;

    if (!patient || !Array.isArray(symptoms) || !diagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient, symptoms, and diagnosis are required",
      });
    }

    if (!Array.isArray(medicines)) {
      return res.status(400).json({
        success: false,
        message: "Medicines must be an array",
      });
    }

    for (const medicine of medicines) {
      if (
        !medicine.name ||
        !Number.isFinite(medicine.quantity) ||
        medicine.quantity < 1 ||
        !Number.isFinite(medicine.actualPrice) ||
        medicine.actualPrice < 0 ||
        !Number.isFinite(medicine.chargedPrice) ||
        medicine.chargedPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide valid medicine details",
        });
      }
    }

    const totalActualCost = medicines.reduce(
      (total, medicine) => total + medicine.quantity * medicine.actualPrice,
      0,
    );

    const totalCharged = medicines.reduce(
      (total, medicine) => total + medicine.quantity * medicine.chargedPrice,
      0,
    );

    const visit = await Visit.create({
      patient,
      visitDate,
      symptoms,
      diagnosis,
      doctorNotes,
      medicines,
      totalActualCost,
      totalCharged,
    });

    return res.status(201).json({
      success: true,
      message: "visit created successfully",
      data: visit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getVisits = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const visits = await Visit.find({ patient: patientId }).sort({
      visitDate: -1,
    });

    return res.status(200).json({
      success: true,
      message: "visits fetched successfully",
      visits,
      count: visits.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
