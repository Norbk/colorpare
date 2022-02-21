import { rgbToCIELab, rgbToCss, rgbToHex, rgbToHsl, rgbToHsv, rgbToXyz } from ".";
import { CIELab, CMYK, HSL, HSV, Options, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";
import { InvalidColorError, isValidCmyk } from "../validators";

const validator = <T, V>(
  cmyk: CMYK, 
  converter: (color: V, options?: Options
) => T): (color: V, options?: Options) => T => {
  if(!isValidCmyk(cmyk))
    throw new InvalidColorError<CMYK>(cmyk, "CMYK");
  return converter;
};

const toRgb = (cmyk: CMYK): RGB => {
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

export const cmykToHex = (cmyk: CMYK): string => validator<string, RGB>(cmyk, rgbToHex)(toRgb(cmyk));

export const cmykToCss = (cmyk: CMYK, options?: Options): string => validator<string, RGB>(cmyk, rgbToCss)(toRgb(cmyk), options);

export const cmykToRgb = (cmyk: CMYK): RGB => validator<RGB, CMYK>(cmyk, toRgb)(cmyk);

export const cmykToHsl = (cmyk: CMYK, options?: Options): HSL => validator<HSL, RGB>(cmyk, rgbToHsl)(toRgb(cmyk), options);

export const cmykToHsv = (cmyk: CMYK, options?: Options): HSV => validator<HSV, RGB>(cmyk, rgbToHsv)(toRgb(cmyk), options);

export const cmykToXyz = (cmyk: CMYK, options?: Options): XYZ => validator<XYZ, RGB>(cmyk, rgbToXyz)(toRgb(cmyk), options);

export const cmykToCIELab = (cmyk: CMYK, options?: Options): CIELab => validator<CIELab, RGB>(cmyk, rgbToCIELab)(toRgb(cmyk), options);