import axiosInstance from "./axios";
import { addonPlanResponse } from "@/models/addon.model";

export const getAddon = async (id: string): Promise<addonPlanResponse> => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;
  
    const response = await axiosInstance.get<addonPlanResponse>(
      "/addon-packs-category/public/"+ id,
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
  