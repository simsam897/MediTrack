import mongoose from "mongoose";

const patientSchema = mongoose.Schema({

patientId:{
type:String,
required:true,
unique:true,
trim:true,
},

name:{
  type:String,
  required:true,
  trim:true,
},
dateOfBirth:{
  type:Date,
  required:true,
},

gender:{
  type:String,
  enum:["Male", "Female" , "Other"],
  required:true,
},

phone:{
  type:String,
  required:true,
  trim:true,
},

email:{
  type:String,
  required:true,
  trim:true,
},

address:{
  type:String,
  required:true,
  trim:true,
},

bloodGroup:{
  type:String,
  enum:["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
     default: "Unknown",
},

emergencyContactPhone:{
  type:String,
  trim:true,
},



}, {timestamps:true});

export const Patient = mongoose.model("Patient", patientSchema);
