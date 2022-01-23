import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { rgbToCmyk, rgbToHsl, rgbToHsv, rgbToXyz, xyzToCIELab } from ".";
import { cssValues } from "../utils";

export const hexToRgb = (hex: string): RGB => {
  return {
    r: parseInt(hex.substring(0,2), 16),
    g: parseInt(hex.substring(2,4), 16),
    b: parseInt(hex.substring(4,6), 16)
  };
};

export const hexToCss = (hex: string, rgbOnly = false): string => {
  if(!rgbOnly) {
    const colorName = Object.keys(cssValues).find(key => cssValues[key] === hex);
    if(colorName)
      return colorName;
  }
  const rgb = hexToRgb(hex);
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

export const hexToHsl = (hex: string, roundTo = 0): HSL => rgbToHsl(hexToRgb(hex), roundTo);

export const hexToHsv = (hex: string, roundTo = 0): HSV => rgbToHsv(hexToRgb(hex), roundTo);

export const hexToCmyk = (hex: string): CMYK => rgbToCmyk(hexToRgb(hex));

export const hexToXYZ = (hex: string, roundTo = 2): XYZ => rgbToXyz(hexToRgb(hex), roundTo);

export const hexToCIELab = (hex: string, roundTo = 2): CIELab => xyzToCIELab(hexToXYZ(hex, roundTo), roundTo);