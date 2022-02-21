import { fromCss } from "../src";

describe("A Color created from the CSS string", () => {
  describe("yellow", () => {
    const color = fromCss("darkseagreen");
    it("has the hex value given", () => {
      expect(color.hex()).toEqual("8fbc8f");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 143, g: 188, b: 143 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 120, s: 25.14, l: 64.9 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 120, s: 23.94, v: 73.73 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 24, m: 0, y: 24, k: 26 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 34.27, y: 43.79, z: 32.63 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 72.09, a: -23.82, b: 18.04 });
    });
  });
  describe("rgb(81, 203, 114)", () => {
    const color = fromCss("rgb(81, 203, 114)");
    it("has the hex value given", () => {
      expect(color.hex()).toEqual("51CB72");
    });
    it("has the corresponding RGB value", () => {
      expect(color.rgb()).toEqual({ r: 81, g: 203, b: 114 });
    });
    it("has the corresponding HSL value", () => {
      expect(color.hsl()).toEqual({ h: 136.23, s: 53.98, l: 55.69 });
    });
    it("has the corresponding HSV value", () => {
      expect(color.hsv()).toEqual({ h: 136.23, s: 60.1, v: 79.61 });
    });
    it("has the corresponding CMYK value", () => {
      expect(color.cmyk()).toEqual({ c: 60, m: 0, y: 44, k: 20 });
    });
    it("has the corresponding XYZ value", () => {
      expect(color.xyz()).toEqual({ x: 27.79, y: 45.68, z: 23.27 });
    });
    it("has the corresponding CIELab value", () => {
      expect(color.lab()).toEqual({ l: 73.34, a: -53.22, b: 34.45 });
    });
  });
  describe("darkeyebrowbrown", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        fromCss("darkeyebrowbrown");
      }).toThrowError("\"darkeyebrowbrown\" is not a valid CSS color value");
    });
  });
  describe("rgb(261, -987, 0)", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        fromCss("rgb(261, -987, 0)");
      }).toThrowError("\"rgb(261, -987, 0)\" is not a valid CSS color value");
    });
  });
  describe("rgb(261, 28, 33)", () => {
    it("throws an error because it's invalid", () => {
      expect(() => {
        fromCss("rgb(261, 28, 33)");
      }).toThrowError("{\"r\":261,\"g\":28,\"b\":33} is not a valid RGB color value");
    });
  });
});