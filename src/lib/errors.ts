/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosError } from "axios";

export class ApiError extends Error {
  public status: number;
  public message: string;
  public details?: any;

  constructor(
    status: number,
    message: string,
    details?: any,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.message = message;
    this.details = details;
  }

  static fromAxiosError(error: AxiosError): ApiError {
    return new ApiError(
      error.response?.status || 500,
      error.message || "An error occurred",
      error.response?.data,
    );
  }
};
