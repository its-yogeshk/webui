// SEND OTP
export interface SendOtpPayload {
    countryCode: string;
    mobileNumber: string;
  }
  
  export interface SendOtpResponse {
    status: number;
    message: string;
    data?: {
      id: string; // 👈 IMPORTANT (needed for verify)
    };
  }
  
  // VERIFY OTP
  export interface VerifyOtpPayload {
    id: string;
    otp: string;
  }
  
  export interface VerifyOtpResponse {
    status: number;
    message: string;
    data: {
      accessToken: string;
      id: string
    };
  }
  