import { Color, HSL } from "../colorTypes";
import { fromHsl } from "../creators";

export const complementary = (color: HSL): HSL => {
  const { h, s, l } = color;
  if (h >= 180) {
    return {h: h - 180, s, l};
  } else {
    return {h: h + 180, s, l};
  }
}

export const triadic = (color: HSL): Array<HSL> => {
  const { h, s, l } = color;
  return [
    {h: h + 120 > 360 ? (h + 120) - 360 : h + 120, s, l},
    {h: h - 120 < 0 ? 360 - (120 - h) : h - 120, s, l}
  ];
}

export const tetradic = (color: HSL): Array<HSL> => {
  const { h, s, l } = color;
  return [
    {h: h + 90 > 360 ? (h + 90) - 360 : h + 90, s, l},
    complementary(color),
    {h: h - 90 < 0 ? 360 - (90 - h) : h - 90, s, l}
  ];
}