import { useMutation } from "@tanstack/react-query";
import { login } from "./login.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
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
