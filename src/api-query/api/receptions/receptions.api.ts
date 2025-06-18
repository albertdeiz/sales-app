import { isAxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ApiError } from "@/lib/errors";

import type { Reception } from "@/interfaces/reception.interfaces";

export interface ReceptionProduct {
  productId: number,
  quantity: number,
  productUmId: number,
  cost: number,
  batch: string,
  elaboratedAt?: Date,
  expiredAt: Date,
  // TODO: preguntar si es necesario
  receivedQuantity: 10,
  receivedProductUmId: 1
}

export interface CreateReceptionPayload {
  userId: number;
  vendorId: number;
  warehouseId: number;
  receptionProducts: ReceptionProduct[];
}

interface CreateReceptionParams {
  payload: CreateReceptionPayload;
  accessToken?: string;
}

export const createReception = async ({
  payload,
  accessToken,
}: CreateReceptionParams): Promise<Reception> => {
  try {
    const { data } = await axios.post("/v1/sales/receptions/", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, "An unexpected error occurred");
  }
};
