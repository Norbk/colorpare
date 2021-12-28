import { Color } from "../src";

describe("A Color created from the CIELab object", () => {
  describe("{ l: 51.02, a: -24.71, b: 9.62 }", () => {
    const color = Color.fromLab({ l: 51.02, a: -24.71, b: 9.62 });
    it("has the lab value given", () => {
      expect(color.lab()).toEqual({ l: 51.02, a: -24.71, b: 9.62 });
    });
    it("has the corresponding hex value", () => {
      expect(color.hex()).toEqual("4E8568");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 78, g: 133, b: 104 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 148.36, s: 26.07, l: 41.37 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 148.36, s: 41.35, v: 52.16 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 41, m: 0, y: 22, k: 48 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 14.02, y: 19.29, z: 16.18 });
    });
  });
  describe("{ l: 51.02, a: -24.71, b: 9.62 }", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        Color.fromLab({ l: 51.02, a: -129, b: 128.01 });    
      }).toThrowError("{\"l\":51.02,\"a\":-129,\"b\":128.01} is not a CIELab color value");
    });
  });
});