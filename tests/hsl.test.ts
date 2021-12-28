import { Color } from "../src";

describe("A Color created from the HSL object", () => {
  describe("{ h: 260, s: 45, l: 76 }", () => {
    const color = Color.fromHsl({ h: 260, s: 45, l: 76 });
    it("has the hsl value given", () => {
      expect(color.hsl()).toEqual({ h: 260, s: 45, l: 76 });
    });
    it("has the corresponding hex value", () => {
      expect(color.hex()).toEqual("B9A6DD");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 185, g: 166, b: 221 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 260, s: 24.88, v: 86.8 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 16, m: 25, y: 0, k: 13 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 46.69, y: 42.81, z: 74.21 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 71.43, a: 17.68, b: -25.27 });
    });
  });
  describe("{ h: 224, s: 109, l: -10 }", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        Color.fromHsl({ h: 224, s: 109, l: -10 });    
      }).toThrowError("{\"h\":224,\"s\":109,\"l\":-10} is not a HSL color value");
    });
  });
});