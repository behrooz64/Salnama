// تبدیل دقیق تقویم در مرحله بعد متصل می‌شود
// خروجی فعلی برای اتصال موتور قمری آماده است
export function calculateLunarAge(solarAge){
  return Math.round(solarAge * 365.2422 / 354.367);
}
