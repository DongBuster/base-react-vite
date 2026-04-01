import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

/**
 * Cấu hình i18n - khởi tạo trước khi render App
 * Import file này ở main.tsx: import '@config/i18n'
 *
 * Hiện tại chỉ dùng tiếng Việt (vi).
 * Để thêm Tiếng Anh sau: thêm ns + resources[en]
 */

// Namespace translations nội tuyến (không cần file JSON bên ngoài)
const resources = {
  vi: {
    common: {
      save: "Lưu",
      cancel: "Hủy",
      confirm: "Xác nhận",
      delete: "Xóa",
      edit: "Chỉnh sửa",
      add: "Thêm",
      search: "Tìm kiếm",
      reset: "Đặt lại",
      close: "Đóng",
      back: "Quay lại",
      next: "Tiếp theo",
      loading: "Đang tải...",
      noData: "Không có dữ liệu",
      success: "Thành công",
      error: "Lỗi",
      warning: "Cảnh báo",
      required: "Trường này là bắt buộc",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "vi", // Mặc định tiếng Việt
    fallbackLng: "vi",
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false, // React đã escape sẵn
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
