import { Color } from "../src";

describe("A Color created from the RGB object", () => {
  describe("{ r: 167, g: 45, b: 89 }", () => {
    const color = Color.fromRgb({ r: 167, g: 45, b: 89 });
    it("has the rgb value given", () => {
      expect(color.rgb()).toEqual({ r: 167, g: 45, b: 89 });
    });
    it("has the corresponding hex value", () => {
      expect(color.hex()).toEqual("A72D59");
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 338.36, s: 57.55, l: 41.57 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 338.36, s: 73.05, v: 65.49 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 0, m: 73, y: 47, k: 35 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 18.68, y: 10.81, z: 10.55 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 39.26, a: 52.52, b: 3.41 });
    });
  });
  describe("{ r: 167, g: 258, b: -10 }", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        Color.fromRgb({ r: 167, g: 258, b: -10 });    
      }).toThrowError("{\"r\":167,\"g\":258,\"b\":-10} is not an RGB color value");
    });
  });
});