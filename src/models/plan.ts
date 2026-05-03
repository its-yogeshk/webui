// models/plan.model.ts

export interface Plan {
    _id: string;
    title: string;
    userType: string;
    price: number;
    discount: number;
    month: number;
    isPopular: boolean;
    descriptions: string[];
    isCurrentPlan: boolean;
    discountedPrice: number;
    monthlyDiscountedPrice: number;
  }
  
  export interface GetPlansResponse {
    status: number;
    data: Plan[];
  }
  