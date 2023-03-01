export function castInt(value, fallbackValue) {
  value = parseInt(value);

  if (isNaN(value)) {
    return fallbackValue;
  }

  return value;
}
