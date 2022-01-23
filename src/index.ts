import { cie2000, cie76, cie94 } from "./calculators";
import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "./colorTypes";
import {
  hexToCss, hexToCIELab, hexToCmyk, hexToRgb, hexToXYZ, hexToHsl, hexToHsv,
  rgbToCss, rgbToCIELab, rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv, rgbToXyz,
  hslToCss, hslToHex, hslToRgb, hslToHsv, hslToCmyk, hslToXyz, hslToCIELab,
  hsvToCss, hsvToHex, hsvToRgb, hsvToHsl, hsvToCmyk, hsvToXyz, hsvToCIELab,
  cmykToCss, cmykToHex, cmykToRgb, cmykToHsl, cmykToHsv, cmykToXyz, cmykToCIELab,
  xyzToCss, xyzToHex, xyzToRgb, xyzToHsl, xyzToHsv, xyzToCmyk, xyzToCIELab,
  labToCss, labToXyz, labToCmyk, labToHsv, labToRgb, labToHex, labToHsl
} from "./converters";
import { cssValues } from "./utils";
import { isValidCmyk, isValidCssRgb, isValidHex, isValidHsl, isValidHsv, isValidLab, isValidRgb, isValidXyz } from "./validators";

export class Color {
  
  private transform = (color: Color): Color => {
    this.hex = () => color.hex();
    this.css = () => color.css();
    this.rgb = () => color.rgb();
    this.hsl = () => color.hsl();
    this.hsv = () => color.hsv();
    this.cmyk = () => color.cmyk();
    this.xyz = () => color.xyz();
    this.lab = () => color.lab();
    return this;
  };

  public hex = (): string => "000000";
  public css = (): string => "black";
  public rgb = (): RGB =>  ({ r: 0, g: 0, b: 0 });
  public hsl = (): HSL => ({ h: 0, s: 0, l: 0 });
  public hsv = (): HSV => ({ h: 0, s: 0, v: 0 });
  public cmyk = (): CMYK => ({ c: 0, m: 0, y: 0, k: 0 });
  public xyz = (): XYZ => ({ x: 0, y: 0, z: 0 });
  public lab = (): CIELab => ({ l: 0, a: 0, b: 0 });
  public all = ():Record<string, unknown> => ({
    hex: this.hex(),
    css: this.css(),
    rgb: this.rgb(),
    hsl: this.hsl(),
    hsv: this.hsv(),
    cmyk: this.cmyk(),
    xyz: this.xyz(),
    lab: this.lab()
  });

  public distanceFrom = (color: Color): Record<string, unknown> => {
    return {
      cie76: cie76(this, color),
      cie94: cie94(this, color),
      cie2000: cie2000(this, color)
    };
  };

  static fromCss = (css: string): Color => {
    if(cssValues[css]) {
      return this.fromHex(cssValues[css]);
    } else if(isValidCssRgb(css)) {
      const [r, g, b] = css.substring(4).replace(" ", "").split(",");
      return this.fromRgb({r: parseInt(r), g: parseInt(g), b: parseInt(b)});
    } else {
      throw new Error(`${css} is not a valid css color value`);
    }
  };

  static fromHex = (hex: string): Color => {
    if(!isValidHex(hex))
      throw new Error(`${hex} is not a hexadecimal color value`);
    const color = new Color();
    color.hex = () => hex;
    color.css = (rgbOnly?: boolean) => hexToCss(hex, rgbOnly);
    color.rgb = () => hexToRgb(hex);
    color.hsl = () => hexToHsl(hex);
    color.hsv = () => hexToHsv(hex);
    color.cmyk = () => hexToCmyk(hex);
    color.xyz = () => hexToXYZ(hex);
    color.lab = () => hexToCIELab(hex);
    return color;
  };

  static fromRgb = (rgb: RGB): Color => {
    if(!isValidRgb(rgb))
      throw new Error(`${JSON.stringify(rgb)} is not an RGB color value`);
    const color = new Color();
    color.rgb = () => rgb;
    color.hex = () => rgbToHex(rgb);
    color.css = (rgbOnly?: boolean) => rgbToCss(rgb, rgbOnly);
    color.hsl = () => rgbToHsl(rgb);
    color.hsv = () => rgbToHsv(rgb);
    color.cmyk = () => rgbToCmyk(rgb);
    color.xyz = () => rgbToXyz(rgb);
    color.lab = () => rgbToCIELab(rgb);
    return color;
  };

  static fromHsl = (hsl: HSL): Color => {
    if(!isValidHsl(hsl))
      throw new Error(`${JSON.stringify(hsl)} is not a HSL color value`);
    const color = new Color();
    color.hsl = () => hsl;
    color.hex = () => hslToHex(hsl);
    color.css = (rgbOnly?: boolean) => hslToCss(hsl, rgbOnly);
    color.rgb = () => hslToRgb(hsl);
    color.hsv = () => hslToHsv(hsl);
    color.cmyk = () => hslToCmyk(hsl);
    color.xyz = () => hslToXyz(hsl);
    color.lab = () => hslToCIELab(hsl);
    return color;
  };

  static fromHsv = (hsv: HSV): Color => {
    if(!isValidHsv(hsv))
      throw new Error(`${JSON.stringify(hsv)} is not a HSV color value`);
    const color = new Color();
    color.hsv = () => hsv;
    color.hex = () => hsvToHex(hsv);
    color.css = (rgbOnly?: boolean) => hsvToCss(hsv, rgbOnly);
    color.rgb = () => hsvToRgb(hsv);
    color.hsl = () => hsvToHsl(hsv);
    color.cmyk = () => hsvToCmyk(hsv);
    color.xyz = () => hsvToXyz(hsv);
    color.lab = () => hsvToCIELab(hsv);
    return color;
  };

  static fromCmyk = (cmyk: CMYK): Color => {
    if(!isValidCmyk(cmyk))
      throw new Error(`${JSON.stringify(cmyk)} is not a CMYK color value`);
    const color = new Color();
    color.cmyk = () => cmyk;
    color.hex = () => cmykToHex(cmyk);
    color.css = (rgbOnly?: boolean) => cmykToCss(cmyk, rgbOnly);
    color.rgb = () => cmykToRgb(cmyk);
    color.hsl = () => cmykToHsl(cmyk);
    color.hsv = () => cmykToHsv(cmyk);
    color.xyz = () => cmykToXyz(cmyk);
    color.lab = () => cmykToCIELab(cmyk);
    return color;
  };

  static fromXyz = (xyz: XYZ): Color => {
    if(!isValidXyz(xyz))
      throw new Error(`${JSON.stringify(xyz)} is not an XYZ color value`);
    const color = new Color();
    color.xyz = () => xyz;
    color.hex = () => xyzToHex(xyz);
    color.css = (rgbOnly?: boolean) => xyzToCss(xyz, rgbOnly);
    color.rgb = () => xyzToRgb(xyz);
    color.hsl = () => xyzToHsl(xyz);
    color.hsv = () => xyzToHsv(xyz);
    color.cmyk = () => xyzToCmyk(xyz);
    color.lab = () => xyzToCIELab(xyz);
    return color;
  };

  static fromLab = (lab: CIELab): Color => {
    if(!isValidLab(lab))
      throw new Error(`${JSON.stringify(lab)} is not a CIELab color value`);
    const color = new Color();
    color.lab = () => lab;
    color.hex = () => labToHex(lab);
    color.css = (rgbOnly?: boolean) => labToCss(lab, rgbOnly);
    color.rgb = () => labToRgb(lab);
    color.hsl = () => labToHsl(lab);
    color.hsv = () => labToHsv(lab);
    color.cmyk = () => labToCmyk(lab);
    color.xyz = () => labToXyz(lab);
    return color;
  };

  red = (value: number): Color => this.transform(Color.fromRgb({r: value, g: this.rgb().g, b: this.rgb().b}));
  green = (value: number): Color => this.transform(Color.fromRgb({r: this.rgb().r, g: value, b: this.rgb().b}));
  blue = (value: number): Color => this.transform(Color.fromRgb({r: this.rgb().r, g: this.rgb().g, b: value}));

  hueHsl = (value: number): Color => this.transform(Color.fromHsl({h: value, s: this.hsl().s, l: this.hsl().l}));
  saturationHsl = (value: number): Color => this.transform(Color.fromHsl({h: this.hsl().h, s: value, l: this.hsl().l}));
  lightness = (value: number): Color => this.transform(Color.fromHsl({h: this.hsl().h, s: this.hsl().s, l: value}));

  hueHsv = (value: number): Color => this.transform(Color.fromHsv({h: value, s: this.hsv().s, v: this.hsv().v}));
  saturationHsv = (value: number): Color => this.transform(Color.fromHsv({h: this.hsv().h, s: value, v: this.hsv().v}));
  value = (value: number): Color => this.transform(Color.fromHsv({h: this.hsv().h, s: this.hsv().s, v: value}));

  cyan = (value: number): Color => this.transform(Color.fromCmyk({c: value, m: this.cmyk().m, y: this.cmyk().y, k: this.cmyk().k}));
  magenta = (value: number): Color => this.transform(Color.fromCmyk({c: this.cmyk().c, m: value, y: this.cmyk().y, k: this.cmyk().k}));
  yellow = (value: number): Color => this.transform(Color.fromCmyk({c: this.cmyk().c, m: this.cmyk().m, y: value, k: this.cmyk().k}));
  black = (value: number): Color => this.transform(Color.fromCmyk({c: this.cmyk().c, m: this.cmyk().m, y: this.cmyk().y, k: value}));

  X = (value: number): Color => this.transform(Color.fromXyz({x: value, y: this.xyz().y, z: this.xyz().z}));
  Y = (value: number): Color => this.transform(Color.fromXyz({x: this.xyz().x, y: value, z: this.xyz().z}));
  Z = (value: number): Color => this.transform(Color.fromXyz({x: this.xyz().x, y: this.xyz().y, z: value}));

  L = (value: number): Color => this.transform(Color.fromLab({l: value, a: this.lab().a, b: this.lab().b}));
  A = (value: number): Color => this.transform(Color.fromLab({l: this.lab().l, a: value, b: this.lab().b}));
  B = (value: number): Color => this.transform(Color.fromLab({l: this.lab().l, a: this.lab().a, b: value}));
}