export function fillDecimalPlaces(value: number, decimalPlaces: number): string {
  const strValue = value.toFixed(decimalPlaces);
  const parts = strValue.split('.');
  if (parts.length === 1) return `${strValue}.00`;

  const remain = parts[1] ?? '';
  if (remain.length < decimalPlaces) {
    return `${strValue}${'0'.repeat(decimalPlaces - remain.length)}`;
  }
  return strValue;
}

export function roundedValue(value: number, decimalPlaces: number = 0): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export function getCommaNumber(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
