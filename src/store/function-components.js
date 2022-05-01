export function unitTransformer(value, unit) {
  switch (unit) {
    case "kilogram":
      return value * 0.453592;
      break;
    case "meter":
      return value * 0.01;
      break;
    case "foot":
      return value * 0.0328084;
      break;
    case "inch":
      return value * 0.393701;
      break;
    case "celcius":
      return (value - 32) * (5 / 9);
      break;
    default:
      return value;
  }
}
