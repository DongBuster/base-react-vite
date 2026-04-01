import { useEffect, useState } from "react";

export function useOrientationWarning() {
  const [showWarning, setShowWarning] = useState(false);

  const checkOrientation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTablet = width <= 1024 && width >= 600; // tuỳ bạn chỉnh theo breakpoint
    const isPortrait = height > width;
    setShowWarning(isTablet && isPortrait);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return showWarning;
}
