import type { IResponse } from "@shared/types/response";
import axiosClient from "../../../config/axios-instance";
import type { LoginRequest, LoginRespone } from "./login.model";

export const login = (
  payload: LoginRequest
): Promise<IResponse<LoginRespone>> => {
  return axiosClient.post("/GmetricAuth/login", payload);
};
