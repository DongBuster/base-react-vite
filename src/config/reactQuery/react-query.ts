import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2,
      refetchOnWindowFocus: false,
      retry: false,
    },
    // mutations: {
    //   onMutate: async () => {
    //     await delay(1000);
    //   },
    // },
  },
});
export default queryClient;
export const defaultAgricultureQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 phút - dữ liệu vẫn được coi là fresh trong 5 phút
  gcTime: 10 * 60 * 1000, // 10 phút - giữ dữ liệu trong cache 10 phút sau khi không còn component nào sử dụng
  refetchOnWindowFocus: false, // Không refetch khi focus vào window
  refetchOnMount: false, // Không refetch khi component mount nếu dữ liệu vẫn fresh
  placeholderData: (previousData: any) => previousData, // Giữ dữ liệu cũ khi đang fetch dữ liệu mới
};
