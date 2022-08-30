import {
  hexToCss, hexToCIELab, hexToCmyk, hexToRgb, hexToXyz, hexToHsl, hexToHsv,
  rgbToCss, rgbToCIELab, rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv, rgbToXyz,
  hslToCss, hslToHex, hslToRgb, hslToHsv, hslToCmyk, hslToXyz, hslToCIELab,
  hsvToCss, hsvToHex, hsvToRgb, hsvToHsl, hsvToCmyk, hsvToXyz, hsvToCIELab,
  cmykToCss, cmykToHex, cmykToRgb, cmykToHsl, cmykToHsv, cmykToXyz, cmykToCIELab,
  xyzToCss, xyzToHex, xyzToRgb, xyzToHsl, xyzToHsv, xyzToCmyk, xyzToCIELab,
  labToCss, labToXyz, labToCmyk, labToHsv, labToRgb, labToHex, labToHsl
} from "../converters";

import { Color, CIELab, CMYK, HSL, HSV, RGB, XYZ, Options } from "../colorTypes";

import { cie76, cie94, cie2000 } from "../calculators";

import { cssValues } from "../utils";

import { InvalidColorError, isValidCmyk, isValidCssRgb, isValidHex, isValidHsl, isValidHsv, isValidLab, isValidRgb, isValidXyz } from "../validators";

import { A, B, black, blue, cyan, green, hueHsl, hueHsv, L, lightness, magenta, red, saturationHsl, saturationHsv, value, X, Y, yellow, Z } from "../transformers";

import { complementary, tetradic, triadic } from "../theory";

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

const addTheory = (color: Color): Color => {
  color.complementary = () => fromHsl(complementary(color.hsl()));
  color.triadic = () => {
    const tr = triadic(color.hsl());
    return [
      fromHsl(tr[0]),
      fromHsl(tr[1])
    ];
  };
  color.tetradic = () => {
    const te = tetradic(color.hsl());
    return [
      fromHsl(te[0]),
      fromHsl(te[1]),
      fromHsl(te[2])
    ];
  };
  return color;
}

export const fromString = (value: string, options?: Options): Color => {
  const color = <Color> {};
  return addTransformation(addDistanceCalculation(addTheory(color)));
}

export const fromHex = (hex: string, options?: Options): Color => {
  if(!isValidHex(hex))
    throw new InvalidColorError<string>(hex, "HEX");
  const color = <Color> {
    hex:  () => hex,
    css:  () => hexToCss(hex, options),
    rgb:  () => hexToRgb(hex),
    hsl:  () => hexToHsl(hex, options),
    hsv:  () => hexToHsv(hex, options),
    cmyk: () => hexToCmyk(hex),
    xyz:  () => hexToXyz(hex, options),
    lab:  () => hexToCIELab(hex, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};

export const fromRgb = (rgb: RGB, options?: Options): Color => {
  if(!isValidRgb(rgb))
    throw new InvalidColorError<RGB>(rgb, "RGB");
  const color = <Color> {
    rgb:  ()=> rgb,
    hex:  () => rgbToHex(rgb),
    css:  () => rgbToCss(rgb, options),
    hsl:  () => rgbToHsl(rgb, options),
    hsv:  () => rgbToHsv(rgb, options),
    cmyk: () => rgbToCmyk(rgb),
    xyz: () => rgbToXyz(rgb, options),
    lab: () => rgbToCIELab(rgb, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};

export const fromCss = (css: string, options?: Options): Color => {
  if(cssValues[css]) {
    return fromHex(cssValues[css], options);
  } else if(isValidCssRgb(css)) {
    const [r, g, b] = css.substring(4).replace(" ", "").split(",");
    return fromRgb({r: parseInt(r), g: parseInt(g), b: parseInt(b)}, options);
  } else {
    throw new InvalidColorError<string>(css, "CSS");
  }
};
  
export const fromHsl = (hsl: HSL, options?: Options): Color => {
  if(!isValidHsl(hsl))
    throw new InvalidColorError<HSL>(hsl, "HSL");
  const color = <Color> {
    hsl: () => hsl,
    hex: () => hslToHex(hsl),
    css: () => hslToCss(hsl, options),
    rgb: () => hslToRgb(hsl),
    hsv: () => hslToHsv(hsl, options),
    cmyk: () => hslToCmyk(hsl),
    xyz: () => hslToXyz(hsl, options),
    lab: () => hslToCIELab(hsl, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};

export const fromHsv = (hsv: HSV, options?: Options): Color => {
  if(!isValidHsv(hsv))
    throw new InvalidColorError<HSV>(hsv, "HSV");
  const color = <Color> {
    hsv: () => hsv,
    hex: () => hsvToHex(hsv),
    css: () => hsvToCss(hsv, options),
    rgb: () => hsvToRgb(hsv),
    hsl: () => hsvToHsl(hsv, options),
    cmyk: () => hsvToCmyk(hsv),
    xyz: () => hsvToXyz(hsv, options),
    lab: () => hsvToCIELab(hsv, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};

export const fromCmyk = (cmyk: CMYK, options?: Options): Color => {
  if(!isValidCmyk(cmyk))
    throw new InvalidColorError<CMYK>(cmyk, "CMYK");
  const color = <Color> {
    cmyk: () => cmyk,
    hex: () => cmykToHex(cmyk),
    css: () => cmykToCss(cmyk, options),
    rgb: () => cmykToRgb(cmyk),
    hsl: () => cmykToHsl(cmyk, options),
    hsv: () => cmykToHsv(cmyk, options),
    xyz: () => cmykToXyz(cmyk, options),
    lab: () => cmykToCIELab(cmyk, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};

export const fromXyz = (xyz: XYZ, options?: Options): Color => {
  if(!isValidXyz(xyz))
    throw new InvalidColorError<XYZ>(xyz, "XYZ");
  const color = <Color> {
    xyz: () => xyz,
    hex: () => xyzToHex(xyz),
    css: () => xyzToCss(xyz, options),
    rgb: () => xyzToRgb(xyz),
    hsl: () => xyzToHsl(xyz, options),
    hsv: () => xyzToHsv(xyz, options),
    cmyk: () => xyzToCmyk(xyz),
    lab: () => xyzToCIELab(xyz, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};

export const fromLab = (lab: CIELab, options?: Options): Color => {
  if(!isValidLab(lab))
    throw new InvalidColorError<CIELab>(lab, "CIELab");
  const color = <Color> {
    lab: () => lab,
    hex: () => labToHex(lab),
    css: () => labToCss(lab, options),
    rgb: () => labToRgb(lab),
    hsl: () => labToHsl(lab, options),
    hsv: () => labToHsv(lab, options),
    cmyk: () => labToCmyk(lab),
    xyz: () => labToXyz(lab, options)
  };
  return addTransformation(addDistanceCalculation(addTheory(color)));
};