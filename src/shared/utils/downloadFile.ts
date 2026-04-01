// Hàm này dùng để kích hoạt trình duyệt download file từ Blob
export const triggerBrowserDownload = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // Clean up
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Hàm này dùng để lấy tên file từ header content-disposition
// Xử lý tốt cả trường hợp UTF-8 (Tiếng Việt) và ASCII thường
export const getFileNameFromHeader = (
  disposition: string | undefined,
  defaultName: string = "download.xlsx"
): string => {
  if (!disposition) return defaultName;

  // Ưu tiên check filename*=UTF-8'' trước (chuẩn mới hỗ trợ tiếng Việt)
  const matchUTF8 = disposition.match(/filename\*=UTF-8''(.+)/i);
  if (matchUTF8 && matchUTF8[1]) {
    return decodeURIComponent(matchUTF8[1]);
  }

  // Fallback sang filename="name" (chuẩn cũ)
  const match = disposition.match(/filename="?([^"]+)"?/i);
  if (match && match[1]) {
    return match[1];
  }

  return defaultName;
};
