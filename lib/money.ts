const ghsFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatGhs(pesewas: number): string {
  return ghsFormatter.format(pesewas / 100);
}
