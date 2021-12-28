import { Color } from "../src";

describe("A Color created from the HRX string", () => {
  describe("AF67D1", () => {
    const color = Color.fromHex("AF67D1");
    it("has the hex value given", () => {
      expect(color.hex()).toEqual("AF67D1");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 175, g: 103, b: 209 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 281, s: 54, l: 61 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 281, s: 51, v: 82 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 16, m: 51, y: 0, k: 18 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 34.04, y: 23.42, z: 63.05 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 55.5, a: 46.88, b: -43.42 });
    });
  });
  describe("48FEAQ", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        Color.fromHex("48FEAQ");
      }).toThrowError("48FEAQ is not a hexadecimal color value");
    });
  });
});