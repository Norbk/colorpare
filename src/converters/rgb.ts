import { CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";
import { round } from "../utils";
import { hexToCss, xyzToCIELab } from ".";

const deltaRGB = (rgb: RGB): RGB => ({
  r: rgb.r / 255,
  g: rgb.g / 255,
  b: rgb.b /255
});

const hue = (rgb: RGB, min: number, max: number, roundTo: number): number => {
  const delta = max - min;
  let hue = 0;
  if(max == rgb.r)
    hue = ((rgb.g - rgb.b) / delta) % 60;
  else if(max == rgb.g)
    hue = (rgb.b - rgb.r) / delta + 2;
  else
    hue = (rgb.r - rgb.g) / delta + 4;
  
  hue = round(hue * 60, roundTo);
  
  if(hue <= 0) 
    hue += 360;
  
  if(isNaN(hue))
    hue = 0;

  return hue;
};

export const rgbToHex = (rgb: RGB): string => {
  let hex = (rgb.r * 65536 + rgb.g * 256 + rgb.b).toString(16).toUpperCase();
  for(let i = hex.length; i < 6; i++) {
    hex = `0${hex}`;
  }
  return hex;
};

export const rgbToCss = (rgb: RGB, rgbOnly?: boolean): string => hexToCss(rgbToHex(rgb), rgbOnly);

export const rgbToHsl = (rgb: RGB, roundTo = 2): HSL => {
  const hsl: HSL = { h: 0, s: 0, l: 0 };
  const { r, g, b } = deltaRGB(rgb);
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  
  hsl.h = hue({r, g, b}, min, max, roundTo);

  hsl.l = (max + min) / 2;

  hsl.s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * hsl.l - 1));
  
  hsl.s = round(hsl.s * 100, roundTo);
  hsl.l = round(hsl.l * 100, roundTo);
  return hsl;
};

export const rgbToHsv = (rgb: RGB, roundTo = 2): HSV => {
  const hsv: HSV = { h: 0, s: 0, v: 0 };
  const { r, g, b } = deltaRGB(rgb);
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;

  hsv.h = hue({r, g, b}, min, max, roundTo);

  hsv.s = delta == 0 ? 0 : round((delta / max) * 100, roundTo);

  hsv.v = round(max * 100, roundTo);
  return hsv;
};

export const rgbToCmyk = (rgb: RGB): CMYK => {
  const { r, g, b } = deltaRGB(rgb);
  const black =  1 - Math.max(r, g, b);
  if(black == 1) {
    return {
      c: 0,
      m: 0,
      y: 0,
      k: 100
    };
  }
  return {
    c: round(((1 - r - black) / (1 - black)) * 100),
    m: round(((1 - g - black) / (1 - black)) * 100),
    y: round(((1 - b - black) / (1 - black)) * 100),
    k: round(black * 100)
  };
};

export const rgbToXyz = (rgb: RGB, roundTo = 2): XYZ => {
  let { r, g, b } = deltaRGB(rgb);
  
  r = (r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : r / 12.92) * 100;
  g = (g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : g / 12.92) * 100;
  b = (b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : b / 12.92) * 100;

  return {
    x: round(r * 0.4124 + g * 0.3576 + b * 0.1805, roundTo),
    y: round(r * 0.2126 + g * 0.7152 + b * 0.0722, roundTo),
    z: round(r * 0.0193 + g * 0.1192 + b * 0.9505, roundTo)
  };
};

export const rgbToCIELab = (rgb: RGB, roundTo = 2) => xyzToCIELab(rgbToXyz(rgb, roundTo));