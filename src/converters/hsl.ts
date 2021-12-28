import { rgbToCIELab, rgbToCmyk, rgbToHex, rgbToXyz } from ".";
import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";

export const hslToRgb = (hsl: HSL): RGB => {
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

export const hslToHex = (hsl: HSL): string => rgbToHex(hslToRgb(hsl));

export const hslToHsv = (hsl: HSL, roundTo = 2): HSV => {
  const hsv: HSV = { h: hsl.h, s: 0, v: 0 };
  
  const _l = hsl.l / 100;
  const _s = hsl.s / 100;
  const _v = _l + _s * Math.min(_l, 1 - _l);

  hsv.v = round(_v * 100, roundTo);
  hsv.s = hsv.v == 0 ? 0 : round((2 * (1 - _l / _v)) * 100, roundTo);

  return hsv;
};

export const hslToCmyk = (hsl: HSL): CMYK => rgbToCmyk(hslToRgb(hsl));

export const hslToXyz = (hsl: HSL, roundTo = 2): XYZ => rgbToXyz(hslToRgb(hsl), roundTo);

export const hslToCIELab = (hsl: HSL, roundTo = 2): CIELab => rgbToCIELab(hslToRgb(hsl), roundTo);