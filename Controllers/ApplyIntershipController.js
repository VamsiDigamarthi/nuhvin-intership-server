import OtpModel from "../modal/OtpModal.js";
import IntershipModel from "../modal/IntershipModal.js";
import axios from "axios";
export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  // console.log(mobile);
  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    const otpExist = await OtpModel.findOne({ mobile: mobile });
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpApiUrl = `https://2factor.in/API/V1/${process.env.OTP_API_KEY}/SMS/+91${mobile}/${otp}/OTP TEMPLATE`;
    try {
      // Send OTP using Axios GET request
      await axios.get(otpApiUrl);

      if (otpExist) {
        // Update the existing OTP document
        otpExist.otp = otp;
        await otpExist.save();
      } else {
        // Create a new OTP document
        const newOtp = new OtpModel({ mobile, otp });
        await newOtp.save();
      }

      return res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({
        message: "Sending OTP failed due to an external server error",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error finding/updating OTP:", error);
    return res
      .status(500)
      .json({ message: "OTP send failed", error: error.message });
  }
};

// verifycation otp
export const onVerificationOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Please send mobile number..!" });
  }
  if (!otp) {
    return res.status(400).json({ message: "Please send otp ..!" });
  }

  try {
    const existingOtpEntry = await OtpModel.findOne({ mobile });
    if (!existingOtpEntry) {
      return res.status(401).json({ message: "User not found in database" });
    }

    if (existingOtpEntry.otp.toString() !== otp.toString()) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    return res.status(200).json({ message: "OTP Verified Success..!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during OTP verification",
      error: error.message,
    });
  }
};

export const onApplyIntership = async (req, res) => {
  const {
    courseName,
    subCourseName,
    courseMode,
    courseDuration,
    firstName,
    lastName,
    emailId,
    mobileNumber,
    collegeName,
    studentCollegeCourse,
    branch,
    passedYear,
    address1,
    address2,
    city,
    pinCode,
    state,
    country,
  } = req.body;
  try {
    const doc = {
      courseName,
      subCourseName,
      courseMode,
      courseDuration,
      firstName,
      lastName,
      emailId,
      mobileNumber,
      collegeName,
      studentCollegeCourse,
      branch,
      passedYear,
      address1,
      address2,
      city,
      pinCode,
      state,
      country,
    };

    const intership = new IntershipModel(doc);

    await intership.save();

    return res
      .status(200)
      .json({ message: "Intership application submitted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "apply intership failed...!",
      error: error.message,
    });
  }
};
