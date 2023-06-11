export const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  useGrouping: true,
});

export const ratingFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});
