import { useMutation } from "@tanstack/react-query";
import notify from "../../../config/notification";
import { login } from "./login.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data.success) {
        notify.warning(data.message || "Đăng nhập thành công");
      }
      return data;
    },
  });
};
// export const useLogout = () => {
//   return useMutation(logout, {
//     onSuccess: (response) => {
//       // console.log('logout: ', response);
//     },
//   });
// };
// export const useForgotPassword = () => {
//   return useMutation(forgotPassword, {
//     onSuccess: (response) => {
//       console.log('forgotPassword: ', response);
//     },
//   });
// };
