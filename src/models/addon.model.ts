export interface AddonPack {
    id: string;
    title: string;
    description: string;
    image?: {
      imageUrl?: string;
      imageId?: string;
      filePath?: string;
    };
    packType: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface addonPlanResponse {
    status: number;
    data: {
        category: AddonPack;
    }
}