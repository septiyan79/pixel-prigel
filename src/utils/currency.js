export const formatCurrency = (
  value,
  currency = "IDR"
) => {
  // pilih locale berdasarkan currency
  let locale = "id-ID"; // default IDR
  if (currency === "USD") locale = "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};