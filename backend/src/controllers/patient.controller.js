import { Patient } from "../models/patient.model.js";
import { Visit } from "../models/visit.model.js";

export const createPatient = async (req, res, next) => {
  try {
    const {
      name,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      bloodGroup,
      emergencyContactName,
      emergencyContactPhone,
    } = req.body;

    if (!name || !dateOfBirth || !gender || !phone || !address) {
      return res.status(400).json({
        success: false,
        message:
          "Name, date of birth, gender, phone, and address are requireds",
      });
    }

    const dob = new Date(dateOfBirth);

    if (Number.isNaN(dob.getTime()) || dob > new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid date of birth",
      });
    }

    const patientId = `PT-${Date.now()}`;

    const patient = await Patient.create({
      patientId,
      name,
      dateOfBirth: dob,
      gender,
      phone,
      email,
      address,
      bloodGroup,
      emergencyContactName,
      emergencyContactPhone,
    });

    return res.status(201).json({
      success: true,
      message: "patient created successfully",
      data: patient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all patients
export const getAllPatient = async (req, res, next) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: {
        count: patients.length,
        patients,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPatientByPatientId = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "patient id not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient fetched successfully",
      data: {
        patient,
        name: patient.name,
        phone: patient.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPatientProfile = async (req, res, next) => {
  try {
    const { patientId } = req.params;
const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "patient not found",
      });
    }

    const visits = await Visit.find({ patient: patient._id }).sort({
      visitDate: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Pateint Profile fetched  succesfully ",
      data: {
        patient,
        visits,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
