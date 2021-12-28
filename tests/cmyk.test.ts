import { Color } from "../src";

describe("A Color created from the CMYK object", () => {
  describe("{ c: 61, m: 4, y: 22, k: 9 }", () => {
    const color = Color.fromCmyk({ c: 61, m: 4, y: 22, k: 9 });
    it("has the cmyk value given", () => {
      expect(color.cmyk()).toEqual({ c: 61, m: 4, y: 22, k: 9 });
    });
    it("has the corresponding hex value", () => {
      expect(color.hex()).toEqual("5ADFB5");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 90, g: 223, b: 181 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 161.05, s: 67.51, l: 61.37 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 161.05, s: 59.64, v: 87.45 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 38.94, y: 58.29, z: 52.91 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 80.9, a: -46.32, b: 9.83 });
    });
  });
  describe("{ c: -2, m: 101, y: 8, k: 0 }", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        Color.fromCmyk({ c: -2, m: 101, y: 8, k: 0 });    
      }).toThrowError("{\"c\":-2,\"m\":101,\"y\":8,\"k\":0} is not a CMYK color value");
    });
  });
});