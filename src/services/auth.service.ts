import {
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/models/auth.model";
import axiosInstance from "./axios";

export const sendOtpForLoginAndRegister = async (
  payload: SendOtpPayload
): Promise<SendOtpResponse> => {
  const response = await axiosInstance.post<SendOtpResponse>(
    "/users/send-otp",
    payload
  );
  return response.data;
};

// VERIFY OTP
export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  const response = await axiosInstance.put<VerifyOtpResponse>(
    "/users/verify-otp",
    payload
  );

  return response.data;
};
