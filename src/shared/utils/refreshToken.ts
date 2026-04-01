import axios from "axios";

import type { IOriginRequest } from "@config/axios-instance";
import axiosClient from "@config/axios-instance";
import { LOGIN_PATH } from "@shared/constants/path";
import tokenManager from "./tokenManager";
interface IFailedQueue {
  resolve: Promise<any>;
  reject: Promise<any>;
}

// for multiple requests
let isRefreshing = false;
let failedQueue: IFailedQueue[] = [];

const processQueue = (error: Error | null, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const handleRefreshToken = async (originalRequest: IOriginRequest) => {
  if (isRefreshing) {
    return new Promise(function (resolve: any, reject: any) {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = "Bearer " + token;
        }
        return axiosClient(originalRequest);
      })
      .catch((err) => err);
  }

  originalRequest._retry = true;
  isRefreshing = true;

  return new Promise(function (resolve, reject) {
    const refreshToken = tokenManager.getRefreshToken();

    if (refreshToken) {
      axios
        .post(
          `${import.meta.env.REACT_APP_SERVER_URL}/v1/auth/user/refresh_token`,
          JSON.stringify({ refreshToken }),
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        .then(({ data }) => {
          //Trường hợp refresh token hết hạn đẩy về trang đăng nhập
          if (!data?.data) {
            tokenManager.removeAccessToken();
            tokenManager.removeRefreshToken();
            window.location.href = LOGIN_PATH;
            return;
          }

          tokenManager.setAccessToken(data.data.accessToken);
          tokenManager.setRefreshToken(data.data.refreshToken);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] =
              "Bearer " + data.data.accessToken;
          }

          processQueue(null, data.data.accessToken);
          resolve(axiosClient(originalRequest));
        })
        .then(() => {
          isRefreshing = false;
        })
        .catch((err) => {
          console.log("refresh token err: ", err);
          tokenManager.removeAccessToken();
          tokenManager.removeRefreshToken();
          window.location.href = LOGIN_PATH;
          processQueue(err, null);
          reject(err);
        });
    }
  });
};
