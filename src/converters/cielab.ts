import { xyzToCmyk, xyzToCss, xyzToHex, xyzToHsl, xyzToHsv, xyzToRgb } from ".";
import { CIELab, CMYK, HSL, HSV, Options, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";
import { InvalidColorError, isValidLab } from "../validators";

const validator = <T, V>(
  lab: CIELab, 
  converter: (color: V, options?: Options
) => T): (color: V, options?: Options) => T => {
  if(!isValidLab(lab))
    throw new InvalidColorError<CIELab>(lab, "CIELab");
  return converter;
};

const toXyz = (lab: CIELab, options?: Options): XYZ => {
  const roundTo = options?.roundTo || 2;
  const xyzR = options?.xyzRef || { x: 95.047, y: 100.00, z: 108.883 };
  let _y = ( lab.l + 16 ) / 116;
  let _x = lab.a / 500 + _y;
  let _z = _y - lab.b / 200;

  if(Math.pow(_y, 3) > 0.008856) {
    _y = Math.pow(_y, 3);
  } else {
    _y = (_y - 16 / 116) / 7.787;
  }
  if(Math.pow(_x, 3) > 0.008856) {
    _x = Math.pow(_x, 3);
  } else {
    _x = (_x - 16 / 116) / 7.787;
  }
  if(Math.pow(_z, 3) > 0.008856) {
    _z = Math.pow(_z, 3);
  } else {
    _z = (_z - 16 / 116) / 7.787;
  }
  return {
    x: round(_x * xyzR.x, roundTo),
    y: round(_y * xyzR.y, roundTo),
    z: round(_z * xyzR.z, roundTo)
  };
};

export const labToHex = (lab: CIELab): string => validator<string, XYZ>(lab, xyzToHex)(toXyz(lab));

export const labToCss = (lab: CIELab, options?: Options): string => validator<string, XYZ>(lab, xyzToCss)(toXyz(lab), options);

export const labToRgb = (lab: CIELab): RGB => validator<RGB, XYZ>(lab, xyzToRgb)(toXyz(lab));

export const labToHsl = (lab: CIELab, options?: Options): HSL => validator<HSL, XYZ>(lab, xyzToHsl)(toXyz(lab), options);

export const labToHsv = (lab: CIELab, options?: Options): HSV => validator<HSV, XYZ>(lab, xyzToHsv)(toXyz(lab), options);

export const labToCmyk = (lab: CIELab): CMYK => validator<CMYK, XYZ>(lab, xyzToCmyk)(toXyz(lab));

export const labToXyz = (lab: CIELab, options?: Options): XYZ => validator<XYZ, CIELab>(lab, toXyz)(lab, options);