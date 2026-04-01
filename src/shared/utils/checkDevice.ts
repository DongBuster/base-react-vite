export const isSmallDevice = (): boolean => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Tablet thường có chiều ngang >= 768px
  // Nếu xoay ngang, width > height ⇒ là tablet landscape
  return width < 768 || (width < 1024 && width < height);
};
