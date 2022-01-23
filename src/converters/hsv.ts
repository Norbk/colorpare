import { hexToCss, rgbToCIELab, rgbToCmyk, rgbToHex, rgbToXyz } from ".";
import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";

export const hsvToRgb = (hsv: HSV): RGB => {
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

export const hsvToHex = (hsv: HSV): string => rgbToHex(hsvToRgb(hsv));

export const hsvToCss = (hsv: HSV, rgbOnly?: boolean): string => hexToCss(hsvToHex(hsv), rgbOnly);

export const hsvToHsl = (hsv: HSV, roundTo = 2): HSL => {
  const hsl: HSL = { h: hsv.h, s: 0, l: 0 };

  const _s = hsv.s / 100;
  const _v = hsv.v / 100;
  const _l = _v * (1 - _s / 2);
  
  hsl.l = round(_l * 100, roundTo);
  hsl.s = _l == 0 ? 0 : round(((_v - _l) / Math.min(_l, 1 - _l)) * 100, roundTo);

  return hsl;
};

export const hsvToCmyk = (hsv: HSV): CMYK => rgbToCmyk(hsvToRgb(hsv));

export const hsvToXyz = (hsv: HSV, roundTo = 2): XYZ => rgbToXyz(hsvToRgb(hsv), roundTo);

export const hsvToCIELab = (hsv: HSV, roundTo = 2) : CIELab => rgbToCIELab(hsvToRgb(hsv), roundTo);