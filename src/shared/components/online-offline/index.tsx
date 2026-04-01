import { DisconnectOutlined, WifiOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useEffect, useRef, useState } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export function OnlineNotification({ online }: { online: boolean }) {
  useEffect(() => {
    if (online) {
      notification.success({
        message: "Đã kết nối mạng",
        description: "Kết nối internet đã được khôi phục.",
        placement: "bottomRight",
        duration: 3,
        icon: <WifiOutlined style={{ color: "var(--success)" }} />,
      });
    }
  }, [online]);

  return null;
}

export function OfflineNotification() {
  useEffect(() => {
    notification.error({
      message: "Mất kết nối mạng",
      description: "Bạn đang offline. Vui lòng kiểm tra kết nối internet.",
      placement: "bottomRight",
      duration: 0,
      key: "offline-notification",
      icon: <DisconnectOutlined style={{ color: "var(--error)" }} />,
    });

    return () => {
      notification.destroy("offline-notification");
    };
  }, []);

  return null;
}

export function NetworkDetector() {
  const isOnline = useOnlineStatus();
  const previousOnlineRef = useRef(isOnline);

  useEffect(() => {
    if (previousOnlineRef.current === isOnline) {
      return;
    }

    previousOnlineRef.current = isOnline;

    if (isOnline) {
      notification.destroy("offline-notification");
      notification.success({
        message: "Đã kết nối mạng",
        description: "Kết nối internet đã được khôi phục.",
        placement: "bottomRight",
        duration: 3,
        icon: <WifiOutlined style={{ color: "var(--success)" }} />,
      });
      return;
    }

    notification.error({
      message: "Mất kết nối mạng",
      description: "Bạn đang offline. Vui lòng kiểm tra kết nối internet.",
      placement: "bottomRight",
      duration: 0,
      key: "offline-notification",
      icon: <DisconnectOutlined style={{ color: "var(--error)" }} />,
    });
  }, [isOnline]);

  return null;
}

export default NetworkDetector;
