import { rgbToCIELab, rgbToCmyk, rgbToCss, rgbToHex, rgbToXyz } from ".";
import { CIELab, CMYK, HSL, HSV, Options, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";
import { InvalidColorError, isValidHsl } from "../validators";

const validator = <T, V>(
  hsl: HSL, 
  converter: (color: V, options?: Options
) => T): (color: V, options?: Options) => T => {
  if(!isValidHsl(hsl))
    throw new InvalidColorError<HSL>(hsl, "HSL");
  return converter;
};

const toRgb = (hsl: HSL): RGB => {
  const _h = (hsl.h < 0 ? 0 : hsl.h > 360 ? 360 : hsl.h) / 60;
  const _s = (hsl.s < 0 ? 0 : hsl.s > 100 ? 100 : hsl.s) / 100;
  const _l = (hsl.l < 0 ? 0 : hsl.l > 100 ? 100 : hsl.l) / 100;
  const C = (1 - Math.abs(2 * _l - 1)) * _s;
  const X = C * (1 - Math.abs(_h % 2 - 1));
  const m = _l - C / 2;
  let _r = 0;
  let _g = 0;
  let _b = 0;
  if(_h >= 0 && _h < 1) {
    _r = C;
    _g = X;
  } else if(_h >= 1 && _h < 2) {
    _r = X;
    _g = C;
  } else if(_h >= 2 && _h < 3) {
    _g = C;
    _b = X;
  } else if(_h >= 3 && _h < 4) {
    _g = X;
    _b = C;
  } else if(_h >= 4 && _h < 5) {
    _r = X;
    _b = C;
  } else {
    _r = C;
    _b = X;
  }
  return {
    r: round((_r + m) * 255.0),
    g: round((_g + m) * 255.0),
    b: round((_b + m) * 255.0)
  };
};

const toHsv = (hsl: HSL, options?: Options): HSV => {
  const roundTo = options?.roundTo || 2;
  const hsv: HSV = { h: hsl.h, s: 0, v: 0 };
  
  const _l = hsl.l / 100;
  const _s = hsl.s / 100;
  const _v = _l + _s * Math.min(_l, 1 - _l);

  hsv.v = round(_v * 100, roundTo);
  hsv.s = hsv.v == 0 ? 0 : round((2 * (1 - _l / _v)) * 100, roundTo);

  return hsv;
};

export const hslToHex = (hsl: HSL): string => validator<string, RGB>(hsl, rgbToHex)(toRgb(hsl));

export const hslToCss = (hsl: HSL, options?: Options): string => validator<string, RGB>(hsl, rgbToCss)(toRgb(hsl), options);

export const hslToRgb = (hsl: HSL): RGB => validator<RGB, HSL>(hsl, toRgb)(hsl);

export const hslToHsv = (hsl: HSL, options?: Options): HSV => validator<HSV, HSL>(hsl, toHsv)(hsl, options);

export const hslToCmyk = (hsl: HSL): CMYK => validator<CMYK, RGB>(hsl, rgbToCmyk)(toRgb(hsl));

export const hslToXyz = (hsl: HSL, options?: Options): XYZ => validator<XYZ, RGB>(hsl, rgbToXyz)(toRgb(hsl), options);

export const hslToCIELab =(hsl: HSL, options?: Options): CIELab => validator<CIELab, RGB>(hsl, rgbToCIELab)(toRgb(hsl), options);