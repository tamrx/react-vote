import numeral from "numeral";

// ----------------------------------------------------------------------

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}
