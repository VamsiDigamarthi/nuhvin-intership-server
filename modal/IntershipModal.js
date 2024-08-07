import mongoose from "mongoose";
const { Schema } = mongoose;

const IntershipSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    subCourseName: {
      type: String,
      required: true,
    },
    courseMode: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      //   required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    studentCollegeCourse: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    passedYear: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      //   required: true,
    },
    address2: {
      type: String,
      //   required: true,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

const IntershipModel = mongoose.model("Intership", IntershipSchema);
export default IntershipModel;
