import { Color } from "../src";

describe("A Color created from the XYZ object", () => {
  describe("{ x: 76, y: 34, z: 21 }", () => {
    const color = Color.fromXyz({ x: 76, y: 34, z: 21 });
    it("has the cmyk value given", () => {
      expect(color.xyz()).toEqual({ x: 76, y: 34, z: 21 });
    });
    it("has the corresponding hex value", () => {
      expect(color.hex()).toEqual("FF007A");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 255, g: 0, b: 122 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 331.29, s: 100, l: 50 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 331.29, s: 100, v: 100 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 0, m: 100, y: 52, k: 0 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 64.96, a: 115.11, b: 24.04 });
    });
  });
  describe("{ x: 1.23, y: 101, z: 63 }", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        Color.fromXyz({ x: 1.23, y: 101, z: 63 });    
      }).toThrowError("{\"x\":1.23,\"y\":101,\"z\":63} is not an XYZ color value");
    });
  });
});