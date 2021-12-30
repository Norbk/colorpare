import { rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv } from ".";
import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";

export const xyzToRgb = (xyz: XYZ): RGB => {
  const _x = xyz.x / 100;
  const _y = xyz.y / 100;
  const _z = xyz.z / 100;
  let _r = _x *  3.2406 + _y * -1.5372 + _z * -0.4986;
  let _g = _x * -0.9689 + _y *  1.8758 + _z *  0.0415;
  let _b = _x *  0.0557 + _y * -0.2040 + _z *  1.0570;
  
  _r = _r > 0.0031308 ? 1.055 * Math.pow(_r, 0.41666) - 0.055 : 12.92 * _r;
  _g = _g > 0.0031308 ? 1.055 * Math.pow(_g, 0.41666) - 0.055 : 12.92 * _g;
  _b = _b > 0.0031308 ?  1.055 * Math.pow(_b, 0.41666) - 0.055 : 12.92 * _b;
  _r = round(_r * 255);
  _g = round(_g * 255);
  _b = round(_b * 255);

  return {
    r: _r < 0 ? 0 : _r > 255 ? 255 : _r,
    g: _g < 0 ? 0 : _g > 255 ? 255 : _g,
    b: _b < 0 ? 0 : _b > 255 ? 255 : _b
  };
};

export const xyzToHex = (xyz: XYZ): string => rgbToHex(xyzToRgb(xyz));

export const xyzToHsl = (xyz: XYZ): HSL => rgbToHsl(xyzToRgb(xyz));

export const xyzToHsv = (xyz: XYZ): HSV => rgbToHsv(xyzToRgb(xyz));

export const xyzToCmyk = (xyz: XYZ): CMYK => rgbToCmyk(xyzToRgb(xyz));

export const xyzToCIELab = (xyz: XYZ, roundTo = 2, ref?: XYZ): CIELab => {
  const xyzR: XYZ = ref ? ref : { x: 95.047, y: 100.00, z: 108.883 };
  let _x = xyz.x / xyzR.x;
  let _y = xyz.y / xyzR.y;
  let _z = xyz.z / xyzR.z;

  _x = _x > 0.008856 ? Math.pow(_x, (1 / 3)) : (7.787 * _x) + (16 / 116);
  _y = _y > 0.008856 ? Math.pow(_y, (1 / 3)) : (7.787 * _y) + (16 / 116);
  _z = _z > 0.008856 ? Math.pow(_z, (1 / 3)) : (7.787 * _z) + (16 / 116);
  
  const lab: CIELab = {
    l: round((116 * _y) - 16, roundTo),
    a: round(500 * (_x - _y), roundTo),
    b: round(200 * (_y - _z), roundTo)
  };

  lab.a = lab.a > 128 ? 128 : lab.a;
  lab.a = lab.a < -128 ? -128 : lab.a;
  lab.b = lab.b > 128 ? 128 : lab.b;
  lab.b = lab.b < -128 ? -128 : lab.b;

  return lab;
};