import { Color } from "../src";

describe("Tranform ", () => {
  describe("RGB {r: 45, g: 183, b: 67}", () => {
    const color = Color.fromRgb({r: 45, g: 183, b: 67});
    it("to RGB {r: 141, g: 44, b: 221}", () => {
      color.red(141).green(44).blue(221);
      expect(color.rgb()).toEqual({r: 141, g: 44, b: 221});
    });
  });
  describe("HSL {h: 166, s: 56, l: 23}", () => {
    const color = Color.fromHsl({h: 166, s: 56, l: 23});
    it("to HSL {h: 349, s: 78, l: 11}", () => {
      color.hueHsl(349).saturationHsl(78).lightness(11);
      expect(color.hsl()).toEqual({h: 349, s: 78, l: 11});
    });
  });
  describe("HSV {h: 129, s: 16, v: 83}", () => {
    const color = Color.fromHsv({h: 129, s: 16, v: 83});
    it("to HSV {h: 284, s: 32, v: 51}", () => {
      color.hueHsv(284).saturationHsv(32).value(51);
      expect(color.hsv()).toEqual({h: 284, s: 32, v: 51});
    });
  });
  describe("CMYK {c: 87, m: 10, y: 23, k: 2}", () => {
    const color = Color.fromCmyk({c: 87, m: 10, y: 23, k: 2});
    it("to CMYK {c: 20, m: 51, y: 41, k: 18}", () => {
      color.cyan(20).magenta(51).yellow(41).black(18);
      expect(color.cmyk()).toEqual({c: 20, m: 51, y: 41, k: 18});
    });
  });
  describe("XYZ {x: 67, y: 16, z: 101}", () => {
    const color = Color.fromXyz({x: 67, y: 16, z: 101});
    it("to XYZ {x: 28, y: 32, z: 10}", () => {
      color.X(28).Y(32).Z(10);
      expect(color.xyz()).toEqual({x: 28, y: 32, z: 10});
    });
  });
  describe("CIELab {l: 33, a: -34, b: 81}", () => {
    const color = Color.fromLab({l: 33, a: -34, b: 81});
    it("to CIELab {l: 89, a: 61, b: -127}", () => {
      color.L(89).A(61).B(-127);
      expect(color.lab()).toEqual({l: 89, a: 61, b: -127});
    });
  });
});