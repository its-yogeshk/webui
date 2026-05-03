import { GetPlansResponse } from "@/models/plan";
import axiosInstance from "./axios";

export const getPlans = async (): Promise<GetPlansResponse> => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;
  
    const response = await axiosInstance.get<GetPlansResponse>(
      "/users/plans",
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      }
    );
  
    return response.data;
  };
  