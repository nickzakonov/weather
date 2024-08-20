export function isDateValid(dateStr: string) {
  const pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

  return pattern.test(dateStr);
}
