export function formatLargeNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "Tỷ";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "Triệu";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "Nghìn";
  return n.toString();
}
export function formatLargeNumberCard(n?: string | number | null): string {
  if (n === null || n === undefined) return "";

  // Nếu là string → trả nguyên văn
  if (typeof n === "string") {
    return n;
  }

  // Nếu không phải số hợp lệ → trả lại nguyên văn
  if (isNaN(n)) return "";

  // Nếu là double
  if (!Number.isInteger(n)) {
    return n.toString();
  }

  // Số nguyên → format theo locale VN
  return n.toLocaleString("en-US");
}
