import { CIELab, CMYK, HSL, HSV, Options, RGB, XYZ } from "../colorTypes";
import { rgbToCmyk, rgbToCss, rgbToHsl, rgbToHsv, rgbToXyz, xyzToCIELab } from ".";

import { InvalidColorError, isValidHex } from "../validators";

const validator = <T, V>(
  hex: string, 
  converter: (color: V, options?: Options
) => T): (color: V, options?: Options) => T => {
  if(!isValidHex(hex))
    throw new InvalidColorError<string>(hex, "HEX");
  return converter;
};

const toRgb = (hex: string): RGB => {
  return {
    r: parseInt(hex.substring(0,2), 16),
    g: parseInt(hex.substring(2,4), 16),
    b: parseInt(hex.substring(4,6), 16)
  };
};

export const hexToRgb = (hex: string): RGB => validator<RGB, string>(hex, toRgb)(hex);

export const hexToCss = (hex: string, options?: Options): string => validator<string, RGB>(hex, rgbToCss)(toRgb(hex), options);

export const hexToHsl = (hex: string, options?: Options): HSL => validator<HSL, RGB>(hex, rgbToHsl)(toRgb(hex), options);

export const hexToHsv = (hex: string, options?: Options): HSV => validator<HSV, RGB>(hex, rgbToHsv)(toRgb(hex), options);

export const hexToCmyk = (hex: string): CMYK => validator<CMYK, RGB>(hex, rgbToCmyk)(toRgb(hex));

export const hexToXyz = (hex: string, options?: Options): XYZ => validator<XYZ, RGB>(hex, rgbToXyz)(toRgb(hex), options);

export const hexToCIELab = (hex: string, options?: Options): CIELab => validator<CIELab, XYZ>(hex, xyzToCIELab)(hexToXyz(hex, options), options);