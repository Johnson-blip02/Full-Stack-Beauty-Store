export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function moneyFormat(amount: number) {
  return "$" + amount.toFixed(2);
}
