import express from "express";
import {
  onApplyIntership,
  onVerificationOtp,
  sendOtp,
} from "../Controllers/ApplyIntershipController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);

router.post("/verify-otp", onVerificationOtp);

router.post("/apply", onApplyIntership);
export default router;
