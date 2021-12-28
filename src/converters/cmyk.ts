import { rgbToCIELab, rgbToHex, rgbToHsl, rgbToHsv, rgbToXyz } from ".";
import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";

export const cmykToRgb = (cmyk: CMYK): RGB => {
  const _c = (cmyk.c > 100 ? 100 : cmyk.c < 0 ? 0 : cmyk.c) / 100;
  const _m = (cmyk.m > 100 ? 100 : cmyk.m < 0 ? 0 : cmyk.m) / 100;
  const _y = (cmyk.y > 100 ? 100 : cmyk.m < 0 ? 0 : cmyk.y) / 100;
  const _k = (cmyk.k > 100 ? 100 : cmyk.k < 0 ? 0 : cmyk.k) / 100;
  return {
    r: round(255 * ((1 - _c) * (1 - _k))),
    g: round(255 * ((1 - _m) * (1 - _k))),
    b: round(255 * ((1 - _y) * (1 - _k)))
  };
};

export const cmykToHex = (cmyk: CMYK): string => rgbToHex(cmykToRgb(cmyk));

export const cmykToHsl = (cmyk: CMYK, roundTo = 2): HSL => rgbToHsl(cmykToRgb(cmyk), roundTo);

export const cmykToHsv = (cmyk: CMYK, roundTo = 2): HSV => rgbToHsv(cmykToRgb(cmyk), roundTo);

export const cmykToXyz = (cmyk: CMYK, roundTo = 2): XYZ => rgbToXyz(cmykToRgb(cmyk), roundTo);

export const cmykToCIELab = (cmyk: CMYK, roundTo = 2): CIELab => rgbToCIELab(cmykToRgb(cmyk), roundTo);