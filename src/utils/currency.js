export const formatCurrency = (
  value,
  currency = "IDR",
  locale = "id-ID"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};
