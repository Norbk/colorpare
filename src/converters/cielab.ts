import { xyzToCmyk, xyzToHex, xyzToHsl, xyzToHsv, xyzToRgb } from ".";
import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";

export const labToXyz = (lab: CIELab, roundTo = 2, ref?: XYZ): XYZ => {
  const xyzR = ref ? ref : { x: 95.047, y: 100.00, z: 108.883 };
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
}

export const labToHex = (lab: CIELab): string => xyzToHex(labToXyz(lab));

export const labToRgb = (lab: CIELab): RGB => xyzToRgb(labToXyz(lab));

export const labToHsl = (lab: CIELab): HSL => xyzToHsl(labToXyz(lab));

export const labToHsv = (lab: CIELab): HSV => xyzToHsv(labToXyz(lab));

export const labToCmyk = (lab: CIELab): CMYK => xyzToCmyk(labToXyz(lab));