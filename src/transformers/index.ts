import { fromRgb, fromHsl, fromHsv, fromCmyk, fromXyz, fromLab } from "../creators";
import { Color } from "../colorTypes";

const transform = (color1: Color, color2: Color): Color => {
  color1.hex = () => color2.hex();
  color1.css = () => color2.css();
  color1.rgb = () => color2.rgb();
  color1.hsl = () => color2.hsl();
  color1.hsv = () => color2.hsv();
  color1.cmyk = () => color2.cmyk();
  color1.xyz = () => color2.xyz();
  color1.lab = () => color2.lab();
  return color1;
};

export const red = (color: Color, value: number): Color => transform(color, fromRgb({r: value, g: color.rgb().g, b: color.rgb().b}));
export const green = (color: Color, value: number): Color => transform(color, fromRgb({r: color.rgb().r, g: value, b: color.rgb().b}));
export const blue = (color: Color, value: number): Color => transform(color, fromRgb({r: color.rgb().r, g: color.rgb().g, b: value}));

export const hueHsl = (color: Color, value: number): Color => transform(color, fromHsl({h: value, s: color.hsl().s, l: color.hsl().l}));
export const saturationHsl = (color: Color, value: number): Color => transform(color, fromHsl({h: color.hsl().h, s: value, l: color.hsl().l}));
export const lightness = (color: Color, value: number): Color => transform(color, fromHsl({h: color.hsl().h, s: color.hsl().s, l: value}));

export const hueHsv = (color: Color, value: number): Color => transform(color, fromHsv({h: value, s: color.hsv().s, v: color.hsv().v}));
export const saturationHsv = (color: Color, value: number): Color => transform(color, fromHsv({h: color.hsv().h, s: value, v: color.hsv().v}));
export const value = (color: Color, value: number): Color => transform(color, fromHsv({h: color.hsv().h, s: color.hsv().s, v: value}));

export const cyan = (color: Color, value: number): Color => transform(color, fromCmyk({c: value, m: color.cmyk().m, y: color.cmyk().y, k: color.cmyk().k}));
export const magenta = (color: Color, value: number): Color => transform(color, fromCmyk({c: color.cmyk().c, m: value, y: color.cmyk().y, k: color.cmyk().k}));
export const yellow = (color: Color, value: number): Color => transform(color, fromCmyk({c: color.cmyk().c, m: color.cmyk().m, y: value, k: color.cmyk().k}));
export const black = (color: Color, value: number): Color => transform(color, fromCmyk({c: color.cmyk().c, m: color.cmyk().m, y: color.cmyk().y, k: value}));

export const X = (color: Color, value: number): Color => transform(color, fromXyz({x: value, y: color.xyz().y, z: color.xyz().z}));
export const Y = (color: Color, value: number): Color => transform(color, fromXyz({x: color.xyz().x, y: value, z: color.xyz().z}));
export const Z = (color: Color, value: number): Color => transform(color, fromXyz({x: color.xyz().x, y: color.xyz().y, z: value}));

export const L = (color: Color, value: number): Color => transform(color, fromLab({l: value, a: color.lab().a, b: color.lab().b}));
export const A = (color: Color, value: number): Color => transform(color, fromLab({l: color.lab().l, a: value, b: color.lab().b}));
export const B = (color: Color, value: number): Color => transform(color, fromLab({l: color.lab().l, a: color.lab().a, b: value}));
