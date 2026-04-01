import { router } from "@config/app-routes";
import { getZoomRatio } from "@shared/utils/getZoomRatio";
import { useLayoutEffect } from "react";
import { RouterProvider } from "react-router-dom";

function App() {
  //Auto zoom to fit the screen - chỉ áp dụng trên desktop lớn (1400px-1920px)
  // Tablet và laptop nhỏ (< 1400px) không dùng zoom để font-size giữ nguyên
  useLayoutEffect(() => {
    const viewportWidth =
      window.innerWidth || window.document.documentElement.clientWidth;
    const isMobile = viewportWidth < 768;

    if (!isMobile) {
      // getZoomRatio tự handle: screen width + OS scale (devicePixelRatio) compensation
      const zoom = getZoomRatio();
      document.documentElement.style.setProperty("--zoom", zoom.toString());
    } else {
      document.documentElement.style.setProperty("--zoom", "1");
    }
  }, []);

  return (
    // <AppContextProvider>
    <RouterProvider router={router} />
    // </AppContextProvider>
  );
}

export default App;
