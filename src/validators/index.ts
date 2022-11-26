import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";

export class InvalidColorError<T> extends Error {
  constructor(color: T, colorType: string) {
    super(`${JSON.stringify(color)} is not a valid ${colorType} color value`);
  }
}

export const isValidHex = (hex: string): boolean => (new RegExp("#?[0-9A-Fa-f]{6}", "g").test(hex));

export const isValidCssRgb = (css: string): boolean => (new RegExp("rgb\\([0-9]{1,3}, ?[0-9]{1,3}, ?[0-9]{1,3}\\)", "g").test(css));

export const isValidRgb = (rgb: RGB): boolean =>
  ((rgb.r <= 255 && rgb.r >= 0) && (rgb.g <= 255 && rgb.g >= 0) && (rgb.b <= 255 && rgb.b >= 0));

export const isValidHsl = (hsl: HSL): boolean =>
  ((hsl.h <= 360 && hsl.h >= 0) && (hsl.s <= 100 && hsl.s >= 0) && (hsl.l <= 100 && hsl.l >= 0));

export const isValidHsv = (hsv: HSV): boolean =>
  ((hsv.h <= 360 && hsv.h >= 0) && (hsv.s <= 100 && hsv.s >= 0) && (hsv.v <= 100 && hsv.v >= 0));

export const isValidCmyk = (cmyk: CMYK): boolean => (
  (cmyk.c <= 100 && cmyk.c >= 0) &&
  (cmyk.m <= 100 && cmyk.m >= 0) &&
  (cmyk.y <= 100 && cmyk.y >= 0) &&
  (cmyk.k <= 100 && cmyk.k >= 0)
);

export const isValidXyz = (xyz: XYZ): boolean => (
  (xyz.x >= 0 && xyz.x <= 95.05) &&
  (xyz.y >= 0 && xyz.y <= 100) &&
  (xyz.z >= 0 && xyz.z <= 108.9)
);

export const isValidLab = (lab: CIELab): boolean => (
  (lab.l >= 0 && lab.l <= 100) &&
  (lab.a >= -128 && lab.a <= 128) &&
  (lab.b >= -128 && lab.b <= 128)
);