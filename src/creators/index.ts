import {
  hexToCss, hexToCIELab, hexToCmyk, hexToRgb, hexToXyz, hexToHsl, hexToHsv,
  rgbToCss, rgbToCIELab, rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv, rgbToXyz,
  hslToCss, hslToHex, hslToRgb, hslToHsv, hslToCmyk, hslToXyz, hslToCIELab,
  hsvToCss, hsvToHex, hsvToRgb, hsvToHsl, hsvToCmyk, hsvToXyz, hsvToCIELab,
  cmykToCss, cmykToHex, cmykToRgb, cmykToHsl, cmykToHsv, cmykToXyz, cmykToCIELab,
  xyzToCss, xyzToHex, xyzToRgb, xyzToHsl, xyzToHsv, xyzToCmyk, xyzToCIELab,
  labToCss, labToXyz, labToCmyk, labToHsv, labToRgb, labToHex, labToHsl
} from "../converters";

import { Color, CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";

import { cie76, cie94, cie2000 } from "../calculators";

import { cssValues } from "../utils";

import { InvalidColorError, isValidCmyk, isValidCssRgb, isValidHex, isValidHsl, isValidHsv, isValidLab, isValidRgb, isValidXyz } from "../validators";

import { A, B, black, blue, cyan, green, hueHsl, hueHsv, L, lightness, magenta, red, saturationHsl, saturationHsv, value, X, Y, yellow, Z } from "../transformers";

const addTransformation = (color: Color): Color => {
  color.red = (value: number): Color => red(color, value);
  color.green = (value: number): Color => green(color, value);
  color.blue = (value: number): Color => blue(color, value);
  color.hueHsl = (value: number): Color => hueHsl(color, value);
  color.saturationHsl = (value: number): Color => saturationHsl(color, value);
  color.lightness = (value: number): Color => lightness(color, value);
  color.hueHsv = (value: number): Color => hueHsv(color, value);
  color.saturationHsv = (value: number): Color => saturationHsv(color, value);
  color.value = (v: number): Color => value(color, v);
  color.cyan = (value: number): Color => cyan(color, value);
  color.magenta = (value: number): Color => magenta(color, value);
  color.yellow = (value: number): Color => yellow(color, value);
  color.black = (value: number): Color => black(color, value);
  color.X = (value: number): Color => X(color, value);
  color.Y = (value: number): Color => Y(color, value);
  color.Z = (value: number): Color => Z(color, value);
  color.L = (value: number): Color => L(color, value);
  color.A = (value: number): Color => A(color, value);
  color.B = (value: number): Color => B(color, value);
  return color;
};

const addDistanceCalculation = (color: Color): Color => {
  color.distanceFrom = (clr: Color) => ({
    cie76: cie76(color.lab(), clr.lab()),
    cie94: cie94(color.lab(), clr.lab()),
    cie2000: cie2000(color.lab(), clr.lab())
  });
  return color;
};

export const fromHex = (hex: string): Color => {
  if(!isValidHex(hex))
    throw new InvalidColorError<string>(hex, "HEX");
  const color = <Color> {
    hex:  () => hex,
    css:  (rgbOnly?: boolean) => hexToCss(hex, { rgbOnly }),
    rgb:  () => hexToRgb(hex),
    hsl:  () => hexToHsl(hex),
    hsv:  () => hexToHsv(hex),
    cmyk: () => hexToCmyk(hex),
    xyz:  () => hexToXyz(hex),
    lab:  () => hexToCIELab(hex)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};

export const fromRgb = (rgb: RGB): Color => {
  if(!isValidRgb(rgb))
    throw new InvalidColorError<RGB>(rgb, "RGB");
  const color = <Color> {
    rgb:  ()=> rgb,
    hex:  () => rgbToHex(rgb),
    css:  (rgbOnly?: boolean) => rgbToCss(rgb, { rgbOnly }),
    hsl:  () => rgbToHsl(rgb),
    hsv:  () => rgbToHsv(rgb),
    cmyk: () => rgbToCmyk(rgb),
    xyz: () => rgbToXyz(rgb),
    lab: () => rgbToCIELab(rgb)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};

export const fromCss = (css: string): Color => {
  if(cssValues[css]) {
    return fromHex(cssValues[css]);
  } else if(isValidCssRgb(css)) {
    const [r, g, b] = css.substring(4).replace(" ", "").split(",");
    return fromRgb({r: parseInt(r), g: parseInt(g), b: parseInt(b)});
  } else {
    throw new InvalidColorError<string>(css, "CSS");
  }
};
  
export const fromHsl = (hsl: HSL): Color => {
  if(!isValidHsl(hsl))
    throw new InvalidColorError<HSL>(hsl, "HSL");
  const color = <Color> {
    hsl: () => hsl,
    hex: () => hslToHex(hsl),
    css: (rgbOnly?: boolean) => hslToCss(hsl, { rgbOnly }),
    rgb: () => hslToRgb(hsl),
    hsv: () => hslToHsv(hsl),
    cmyk: () => hslToCmyk(hsl),
    xyz: () => hslToXyz(hsl),
    lab: () => hslToCIELab(hsl)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};

export const fromHsv = (hsv: HSV): Color => {
  if(!isValidHsv(hsv))
    throw new InvalidColorError<HSV>(hsv, "HSV");
  const color = <Color> {
    hsv: () => hsv,
    hex: () => hsvToHex(hsv),
    css: (rgbOnly?: boolean) => hsvToCss(hsv, { rgbOnly }),
    rgb: () => hsvToRgb(hsv),
    hsl: () => hsvToHsl(hsv),
    cmyk: () => hsvToCmyk(hsv),
    xyz: () => hsvToXyz(hsv),
    lab: () => hsvToCIELab(hsv)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};

export const fromCmyk = (cmyk: CMYK): Color => {
  if(!isValidCmyk(cmyk))
    throw new InvalidColorError<CMYK>(cmyk, "CMYK");
  const color = <Color> {
    cmyk: () => cmyk,
    hex: () => cmykToHex(cmyk),
    css: (rgbOnly?: boolean) => cmykToCss(cmyk, { rgbOnly }),
    rgb: () => cmykToRgb(cmyk),
    hsl: () => cmykToHsl(cmyk),
    hsv: () => cmykToHsv(cmyk),
    xyz: () => cmykToXyz(cmyk),
    lab: () => cmykToCIELab(cmyk)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};

export const fromXyz = (xyz: XYZ): Color => {
  if(!isValidXyz(xyz))
    throw new InvalidColorError<XYZ>(xyz, "XYZ");
  const color = <Color> {
    xyz: () => xyz,
    hex: () => xyzToHex(xyz),
    css: (rgbOnly?: boolean) => xyzToCss(xyz, { rgbOnly }),
    rgb: () => xyzToRgb(xyz),
    hsl: () => xyzToHsl(xyz),
    hsv: () => xyzToHsv(xyz),
    cmyk: () => xyzToCmyk(xyz),
    lab: () => xyzToCIELab(xyz)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};

export const fromLab = (lab: CIELab): Color => {
  if(!isValidLab(lab))
    throw new InvalidColorError<CIELab>(lab, "CIELab");
  const color = <Color> {
    lab: () => lab,
    hex: () => labToHex(lab),
    css: (rgbOnly?: boolean) => labToCss(lab, { rgbOnly }),
    rgb: () => labToRgb(lab),
    hsl: () => labToHsl(lab),
    hsv: () => labToHsv(lab),
    cmyk: () => labToCmyk(lab),
    xyz: () => labToXyz(lab)
  };
  addTransformation(color);
  addDistanceCalculation(color);
  return color;
};