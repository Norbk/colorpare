import { Color } from "../colorTypes";
import { fromHsl } from "../creators";

export const complementary = (color: Color): Color => {
  const { h, s, l } = color.hsl();
  if (h >= 180) {
    return fromHsl({h: h - 180, s, l});
  } else {
    return fromHsl({h: h + 180, s, l});
  }
}

export const triadic = (color: Color): Array<Color> => {
  const { h, s, l } = color.hsl();
  return [
    fromHsl({h: h + 120 > 360 ? (h + 120) - 360 : h + 120, s, l}),
    fromHsl({h: h - 120 < 0 ? 360 - (120 - h) : h - 120, s, l})
  ];
}

export const tetradic = (color: Color): Array<Color> => {
  const { h, s, l } = color.hsl();
  return [
    fromHsl({h: h + 90 > 360 ? (h + 90) - 360 : h + 90, s, l}),
    complementary(color),
    fromHsl({h: h - 90 < 0 ? 360 - (90 - h) : h - 90, s, l})
  ];
}