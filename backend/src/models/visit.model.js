import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: true,
      trime: true,
    },
    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    chargedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

export const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    visitDate: {
      type: Date,
      default: Date.now(),
    },

    symptoms: {
      type: [String],
      required: true,
    },

    diagonsis: {
      type: String,
      trim: true,
    },

    doctorNotes: {
      type: String,
      trim: true,
    },

    medicines: {
      type: [medicineSchema],
      default: [],
    },
    totalActualCost: {
      type: Number,
      required: true,
      min: 0,
    },

    totalCharged: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export const Visit = mongoose.model("Visit", visitSchema);
