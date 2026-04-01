import { localStorageKeys } from "@constants/storageKey";
import { decryptDES, encryptDES } from "./DES.encryt";
import { lcStorage } from "./storage";

const tokenManager = () => {
  let accessToken: string | undefined = lcStorage.get(
    localStorageKeys.accessToken
  );
  let refreshToken: string | undefined = lcStorage.get(
    localStorageKeys.refreshToken
  );

  const isDev = import.meta.env.MODE === "development";

  const getAccessToken = (): string | undefined => {
    if (!accessToken) return undefined;
    try {
      return isDev ? accessToken : decryptDES(accessToken);
    } catch {
      return undefined;
    }
  };

  const setAccessToken = (token: string): void => {
    accessToken = isDev ? token : encryptDES(token);
    lcStorage.set(localStorageKeys.accessToken, accessToken);
  };

  const removeAccessToken = (): void => {
    accessToken = undefined;
    localStorage.removeItem(localStorageKeys.accessToken);
  };

  const getRefreshToken = (): string | undefined => {
    if (!refreshToken) return undefined;
    return isDev ? refreshToken : decryptDES(refreshToken);
  };

  const setRefreshToken = (token: string): void => {
    refreshToken = isDev ? token : encryptDES(token);
    lcStorage.set(localStorageKeys.refreshToken, refreshToken);
  };

  const removeRefreshToken = (): void => {
    refreshToken = undefined;
    localStorage.removeItem(localStorageKeys.refreshToken);
  };

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
  };
};

export default tokenManager();
