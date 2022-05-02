export function unitTransformer(value, unit) {
  switch (unit) {
    case "kilogram":
      return value / 2.205;
      break;
    case "meter":
      return value / 100;
      break;
    case "foot":
      return {
        foot: (value / 30.48).toFixed(0),
        inch: Math.round((value % 30.48) / 2.54),
      };
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
