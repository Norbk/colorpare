import { rgbToCIELab, rgbToCmyk, rgbToCss, rgbToHex, rgbToXyz } from ".";
import { CIELab, CMYK, HSL, HSV, Options, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";
import { InvalidColorError, isValidHsv } from "../validators";

const validator = <T, V>(
  hsv: HSV, 
  converter: (color: V, options?: Options
) => T): (color: V, options?: Options) => T => {
  if(!isValidHsv(hsv))
    throw new InvalidColorError<HSV>(hsv, "HSV");
  return converter;
};

const toRgb = (hsv: HSV): RGB => {
  const _h = (hsv.h < 0 ? 0 : hsv.h > 360 ? 360 : hsv.h) / 60;
  const _s = (hsv.s < 0 ? 0 : hsv.s > 100 ? 100 : hsv.s) / 100;
  const _v = (hsv.v < 0 ? 0 : hsv.v > 100 ? 100 : hsv.v) / 100;
  const C = _v * _s;
  const X = C * (1 - Math.abs(_h % 2 - 1));
  const m = _v - C;
  let r = 0;
  let g = 0;
  let b = 0;
  if(_h >= 0 && _h < 1) {
    r = C;
    g = X;
  } else if(_h >= 1 && _h < 2) {
    r = X;
    g = C;
  } else if(_h >= 2 && _h < 3) {
    g = C;
    b = X;
  } else if(_h >= 3 && _h < 4) {
    g = X;
    b = C;
  } else if(_h >= 4 && _h < 5) {
    r = X;
    b = C;
  } else {
    r = C;
    b = X;
  }
  return {
    r: round((r + m) * 255.0),
    g: round((g + m) * 255.0),
    b: round((b + m) * 255.0)
  };
};

const toHsl = (hsv: HSV, options?: Options): HSL => {
  const roundTo = options?.roundTo || 2;
  const hsl: HSL = { h: hsv.h, s: 0, l: 0 };

  const _s = hsv.s / 100;
  const _v = hsv.v / 100;
  const _l = _v * (1 - _s / 2);
  
  hsl.l = round(_l * 100, roundTo);
  hsl.s = _l == 0 ? 0 : round(((_v - _l) / Math.min(_l, 1 - _l)) * 100, roundTo);

  return hsl;
};

export const hsvToHex = (hsv: HSV): string => validator<string, RGB>(hsv, rgbToHex)(toRgb(hsv));

export const hsvToCss = (hsv: HSV, options?: Options): string => validator<string, RGB>(hsv, rgbToCss)(toRgb(hsv), options);

export const hsvToRgb = (hsv: HSV): RGB => validator<RGB, HSV>(hsv, toRgb)(hsv);

export const hsvToHsl = (hsv: HSV, options?: Options): HSL => validator<HSL, HSV>(hsv, toHsl)(hsv, options);

export const hsvToCmyk = (hsv: HSV): CMYK => validator<CMYK, RGB>(hsv, rgbToCmyk)(toRgb(hsv));

export const hsvToXyz = (hsv: HSV, options?: Options): XYZ => validator<XYZ, RGB>(hsv, rgbToXyz)(toRgb(hsv), options);

export const hsvToCIELab = (hsv: HSV, options?: Options): CIELab => validator<CIELab, RGB>(hsv, rgbToCIELab)(toRgb(hsv), options);