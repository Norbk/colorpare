import { fromHsv } from "../src";

describe("A Color created from the HSV object", () => {
  describe("{ h: 260, s: 45, v: 19 }", () => {
    const color = fromHsv({ h: 260, s: 45, v: 19 });
    it("has the hsv value given", () => {
      expect(color.hsv()).toEqual({ h: 260, s: 45, v: 19 });
    });
    it("has the corresponding hex value", () => {
      expect(color.hex()).toEqual("221B30");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 34, g: 27, b: 48 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 260, s: 29.03, l: 14.73 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 29, m: 44, y: 0, k: 81 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 1.59, y: 1.34, z: 2.97 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 11.55, a: 9.12, b: -12.7 });
    });
  });
  describe("{ h: 224, s: 109, v: -10 }", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        fromHsv({ h: 224, s: 109, v: -10 });    
      }).toThrowError("{\"h\":224,\"s\":109,\"v\":-10} is not a valid HSV color value");
    });
  });
});